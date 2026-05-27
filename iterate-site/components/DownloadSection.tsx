import React from 'react';
import faviconUrl from '../favicon-rounded-preview.png';

const MAC_DOWNLOAD_URL = 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate_aarch64.dmg';
const WINDOWS_DOWNLOAD_URL = 'https://github.com/kexin94yyds/iterate-releases/releases/latest/download/iterate-windows-x64.zip';

const downloadItems = [
  '购买后返回激活码，安装客户端即可输入激活',
  '支持 macOS Apple Silicon 与 Windows',
  '客户端下载后即可进入桌面工作流',
];

export const DownloadSection: React.FC = () => {
  return (
    <div className="border-t border-black/10 bg-white px-6 py-24 text-black md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 border-b border-black/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={faviconUrl}
              alt="iterate icon"
              className="h-10 w-10 object-contain"
            />
            <div>
              <div className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Download Client</div>
              <div className="text-3xl font-black tracking-tight">iterate</div>
            </div>
          </div>
          <div className="text-sm leading-relaxed text-zinc-500">
            支付完成后，从这里继续下载客户端并输入激活码。
          </div>
        </div>

        <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
          <img
            src={faviconUrl}
            alt="iterate icon"
            className="mb-8 h-20 w-20 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.12)]"
          />

          <div className="mb-5 text-xs font-black uppercase tracking-[0.26em] text-zinc-500">Desktop Continue Layer</div>
          <h2 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">准备好迎接无限迭代了吗？</h2>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-500">
            下载 iterate 客户端，输入刚刚拿到的激活码，把桌面弹窗、IDE 和 CLI 之间断掉的任务链重新接起来。
          </p>

          <div className="mb-6 flex w-full max-w-4xl flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href={MAC_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-5 text-lg font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 md:w-auto md:min-w-[320px]"
            >
              <span>下载 macOS 版</span>
              <span className="text-sm font-medium text-white/70">Apple Silicon (.DMG)</span>
            </a>
            <a
              href={WINDOWS_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full border border-black bg-white px-8 py-5 text-lg font-bold text-black shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 md:w-auto md:min-w-[320px]"
            >
              <span>下载 Windows 版</span>
              <span className="text-sm font-medium text-black/55">x64 (.ZIP)</span>
            </a>
          </div>

          <div className="mb-12 text-sm text-zinc-400">购买完成后先安装客户端，再输入激活码完成绑定。</div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
            {downloadItems.map(item => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full border border-black/30" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
