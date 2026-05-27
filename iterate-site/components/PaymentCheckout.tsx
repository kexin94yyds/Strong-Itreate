import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

type EmailVerificationState = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified';
type PaymentMethod = 'wechat' | 'alipay';
type PayStep = 'idle' | 'paying' | 'success';

const PAYMENT_API_URL = 'https://wechat-y-server-vjfbztievl.cn-shanghai.fcapp.run';
const ITERATE_COUPON_CODE = '无限迭代';
const INSTALL_GUIDE_URL = 'https://iterate.xin/iterate/INSTALLATION.md';
const DOWNLOAD_LINKS = {
  mac: 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate_aarch64.dmg',
  win: 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate-windows-x64.zip',
} as const;

const PLANS = [
  { id: 'day1', label: '1 天', desc: '快速体验', price: 1.99, productId: 'iterate_day1', productName: 'Iterate 1天体验' },
  { id: 'day7', label: '7 天', desc: '深度体验', price: 10, productId: 'iterate_day7', productName: 'Iterate 7天体验', popular: true },
  { id: 'permanent', label: '永久', desc: '终身使用', price: 39.9, couponPrice: 19.9, productId: 'iterate_permanent', productName: 'Iterate 永久版' },
] as const;

type Plan = typeof PLANS[number];
type PlanId = Plan['id'];

type PaymentCheckoutProps = {
  defaultPlan?: PlanId;
  successHref?: string;
  successLabel?: string;
  showInstallLinks?: boolean;
};

function isPermanentPlan(plan: Plan): plan is Extract<Plan, { id: 'permanent' }> {
  return plan.id === 'permanent';
}

function resolvePlanPricing(plan: Plan, couponCode: string) {
  const normalizedCoupon = couponCode.trim();
  const hasValidCoupon = isPermanentPlan(plan) && normalizedCoupon === ITERATE_COUPON_CODE;

  return {
    price: hasValidCoupon && isPermanentPlan(plan) ? plan.couponPrice : plan.price,
    couponCode: hasValidCoupon ? ITERATE_COUPON_CODE : '',
    hasValidCoupon,
    couponError: normalizedCoupon && !hasValidCoupon
      ? isPermanentPlan(plan) ? '优惠码无效' : '优惠码仅限永久版'
      : '',
  };
}

function resolveOrderAmount(data: Record<string, unknown>, fallback: number) {
  const amount = Number(data.amount);
  if (Number.isFinite(amount) && amount > 0)
    return amount;

  const amountCents = Number(data.amountCents || data.payAmount || data.totalAmount);
  if (Number.isFinite(amountCents) && amountCents > 0)
    return amountCents / 100;

  return fallback;
}

