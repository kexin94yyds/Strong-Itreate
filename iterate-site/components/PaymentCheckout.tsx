import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  ALIPAY_RETURN_CHANNEL,
  ALIPAY_RETURN_STORAGE_KEY,
  isAlipayReturnPayload,
  type AlipayReturnPayload,
} from '../lib/alipayReturn';

type PaymentMethod = 'wechat' | 'alipay';
type PayStep = 'idle' | 'paying' | 'success';

const PAYMENT_API_URL = 'https://wechat-y-server-vjfbztievl.cn-shanghai.fcapp.run';
const INSTALL_GUIDE_URL = 'https://iterate.xin/iterate/INSTALLATION.md';
const DOWNLOAD_LINKS = {
  mac: 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate_aarch64.dmg',
  win: 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate-windows-x64.zip',
} as const;

const PLANS = [
  { id: 'day1', label: '1 天', desc: '快速体验', price: 1.99, productId: 'iterate_day1', productName: 'Iterate 1天体验' },
  { id: 'day7', label: '7 天', desc: '深度体验', price: 10, productId: 'iterate_day7', productName: 'Iterate 7天体验' },
  { id: 'permanent', label: '永久', desc: '终身使用', price: 49.9, couponPrice: 19.9, productId: 'iterate_permanent', productName: 'Iterate 永久版', popular: true },
] as const;

type Plan = typeof PLANS[number];
type PlanId = Plan['id'];

type PaymentCheckoutProps = {
  defaultPlan?: PlanId;
  successHref?: string;
  successLabel?: string;
  showInstallLinks?: boolean;
};

type PaymentApiResponse = Record<string, unknown>;

function isPermanentPlan(plan: Plan): plan is Extract<Plan, { id: 'permanent' }> {
  return plan.id === 'permanent';
}

