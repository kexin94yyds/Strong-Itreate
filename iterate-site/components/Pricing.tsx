import React from 'react';
import { PaymentCheckout } from './PaymentCheckout';

export const Pricing: React.FC = () => (
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div className="space-y-8">
        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Purchase License</div>
          <h2 className="mb-6 text-5xl font-black leading-none tracking-tighter md:text-6xl">
            直接购买激活码，
            <br />
            支付后立刻开用。
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            选择套餐，再用微信或支付宝扫码支付。支付成功后页面会立即返回激活码。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-white/10 bg-black/30 p-6">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Why Buy</div>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>1. 支付成功后即时返回激活码，不再等待人工发放。</p>
              <p>2. 首页购买区和独立购买页共用同一条安全支付链路。</p>
              <p>3. 支付页返回激活码和订单号，请在关闭页面前保存。</p>
            </div>
          </div>

          <div className="border border-white/10 bg-zinc-950 p-6">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">After Payment</div>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>01. 选择微信或支付宝扫码支付。</p>
              <p>02. 支付成功后页面返回一次性领取 token，再兑换激活码。</p>
              <p>03. 激活码丢失时，请提供订单号联系支持。</p>
            </div>
          </div>
        </div>
      </div>

      <PaymentCheckout defaultPlan="day7" successHref="#download" successLabel="继续下载客户端" />
    </div>
  </div>
);