async function claimIterateLicense(claimToken: string) {
  const response = await fetch(`${PAYMENT_API_URL}/api/iterate/claim-license`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claimToken }),
  });
  const data = await response.json();
  const licenseKey = typeof data.licenseKey === 'string' ? data.licenseKey.trim() : '';

  if (!response.ok || !data.success || !licenseKey)
    throw new Error(data.error || data.message || '领取激活码失败');

  return licenseKey;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  defaultPlan = 'permanent',
  successHref = '#download',
  successLabel = '继续下载客户端',
  showInstallLinks = false,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(defaultPlan);
  const [buyEmail, setBuyEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailVerificationToken, setEmailVerificationToken] = useState('');
  const [emailVerificationState, setEmailVerificationState] = useState<EmailVerificationState>('idle');
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('');
  const [recoveryOrderNo, setRecoveryOrderNo] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [payStep, setPayStep] = useState<PayStep>('idle');
  const [payError, setPayError] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const qrCanvasRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const orderRef = useRef<string | null>(null);
  const paymentAccessRef = useRef<string | null>(null);

  const currentPlan = PLANS.find(plan => plan.id === selectedPlan)!;
  const currentPricing = resolvePlanPricing(currentPlan, couponInput);

  function resetEmailVerification(message = '') {
    setEmailCode('');
    setEmailVerificationToken('');
    setEmailVerificationState('idle');
    setEmailVerificationMessage(message);
  }

  async function requestEmailVerificationCode() {
    const email = buyEmail.trim();
    if (!email) {
      setEmailVerificationMessage('请先填写邮箱。');
      return;
    }

    setEmailVerificationState('sending');
    setEmailVerificationMessage('');
    try {
      const response = await fetch(`${PAYMENT_API_URL}/api/iterate/email-verification/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.error || data.message || '验证码发送失败');

      setEmailVerificationState('sent');
      setEmailVerificationMessage('验证码已发送，请检查邮箱。');
    }
    catch (error) {
      setEmailVerificationState('idle');
      setEmailVerificationMessage(error instanceof Error ? error.message : '验证码发送失败');
    }
  }

  async function confirmEmailVerification() {
    const email = buyEmail.trim();
    const code = emailCode.trim();
    if (!email || !/^\d{6}$/.test(code)) {
      setEmailVerificationMessage('请输入 6 位邮箱验证码。');
      return;
    }

    setEmailVerificationState('verifying');
    try {
      const response = await fetch(`${PAYMENT_API_URL}/api/iterate/email-verification/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.emailVerificationToken)
        throw new Error(data.error || data.message || '邮箱验证失败');

      setEmailVerificationToken(data.emailVerificationToken);
      setEmailVerificationState('verified');
      setEmailVerificationMessage('邮箱已验证，可支付或找回订单。');
    }
    catch (error) {
      setEmailVerificationState('sent');
      setEmailVerificationMessage(error instanceof Error ? error.message : '邮箱验证失败');
    }
  }

  function startPaymentPolling() {
    if (!orderRef.current || !paymentAccessRef.current) {
      setPayError('订单访问会话缺失，请重新操作。');
      setPayStep('idle');
      return;
    }

    if (pollRef.current)
      clearInterval(pollRef.current);

    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 100) {
        clearInterval(pollRef.current!);
        setPayError('支付超时，请重新发起支付。');
        setPayStep('idle');
        return;
      }

      try {
        const response = await fetch(`${PAYMENT_API_URL}/api/iterate/payment-status/${orderRef.current}`, {
          headers: { Authorization: `Bearer ${paymentAccessRef.current}` },
        });
        const data = await response.json();

        if (data.status === 'success') {
          const claimToken = typeof data.claimToken === 'string' ? data.claimToken.trim() : '';
          if (!claimToken)
            return;

          const licenseKey = await claimIterateLicense(claimToken);
          clearInterval(pollRef.current!);
          setActivationCode(licenseKey);
          setIsRecovering(false);
          setPayStep('success');
        }
        else if (data.status === 'claimed') {
          clearInterval(pollRef.current!);
          setPayError('激活码已领取。请重新验证邮箱后使用订单找回。');
          setPayStep('idle');
        }
        else if (data.status === 'failed') {
          clearInterval(pollRef.current!);
          setPayError('支付失败，请重新发起支付。');
          setPayStep('idle');
        }
        else if (!data.success && response.status === 403) {
          clearInterval(pollRef.current!);
          setPayError('订单访问已失效，请重新验证邮箱后找回。');
          setPayStep('idle');
        }
      }
      catch {}
    }, 3000);
  }

  async function handleBuy(method: PaymentMethod) {
    setPaymentMethod(method);
    setPayError('');
    setOrderAmount(null);

    if (currentPricing.couponError) {
      setPayError(currentPricing.couponError);
      return;
    }
    if (emailVerificationState !== 'verified' || !emailVerificationToken) {
      setPayError('请先验证接收找回信息的邮箱。');
      return;
    }

    setIsRecovering(false);
    setPayStep('paying');

    try {
      const body: Record<string, unknown> = {
        videoId: currentPlan.productId,
        videoTitle: currentPlan.productName,
        paymentMethod: method,
        email: buyEmail.trim(),
        emailVerificationToken,
      };
      if (currentPricing.couponCode)
        body.couponCode = currentPricing.couponCode;

      const response = await fetch(`${PAYMENT_API_URL}/api/iterate/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const codeUrl = data.codeUrl || data.code_url;

      if (!response.ok || !data.success || !codeUrl || !data.paymentAccessToken)
        throw new Error(data.message || data.error || '创建订单失败');

      orderRef.current = data.orderNo;
      paymentAccessRef.current = data.paymentAccessToken;
      setOrderAmount(resolveOrderAmount(data, currentPricing.price));
      resetEmailVerification('邮箱已绑定当前订单；新订单或找回需重新验证。');

      setTimeout(() => {
        if (!qrCanvasRef.current)
          return;

        qrCanvasRef.current.innerHTML = '';
        QRCode.toCanvas(codeUrl, { width: 180, margin: 2, color: { dark: '#000', light: '#fff' } }, (_err: unknown, canvas: HTMLCanvasElement) => {
          if (canvas && qrCanvasRef.current)
            qrCanvasRef.current.appendChild(canvas);
        });
      }, 100);

      startPaymentPolling();
    }
    catch (error) {
      setPayError(error instanceof Error ? error.message : '网络错误');
      setPayStep('idle');
    }
  }

  async function handleRecoverOrder() {
    if (!recoveryOrderNo.trim()) {
      setPayError('请输入已支付订单号。');
      return;
    }
    if (emailVerificationState !== 'verified' || !emailVerificationToken) {
      setPayError('请先验证付款时填写的邮箱。');
      return;
    }

    setPayError('');
    setIsRecovering(true);
    setPayStep('paying');

    try {
      const response = await fetch(`${PAYMENT_API_URL}/api/iterate/recover-order-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo: recoveryOrderNo.trim(),
          email: buyEmail.trim(),
          emailVerificationToken,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.paymentAccessToken)
        throw new Error(data.error || data.message || '找回失败');

      orderRef.current = data.orderNo;
      paymentAccessRef.current = data.paymentAccessToken;
      resetEmailVerification('找回验证已使用；再次操作需重新验证邮箱。');

      const claimToken = typeof data.claimToken === 'string' ? data.claimToken.trim() : '';
      if (claimToken) {
        const licenseKey = await claimIterateLicense(claimToken);
        setActivationCode(licenseKey);
        setIsRecovering(false);
        setPayStep('success');
        return;
      }

      startPaymentPolling();
    }
    catch (error) {
      setIsRecovering(false);
      setPayError(error instanceof Error ? error.message : '找回失败');
      setPayStep('idle');
    }
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(activationCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  useEffect(() => {
    return () => {
      if (pollRef.current)
        clearInterval(pollRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white p-8 text-black shadow-2xl md:p-10">
      <div className="mb-6">
        <div className="mb-2 text-xs font-black uppercase tracking-widest text-zinc-500">Checkout</div>
        <div className="text-3xl font-black tracking-tighter">购买激活码</div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">选择套餐和支付方式，支付后即时获取激活码。</p>
      </div>

      {payStep === 'success' ? (
        <div className="text-center">
          <div className="mb-3 text-4xl">OK</div>
          <div className="mb-2 text-xl font-black">支付成功</div>
          <p className="mb-4 text-sm text-zinc-500">先复制激活码，再继续安装客户端。</p>
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <code className="break-all text-sm font-bold text-emerald-600">{activationCode}</code>
            <button
              onClick={handleCopyCode}
              className="shrink-0 bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <p className="mb-5 text-xs text-amber-600">关闭页面前请确认激活码已保存。遗失后可凭订单号与付款邮箱找回。</p>
          <a
            href={successHref}
            className="inline-flex items-center justify-center bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-zinc-800"
          >
            {successLabel}
          </a>

          {showInstallLinks ? (
            <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left">
              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-500">Install</div>
              <a href={INSTALL_GUIDE_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-black px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-zinc-800">打开安装引导</a>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a href={DOWNLOAD_LINKS.mac} target="_blank" rel="noopener noreferrer" className="border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-bold text-zinc-900 transition-colors hover:border-black hover:bg-zinc-100">下载 macOS</a>
                <a href={DOWNLOAD_LINKS.win} target="_blank" rel="noopener noreferrer" className="border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-bold text-zinc-900 transition-colors hover:border-black hover:bg-zinc-100">下载 Windows</a>
              </div>
            </div>
          ) : null}
        </div>
      ) : payStep === 'paying' ? (
        <div className="text-center">
          <div className="mb-2 text-xl font-bold">{isRecovering ? '正在找回激活码' : `${paymentMethod === 'wechat' ? '微信' : '支付宝'}扫码支付`}</div>
          {isRecovering ? (
            <p className="mb-4 text-sm text-zinc-500">邮箱验证通过，正在核对订单并安全领取。</p>
          ) : (
            <>
              <p className="mb-4 text-sm text-zinc-500">请使用{paymentMethod === 'wechat' ? '微信' : '支付宝'}扫描下方二维码，支付成功后会自动返回激活码。</p>
              <div ref={qrCanvasRef} className="mx-auto mb-3 inline-flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                <span className="text-sm text-zinc-400">二维码生成中...</span>
              </div>
              <p className="text-lg font-black">¥{orderAmount ?? currentPricing.price}</p>
              {currentPricing.hasValidCoupon ? <p className="mt-1 text-xs text-emerald-600">已使用优惠码：{ITERATE_COUPON_CODE}</p> : null}
              <p className="mt-1 text-xs text-zinc-400">订单号：{orderRef.current}</p>
              <p className="mt-1 text-xs text-zinc-400">最长等待约 5 分钟。</p>
            </>
          )}
          {payError ? <p className="mt-2 text-sm text-red-600">{payError}</p> : null}
        </div>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-3 gap-3">
            {PLANS.map(plan => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-lg border-2 p-3 text-center transition-all ${
                  selectedPlan === plan.id
                    ? 'border-black bg-zinc-50'
                    : 'border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {'popular' in plan && plan.popular ? (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">推荐</span>
                ) : null}
                <span className="block text-sm font-black">{plan.label}</span>
                <span className="mb-1 block text-[10px] text-zinc-400">{plan.desc}</span>
                {isPermanentPlan(plan) ? (
                  <span className="block">
                    <span className="text-xs text-zinc-400 line-through">¥{plan.price}</span>
                    <span className="block text-lg font-black">¥{plan.couponPrice}</span>
                    <span className="block text-[10px] font-bold text-emerald-600">优惠码后</span>
                  </span>
                ) : (
                  <span className="text-lg font-black">¥{plan.price}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mb-2 flex gap-2">
            <input
              type="email"
              value={buyEmail}
              onChange={event => {
                setBuyEmail(event.target.value);
                resetEmailVerification();
              }}
              placeholder="接收找回信息的邮箱（必填）"
              className="min-w-0 flex-1 border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
            />
            <button
              type="button"
              onClick={requestEmailVerificationCode}
              disabled={emailVerificationState === 'sending'}
              className="shrink-0 border border-black px-3 py-3 text-xs font-bold disabled:opacity-50"
            >
              {emailVerificationState === 'sending' ? '发送中' : '发送验证码'}
            </button>
          </div>

          <div className="mb-2 flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={emailCode}
              onChange={event => setEmailCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6 位邮箱验证码"
              className="min-w-0 flex-1 border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
            />
            <button
              type="button"
              onClick={confirmEmailVerification}
              disabled={emailVerificationState === 'verifying' || emailVerificationState === 'verified'}
              className="shrink-0 border border-black px-3 py-3 text-xs font-bold disabled:opacity-50"
            >
              {emailVerificationState === 'verified' ? '已验证' : '验证邮箱'}
            </button>
          </div>

          {emailVerificationMessage ? (
            <p className={`mb-3 text-xs ${emailVerificationState === 'verified' ? 'text-emerald-600' : 'text-zinc-500'}`}>{emailVerificationMessage}</p>
          ) : null}

          <input
            type="text"
            value={couponInput}
            onChange={event => setCouponInput(event.target.value)}
            placeholder="优惠码（永久版可填：无限迭代）"
            className="mb-2 w-full border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
          />
          {currentPricing.hasValidCoupon ? (
            <p className="mb-3 text-xs font-bold text-emerald-600">已享受永久版优惠价 ¥{currentPricing.price}</p>
          ) : currentPricing.couponError ? (
            <p className="mb-3 text-xs font-bold text-red-600">{currentPricing.couponError}</p>
          ) : (
            <p className="mb-3 text-xs text-zinc-400">永久版原价 ¥39.9，优惠码后 ¥19.9。</p>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleBuy('wechat')}
              disabled={emailVerificationState !== 'verified'}
              className="bg-green-500 px-4 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              微信支付 ¥{currentPricing.price}
            </button>
            <button
              type="button"
              onClick={() => handleBuy('alipay')}
              disabled={emailVerificationState !== 'verified'}
              className="bg-blue-500 px-4 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              支付宝支付 ¥{currentPricing.price}
            </button>
          </div>

          {payError ? <p className="mt-2 text-sm text-red-600">{payError}</p> : null}

          <div className="mt-5 border-t border-zinc-200 pt-4">
            <p className="mb-2 text-xs font-bold text-zinc-700">已付款但没有保存激活码？</p>
            <input
              type="text"
              value={recoveryOrderNo}
              onChange={event => setRecoveryOrderNo(event.target.value)}
              placeholder="输入付款订单号"
              className="mb-2 w-full border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
            />
            <button
              type="button"
              onClick={handleRecoverOrder}
              disabled={emailVerificationState !== 'verified'}
              className="w-full border border-black px-4 py-3 text-sm font-bold transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              用已验证邮箱找回激活码
            </button>
            <p className="mt-2 text-[10px] text-zinc-400">请先使用上方付款邮箱完成验证码验证。</p>
          </div>

          <div className="mt-3 space-y-1 text-[10px] text-zinc-400">
            <p>虚拟商品，一经售出不退不换。</p>
            <p>一个激活码仅可绑定一台设备。</p>
          </div>
        </>
      )}
    </div>
  );
};
