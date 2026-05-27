
import React, { useState } from 'react';
import { Terminal, Database, Search, Layers, BookOpen, MessageSquare, AlertCircle, RotateCcw, Gem, Brain, Workflow, Plug, Moon, AppWindow, Wrench, RefreshCw, Bell, ShieldCheck } from 'lucide-react';

type TabKey = 'skills' | 'customize' | 'knowledge';

const skills = [
  { icon: Terminal, title: '智 · Zhi', subtitle: 'Continue the thread', desc: 'AI 准备结束时，给你一个继续推进的交互层，而不是被迫另起一轮。', symbol: '01' },
  { icon: Database, title: '记 · Ji', subtitle: 'Persistent memory', desc: '按项目沉淀规则、偏好、笔记和上下文，不用每次重新校准 AI。', symbol: '02' },
  { icon: Search, title: '搜 · Sou', subtitle: 'Find the right context', desc: '把代码、经验和知识重新找回来，减少“我记得之前做过”的时间损耗。', symbol: '03' },
  { icon: Layers, title: '派 · Pai', subtitle: 'Break big work down', desc: '复杂任务可以继续拆、继续分发，不会因为一次回复结束就打断流程。', symbol: '04' },
  { icon: BookOpen, title: '习 · Xi', subtitle: 'Reuse what worked', desc: '把踩过的坑、验证过的方案和团队习惯保留下来，下一次直接复用。', symbol: '05' },
  { icon: MessageSquare, title: '词 · Ci', subtitle: 'Prompt system', desc: '你常用的提示词、工作流和技能可以沉淀为自己的系统，而不是散落在聊天记录里。', symbol: '06' },
];

const customizeItems = [
  { icon: Moon, title: '不是另一个 AI IDE', subtitle: 'Assist, not compete', desc: '它不替代 Codex、Cursor、Claude Code 或 Windsurf，而是加强你和这些工具的交互。', symbol: '01' },
  { icon: AppWindow, title: '独立于任何页面', subtitle: 'A real GUI layer', desc: '它不长在某个页面里，而是独立弹出一个 GUI 界面，把任务接出来继续。', symbol: '02' },
  { icon: Bell, title: '主动弹出，不用守着', subtitle: 'Interrupt at the right time', desc: 'AI 做完一轮后会主动呼出窗口，你不用一直盯着原来的会话等待。', symbol: '03' },
  { icon: RefreshCw, title: '桌面和手机同时收到', subtitle: 'Desktop + mobile', desc: '任务结束时，电脑会弹窗，手机也会收到消息，离开工位也能接住流程。', symbol: '04' },
  { icon: Wrench, title: '人不必常驻 loop', subtitle: 'Review instead of babysit', desc: '你不需要一直插在循环里，只在结果出来时验收、继续或回退。', symbol: '05' },
  { icon: ShieldCheck, title: '一个人并行很多项目', subtitle: 'Parallel loops', desc: '即使同时开几十个窗口、多个项目，也能保持路径和任务状态不容易混。', symbol: '06' },
];

const knowledgeItems = [
  { icon: AlertCircle, title: '直接获得激活能力', subtitle: 'Instant access', desc: '支付完成后立刻返回激活码，不再等待人工确认或排队审核。', symbol: '01' },
  { icon: RotateCcw, title: '持续更新客户端', subtitle: 'Ship, learn, refine', desc: '客户端会沿着真实工作流快速迭代，而不是停在一次性购买页。', symbol: '02' },
  { icon: Gem, title: '购买即进入主流程', subtitle: 'Feature access', desc: '你的目标不是占一个名额，而是立即进入可下载、可激活、可使用的主路径。', symbol: '03' },
  { icon: Brain, title: '真实使用持续反馈', subtitle: 'Use-case driven', desc: '你的工具组合、使用习惯和场景，依然会影响后续产品路线和下载体验。', symbol: '04' },
  { icon: Workflow, title: '购买到安装一条链', subtitle: 'Single conversion path', desc: '从支付、拿码、下载到激活在一个 landing 内完成，减少路径分叉。', symbol: '05' },
  { icon: Plug, title: '从付款到开用', subtitle: 'Pay to install', desc: '你付费不是为了进入名单，而是为了尽快安装客户端，把工作流跑起来。', symbol: '06' },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'skills', label: '核心能力' },
  { key: 'customize', label: '为什么不同' },
  { key: 'knowledge', label: '加入后' },
];

export const Ecosystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600 mb-4">为什么现在购买</div>
        <h2 className="text-5xl font-black tracking-tighter mb-4">你买到的不只是一个激活码</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">先看核心能力，再看为什么值得装到你的桌面工作流里。</p>
        <div className="h-1 w-24 bg-white mx-auto mt-4"></div>
      </div>

      {/* Tab Bar */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-black'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Tab - Comprehensive Modules Style */}
      {activeTab === 'skills' && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-800/30 border border-zinc-800/30">
            {skills.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group p-8 bg-black hover:bg-zinc-900/80 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      <Icon size={24} />
                    </div>
                    <span className="mono text-xs font-medium text-zinc-600 group-hover:text-white">{f.symbol}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{f.title}</h3>
                  <p className="text-sm font-semibold text-zinc-500 mb-4">{f.subtitle}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">不是再多一个工具，而是把断开的流程接起来。</h3>
            <p className="max-w-2xl mx-auto opacity-60 leading-relaxed text-sm">
              从“AI 结束了”变成“任务继续跑”，这是你真正付费购买的核心价值。
            </p>
          </div>
        </div>
      )}

      {/* Customize Tab - Comprehensive Modules Style */}
      {activeTab === 'customize' && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-800/30 border border-zinc-800/30">
            {customizeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group p-8 bg-black hover:bg-zinc-900/80 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      <Icon size={24} />
                    </div>
                    <span className="mono text-xs font-medium text-zinc-600 group-hover:text-white">{item.symbol}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm font-semibold text-zinc-500 mb-4">{item.subtitle}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">它不是换一个编辑器，而是换一种人机协作方式。</h3>
            <p className="max-w-2xl mx-auto opacity-60 leading-relaxed text-sm">
              从“人一直守着 AI”变成“AI 先继续做，结果出来再交给你验收”，这是这块最关键的差异。
            </p>
          </div>
        </div>
      )}

      {/* Knowledge Tab - Comprehensive Modules Style */}
      {activeTab === 'knowledge' && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-800/30 border border-zinc-800/30">
            {knowledgeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group p-8 bg-black hover:bg-zinc-900/80 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      <Icon size={24} />
                    </div>
                    <span className="mono text-xs font-medium text-zinc-600 group-hover:text-white">{item.symbol}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm font-semibold text-zinc-500 mb-4">{item.subtitle}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">购买之后，路径应该继续，而不是结束。</h3>
            <p className="max-w-2xl mx-auto opacity-60 leading-relaxed text-sm">
              支付、拿码、下载、安装、激活，这条路径应该在同一页里顺畅闭环。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
