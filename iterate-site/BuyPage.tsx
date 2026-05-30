import React from 'react';
import { PageShell } from './components/PageShell';
import { PaymentCheckout } from './components/PaymentCheckout';
import { parseAlipayReturnPayload, publishAlipayReturn, type AlipayReturnPayload } from './lib/alipayReturn';

const heroAside = (
  <div className="space-y-4">
    <div className="border border-white/10 bg-white/5 p-6">
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">你会在这里拿到什么</div>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
        <p>支付成功后立刻返回正式激活码。</p>
        <p>页面会展示订单号，请和激活码一起保存。</p>
        <p>支持 1 天版、7 天版和永久版；永久版可用优惠码。</p>
      </div>
    </div>
    <div className="border border-white/10 bg-white/5 p-6">
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">购买后下一步</div>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
        <p><span className="mr-2 text-white">01</span>复制激活码。</p>
        <p><span className="mr-2 text-white">02</span>前往下载页，选择你的系统版本。</p>
        <p><span className="mr-2 text-white">03</span>打开客户端，在激活窗口中粘贴即可。</p>
      </div>
    </div>
  </div>
);

const AlipayReturnNotice: React.FC<{ payload: AlipayReturnPayload }> = ({ payload }) => {
  React.useEffect(() => {
    publishAlipayReturn(payload);
    const timer = window.setTimeout(() => {
      window.close();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [payload]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center">
        <div className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Alipay Return</div>
        <h1 className="mb-5 text-4xl font-black tracking-tight md:text-5xl">支付结果已返回</h1>
        <p className="mb-8 text-base leading-relaxed text-zinc-300">
          请回到原来的购买页面，激活码会在那里自动显示。这个返回页会尝试自动关闭；如果没有关闭，可以手动关闭本页。
        </p>
        <div className="mb-8 space-y-2 border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
          <p>订单号：<span className="font-mono text-white">{payload.orderNo}</span></p>
          {payload.amount ? <p>支付金额：<span className="font-mono text-white">¥{payload.amount}</span></p> : null}
          {payload.tradeNo ? <p>支付宝交易号：<span className="font-mono text-white">{payload.tradeNo}</span></p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.close()}
            className="bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-black transition-colors hover:bg-zinc-200"
          >
            关闭本页
          </button>
          <a
            href="/iterate/#pricing"
            className="border border-white/20 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
          >
            回到购买区
          </a>
        </div>
      </div>
    </main>
  );
};

const BuyPage: React.FC = () => {
  const alipayReturnPayload = parseAlipayReturnPayload();

  if (alipayReturnPayload)
    return <AlipayReturnNotice payload={alipayReturnPayload} />;

  return (
    <PageShell
      badge="Instant Activation"
      title={<>购买激活码，<br />支付后立即可用。</>}
      description="这页只负责成交和回填激活码。你可以先买再下载，也可以支付成功后直接跳转到下载页完成安装。"
      pageCta={{ href: '/iterate/download.html', label: '查看下载' }}
      heroAside={heroAside}
    >
      <div className="mx-auto max-w-2xl">
        <PaymentCheckout
          defaultPlan="permanent"
          successHref="/iterate/download.html"
          successLabel="前往下载页面"
          showInstallLinks
        />
      </div>
    </PageShell>
  );
};

export default BuyPage;
