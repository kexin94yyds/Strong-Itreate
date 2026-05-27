
import React from 'react';

const personalizationItems = [
  { label: '主题', value: '深色 / 浅色模式', icon: '🌓' },
  { label: '窗口', value: '尺寸控制 & 置顶固定', icon: '🪟' },
  { label: 'MCP 工具', value: '按需开关工具', icon: '🛠️' },
  { label: '自动回复', value: '自定义继续提示词', icon: '🔄' },
  { label: '通知', value: '内置 & 自定义音效提醒', icon: '🔊' },
  { label: '容错', value: '30秒超时 & 3次重试', icon: '🛡️' }
];

export const Personalization: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 text-right">
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">个性化定制</h2>
        <div className="h-1 w-24 bg-white ml-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalizationItems.map((item, idx) => (
          <div key={idx} className="p-8 border border-white/10 hover:border-white/40 transition-all group">
            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all transform group-hover:-translate-y-1">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{item.label}</h3>
            <p className="text-zinc-500 font-medium">{item.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-12 bg-white text-black">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="text-3xl font-black uppercase tracking-tighter">准备好进化了吗？</h4>
            <p className="text-zinc-600 mt-2">加入迭代工作流的未来。</p>
          </div>
          <a href="#pricing" className="px-10 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            获取许可证
          </a>
        </div>
      </div>
    </div>
  );
};
