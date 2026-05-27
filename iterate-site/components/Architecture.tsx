
import React from 'react';

interface ArchProps {
  isDarkMode: boolean;
}

export const Architecture: React.FC<ArchProps> = ({ isDarkMode }) => {
  return (
    <section id="architecture" className={`py-32 px-6 ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div className="max-w-5xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">多端协同，全场覆盖</h2>
          <p className="opacity-60">从 IDE 到桌面，从 iOS 到 Telegram，Iterate 随处不在。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: '桌面应用', platforms: 'macOS / Windows', tech: 'Tauri + Rust' },
            { name: 'IDE 插件', platforms: 'VSCode / Cursor', tech: 'MCP Server' },
            { name: '移动桥接', platforms: 'iOS / Web', tech: 'CF Tunnel' }
          ].map((item, i) => (
            <div key={i} className={`p-8 rounded-2xl border transition-all hover:translate-y-[-4px] ${isDarkMode ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'}`}>
              <div className="mb-4 inline-block p-3 rounded-lg bg-zinc-500/10">
                <div className="w-6 h-6 border-2 border-current rounded-sm"></div>
              </div>
              <h4 className="text-xl font-bold mb-1">{item.name}</h4>
              <p className="text-sm opacity-60 mb-4">{item.platforms}</p>
              <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-40">
                {item.tech}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-20 p-8 md:p-12 rounded-3xl border-2 border-dashed ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left space-y-2">
              <h3 className="text-2xl font-bold">无限迭代的核心</h3>
              <p className="opacity-60 max-w-md">基于 Rust (Tauri) 后端实现的高性能拦截引擎，保证每次对话都能在毫秒级完成状态锁定与恢复。</p>
            </div>
            <div className={`px-6 py-4 rounded-xl font-mono text-xs ${isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
              $ iterate --serve --port 5310
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
