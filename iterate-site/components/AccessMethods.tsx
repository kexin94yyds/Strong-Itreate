
import React from 'react';

const scenarios = [
  {
    title: '长任务做到一半，AI 突然收尾',
    pain: '你本来还要继续追问、补代码、拆任务，但对话已经开始总结。',
    outcome: 'iterate 在结束节点把节奏接住，让你继续推进，而不是重新起一轮。',
  },
  {
    title: '复杂多轮上下文，经常断档',
    pain: '修 Bug、改架构、跑验证时，对话一断就要重新解释上下文。',
    outcome: '把连续多轮任务保留在同一条工作链里，减少重复描述和重新唤醒。',
  },
  {
    title: '桌面做一半，想在手机上继续跟',
    pain: '离开工位后只能等着，任务状态和对话历史带不走。',
    outcome: '支持桌面、网页、移动端接力，重要对话不被设备边界切断。',
  },
  {
    title: '同时用多个 AI 客户端，状态不连续',
    pain: '在 IDE、CLI、桌面 GUI 之间切换时，工作流容易碎掉。',
    outcome: '把多客户端交互收口成一条可续接的链，而不是一堆彼此孤立的会话。',
  },
];

export const AccessMethods: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 mb-4">适用场景</div>
        <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-5xl">你很可能正卡在这些地方</h2>
        <p className="max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
          这不是一个泛用 AI 工具，而是给重度 AI IDE、CLI 与桌面宿主用户的“续接层”。
          如果你经常做长链路任务，下面这些卡点大概率就是你的日常。
        </p>
        <div className="h-1 w-24 bg-black"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <div key={scenario.title} className="border border-black/10 p-6 transition-colors hover:bg-zinc-50 md:p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-5">
              Pain → Continue
            </div>
            <h3 className="mb-4 text-xl font-black leading-tight tracking-tight md:text-2xl">
              {scenario.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-500 md:text-base">
              {scenario.pain}
            </p>
            <p className="border-l-2 border-black pl-4 text-sm font-medium leading-relaxed text-black md:text-base">
              {scenario.outcome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
