
import React from 'react';

interface FeatureProps {
  isDarkMode: boolean;
}

const features = [
  {
    id: 'zhi',
    title: '🛑 Zhi (智)',
    subtitle: '智能拦截',
    desc: 'AI 准备收尾时自动弹出 GUI 交互窗口，实现拦截并无缝继续对话，保护工作流节奏。'
  },
  {
    id: 'ji',
    title: '🧠 Ji (记)',
    subtitle: '记忆管理',
    desc: '按项目存储 Rule、Preference、Note 等多维度记忆，让 AI 真正懂你。'
  },
  {
    id: 'sou',
    title: '🔍 Sou (搜)',
    subtitle: '语义搜索',
    desc: '基于 acemcp 的高效代码检索，自动检测变更并同步索引。'
  },
  {
    id: 'pai',
    title: '📋 Pai (派)',
    subtitle: '子代理派发',
    desc: '复杂任务自动拆分为结构化 Prompt，派发给多路 AI 协同作战。'
  },
  {
    id: 'xi',
    title: '📘 Xi (习)',
    subtitle: '经验查找',
    desc: '在知识库中精准匹配历史最佳实践与模式。'
  },
  {
    id: 'ci',
    title: '📝 Ci (词)',
    subtitle: '提示词库',
    desc: '分目录管理提示词模板，一键检索并插入对话。'
  }
];

export const Features: React.FC<FeatureProps> = ({ isDarkMode }) => {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/20 border border-zinc-800/20 overflow-hidden rounded-3xl">
        {features.map((f) => (
          <div 
            key={f.id} 
            className={`p-10 transition-colors duration-300 flex flex-col space-y-4 ${isDarkMode ? 'bg-black hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50'}`}
          >
            <h3 className="text-2xl font-bold tracking-tight">{f.title}</h3>
            <span className={`text-xs uppercase tracking-widest font-bold opacity-50`}>{f.subtitle}</span>
            <p className="text-sm leading-relaxed opacity-60">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center space-y-8">
        <h3 className="text-4xl font-bold tracking-tight">不仅仅是工具，更是协议。</h3>
        <p className="max-w-2xl mx-auto opacity-60 leading-relaxed">
          基于标准 MCP (Model Context Protocol)，完美适配 Claude Desktop, Cursor, Windsurf 等主流 AI 编辑器与助手。
        </p>
      </div>
    </section>
  );
};