function resolvePlanPricing(plan: Plan, couponCode: string) {
  const normalizedCoupon = couponCode.trim();

  return {
    price: plan.price,
    couponCode: normalizedCoupon,
    hasCouponInput: normalizedCoupon.length > 0,
    couponError: '',
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

function getApiString(data: PaymentApiResponse, key: string) {
  const value = data[key];
  return typeof value === 'string' ? value.trim() : '';
}

function getApiErrorMessage(data: PaymentApiResponse, fallback: string) {
  return getApiString(data, 'error') || getApiString(data, 'message') || fallback;
}

function isApiShapeError(error: unknown) {
  return error instanceof Error && (
    error.message.includes('支付服务接口尚未部署')
    || error.message.includes('非 JSON 响应')
  );
}

async function readPaymentApiJson(response: Response, fallback: string): Promise<PaymentApiResponse> {
  const text = await response.text();
  if (!text.trim())
    return {};

  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === 'object' ? parsed as PaymentApiResponse : {};
  }
  catch {
    if (response.status === 404)
      throw new Error('支付服务接口尚未部署，请稍后再试。');

    throw new Error(`${fallback}：支付服务返回了非 JSON 响应 (${response.status})`);
  }
}

async function claimIterateLicense(claimToken: string) {
  const response = await fetch(`${PAYMENT_API_URL}/api/iterate/claim-license`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claimToken }),
  });
  const data = await readPaymentApiJson(response, '领取激活码失败');
  const licenseKey = getApiString(data, 'licenseKey');

  if (!response.ok || !data.success || !licenseKey)
    throw new Error(getApiErrorMessage(data, '领取激活码失败'));

  return licenseKey;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  defaultPlan = 'permanent',
  successHref = '#download',
  successLabel = '继续下载客户端',
  showInstallLinks = false,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(defaultPlan);
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [payStep, setPayStep] = useState<PayStep>('idle');
  const [payError, setPayError] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [cashierUrl, setCashierUrl] = useState('');
  const qrCanvasRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const orderRef = useRef<string | null>(null);
  const paymentAccessRef = useRef<string | null>(null);

  const currentPlan = PLANS.find(plan => plan.id === selectedPlan)!;
  const currentPricing = resolvePlanPricing(currentPlan, couponInput);

  function handleAlipayReturn(payload: AlipayReturnPayload) {
    if (!orderRef.current || payload.orderNo !== orderRef.current)
      return;

    setPayError('');
    startPaymentPolling();
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
        const data = await readPaymentApiJson(response, '支付状态查询失败');

        if (data.status === 'success') {
          const claimToken = getApiString(data, 'claimToken');
          if (!claimToken)
            return;

          const licenseKey = await claimIterateLicense(claimToken);
          clearInterval(pollRef.current!);
          setActivationCode(licenseKey);
          setPayStep('success');
        }
        else if (data.status === 'claimed') {
          clearInterval(pollRef.current!);
          setPayError('激活码已领取。如未保存，请联系支持并提供订单号。');
          setPayStep('idle');
        }
        else if (data.status === 'failed') {
          clearInterval(pollRef.current!);
          setPayError('支付失败，请重新发起支付。');
          setPayStep('idle');
        }
        else if (!data.success && response.status === 403) {
          clearInterval(pollRef.current!);
          setPayError('订单访问已失效，请重新发起支付或联系支持并提供订单号。');
          setPayStep('idle');
        }
      }
      catch (error) {
        if (isApiShapeError(error)) {
          clearInterval(pollRef.current!);
          setPayError(error instanceof Error ? error.message : '支付状态查询失败');
          setPayStep('idle');
        }
      }
    }, 3000);
  }

  async function handleBuy(method: PaymentMethod) {
    setPaymentMethod(method);
    setPayError('');
    setOrderAmount(null);
    setCashierUrl('');

    if (currentPricing.couponError) {
      setPayError(currentPricing.couponError);
      return;
    }

    let cashierWindow: Window | null = null;
    if (method === 'alipay')
      cashierWindow = window.open('about:blank', '_blank');

    setPayStep('paying');

    try {
      const body: Record<string, unknown> = {
        videoId: currentPlan.productId,
        videoTitle: currentPlan.productName,
        paymentMethod: method,
      };
      if (currentPricing.couponCode)
        body.couponCode = currentPricing.couponCode;

      const response = await fetch(`${PAYMENT_API_URL}/api/iterate/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await readPaymentApiJson(response, '创建订单失败');
      const codeUrl = getApiString(data, 'codeUrl') || getApiString(data, 'code_url');
      const payUrl = getApiString(data, 'payUrl') || getApiString(data, 'paymentUrl') || (method === 'alipay' ? codeUrl : '');
      const paymentAccessToken = getApiString(data, 'paymentAccessToken');
      const orderNo = getApiString(data, 'orderNo');
      const paymentTarget = method === 'alipay' ? payUrl : codeUrl;

      if (!response.ok || !data.success || !paymentTarget || !paymentAccessToken || !orderNo)
        throw new Error(getApiErrorMessage(data, '创建订单失败'));

      orderRef.current = orderNo;
      paymentAccessRef.current = paymentAccessToken;
      setOrderAmount(resolveOrderAmount(data, currentPricing.price));

      if (method === 'alipay') {
        setCashierUrl(paymentTarget);
        if (cashierWindow && !cashierWindow.closed) {
          cashierWindow.opener = null;
          cashierWindow.location.href = paymentTarget;
        }
        else {
          setPayError('浏览器阻止了新窗口，请点击下方按钮打开支付宝收银台。');
        }
        startPaymentPolling();
        return;
      }

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
      if (cashierWindow && !cashierWindow.closed)
        cashierWindow.close();
      setPayError(error instanceof Error ? error.message : '网络错误');
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
    let channel: BroadcastChannel | null = null;

    const consumePayload = (value: unknown) => {
      if (isAlipayReturnPayload(value))
        handleAlipayReturn(value);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin)
        consumePayload(event.data);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== ALIPAY_RETURN_STORAGE_KEY || !event.newValue)
        return;

      try {
        consumePayload(JSON.parse(event.newValue));
      }
      catch {
        // Ignore malformed cross-tab messages.
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorage);

    if ('BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel(ALIPAY_RETURN_CHANNEL);
        channel.onmessage = event => consumePayload(event.data);
      }
      catch {
        channel = null;
      }
    }

    try {
      const cachedPayload = window.localStorage.getItem(ALIPAY_RETURN_STORAGE_KEY);
      if (cachedPayload)
        consumePayload(JSON.parse(cachedPayload));
    }
    catch {
      // localStorage can be unavailable in restricted browser modes.
    }

    return () => {
      if (pollRef.current)
        clearInterval(pollRef.current);
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorage);
      channel?.close();
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
          {orderRef.current ? <p className="mb-4 text-xs text-zinc-500">订单号：{orderRef.current}</p> : null}
          <p className="mb-5 text-xs text-amber-600">关闭页面前请确认激活码和订单号已保存。遗失后请联系支持并提供订单号。</p>
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
          {paymentMethod === 'alipay' ? (
            <>
              <div className="mb-2 text-xl font-bold">支付宝官方收银台</div>
              <p className="mb-4 text-sm text-zinc-500">请在新打开的支付宝页面完成付款，本页会自动等待支付结果并返回激活码。</p>
              <div className="mx-auto mb-4 flex h-[160px] w-[220px] flex-col items-center justify-center border border-zinc-200 bg-zinc-50 px-5">
                <span className="mb-3 text-3xl font-black text-[#1677ff]">支付宝</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Official Cashier</span>
              </div>
              {cashierUrl ? (
                <a
                  href={cashierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 inline-flex items-center justify-center bg-blue-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600"
                >
                  打开支付宝收银台
                </a>
              ) : null}
            </>
          ) : (
            <>
              <div className="mb-2 text-xl font-bold">微信扫码支付</div>
              <p className="mb-4 text-sm text-zinc-500">请使用微信扫描下方二维码，支付成功后会自动返回激活码。</p>
              <div ref={qrCanvasRef} className="mx-auto mb-3 inline-flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                <span className="text-sm text-zinc-400">二维码生成中...</span>
              </div>
            </>
          )}
          <p className="text-lg font-black">¥{orderAmount ?? currentPricing.price}</p>
          {currentPricing.hasCouponInput ? <p className="mt-1 text-xs text-emerald-600">已提交优惠码，实际金额以订单为准。</p> : null}
          <p className="mt-1 text-xs text-zinc-400">订单号：{orderRef.current}</p>
          <p className="mt-1 text-xs text-zinc-400">最长等待约 5 分钟。</p>
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

          <input
            type="text"
            value={couponInput}
            onChange={event => setCouponInput(event.target.value)}
            placeholder="优惠码（可选）"
            className="mb-2 w-full border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
          />
          {currentPricing.hasCouponInput ? (
            <p className="mb-3 text-xs font-bold text-emerald-600">已填写优惠码，实际支付金额以订单为准。</p>
          ) : currentPricing.couponError ? (
            <p className="mb-3 text-xs font-bold text-red-600">{currentPricing.couponError}</p>
          ) : (
            <p className="mb-3 text-xs text-zinc-400">如有优惠码，请输入后再支付。</p>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleBuy('wechat')}
              className="bg-green-500 px-4 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-green-600"
            >
              微信支付 ¥{currentPricing.price}
            </button>
            <button
              type="button"
              onClick={() => handleBuy('alipay')}
              className="bg-blue-500 px-4 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-600"
            >
              支付宝收银台 ¥{currentPricing.price}
            </button>
          </div>

          {payError ? <p className="mt-2 text-sm text-red-600">{payError}</p> : null}

          <div className="mt-3 space-y-1 text-[10px] text-zinc-400">
            <p>虚拟商品，一经售出不退不换。</p>
            <p>一个激活码仅可绑定一台设备。</p>
          </div>
        </>
      )}
    </div>
  );
};
