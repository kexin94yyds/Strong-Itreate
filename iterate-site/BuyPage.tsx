import React from 'react';
import { PageShell } from './components/PageShell';
import { PaymentCheckout } from './components/PaymentCheckout';

const heroAside = (
  <div className="space-y-4">
    <div className="border border-white/10 bg-white/5 p-6">
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">你会在这里拿到什么</div>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
        <p>支付成功后立刻返回正式激活码。</p>
        <p>付款邮箱会绑定订单，页面关闭后仍可找回。</p>
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

const BuyPage: React.FC = () => {
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
