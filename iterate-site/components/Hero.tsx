
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start md:justify-center text-center px-5 md:px-6 pt-24 md:pt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full animate-[pulse_8s_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/30 rounded-full animate-[pulse_12s_infinite]"></div>
      </div>

      <div className="relative z-10 max-w-4xl space-y-5 md:space-y-8">
        <div className="mb-4 inline-flex items-center justify-center rounded-[2rem] bg-black p-4 shadow-2xl transition-transform duration-500 hover:scale-105 md:mb-8 md:p-6 group">
           <svg viewBox="0 0 24 24" className="h-16 w-16 text-white md:h-24 md:w-24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase">
          iterate
        </h1>

        <div className="inline-flex items-center gap-2 mx-auto rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Instant License Delivery
        </div>

        <p className="mx-auto max-w-4xl text-3xl font-black leading-[0.95] tracking-tighter md:text-6xl">
          让 AI 对话不中断。
        </p>

        <p className="mx-auto max-w-[20rem] text-base font-light leading-snug tracking-tight text-gray-400 md:max-w-3xl md:text-2xl md:leading-relaxed">
          连接 AI IDE、CLI 与桌面宿主。
          <br />
          让 AI 继续，而不是重来。
        </p>

        <div className="hidden flex-wrap items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:flex">
          <span className="border border-white/10 px-3 py-2">AI IDE</span>
          <span className="border border-white/10 px-3 py-2">AI CLI</span>
          <span className="border border-white/10 px-3 py-2">Desktop Hosts</span>
          <span className="border border-white/10 px-3 py-2">MCP Workflow</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-1 md:flex-row md:gap-4 md:pt-6">
          <a href="#pricing" className="w-full px-6 py-3 bg-white text-black font-bold uppercase tracking-widest transition-all active:scale-95 hover:bg-gray-200 sm:w-auto md:px-8 md:py-4">
            购买激活码
          </a>
          <a href="#download" className="w-full border border-white/15 px-6 py-3 text-white font-bold uppercase tracking-widest transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto md:px-8 md:py-4">
            下载客户端
          </a>
          <a
            href="https://mp.weixin.qq.com/s/XRrM6HONwmHlvw3CF-llVg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-white/10 px-6 py-3 text-[#b6ab98] font-bold uppercase tracking-widest transition-all hover:border-white/25 hover:bg-white/[0.03] hover:text-white sm:w-auto md:px-8 md:py-4"
          >
            为什么是 iterate
          </a>
        </div>

        <div className="hidden space-y-2 pt-2 sm:block">
          <p className="text-sm text-zinc-400">
            支付成功后立即返回激活码，并继续下载客户端完成激活。
          </p>
          <div className="text-xs mono text-zinc-500 py-2">
            macOS Apple Silicon • Windows x64
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 animate-bounce">
        <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
