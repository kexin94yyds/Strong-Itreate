
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import faviconUrl from '../favicon-rounded-preview.png';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md border border-black/10 bg-white p-6 text-black shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-black"
          >
            关闭
          </button>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

const DeveloperContent: React.FC = () => (
  <>
    <div className="space-y-2 border-b border-black/10 pb-4">
      <p className="text-base font-semibold text-black">vibe coder: 可鑫</p>
      <p>
        个人网站：
        <a href="https://iterate.xin" target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-4">
          iterate.xin
        </a>
      </p>
      <p>
        笔记软件：
        <a href="https://relearn.xin" target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-4">
          relearn.xin
        </a>
      </p>
      <p>
        看书网站：
        <a href="https://tobooks.xin" target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-4">
          tobooks.xin
        </a>
      </p>
    </div>

    <div className="space-y-2">
      <p className="font-medium text-black">联系方式</p>
      <p>邮箱：<span className="font-medium text-black">ymx94yyds@qq.com</span></p>
      <p>微信：<span className="font-medium text-black">ymx94yyds</span></p>
    </div>
  </>
);

export const Footer: React.FC = () => {
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-white/5 bg-black px-6 py-8 text-white md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex items-center space-x-3 font-bold tracking-tight">
            <img src={faviconUrl} alt="iterate icon" className="h-8 w-8 rounded-lg object-contain" />
            <span className="text-xl">iterate.xin</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500 md:gap-8">
            <a href="#scenarios" className="transition-colors hover:text-white">适用场景</a>
            <a href="#features" className="transition-colors hover:text-white">核心能力</a>
            <a href="#pricing" className="transition-colors hover:text-white">定价</a>
            <a href="#download" className="transition-colors hover:text-white">下载</a>
            <button
              type="button"
              onClick={() => setIsDeveloperOpen(true)}
              className="transition-colors hover:text-white"
            >
              开发者
            </button>
          </div>

          <div className="text-xs text-zinc-600 md:text-right md:text-sm">
            <p>© {new Date().getFullYear()} iterate.xin. All rights reserved.</p>
            <p className="mt-2 text-zinc-500">QQ 交流群：186107551</p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isDeveloperOpen} onClose={() => setIsDeveloperOpen(false)} title="开发者">
        <DeveloperContent />
      </Modal>
    </>
  );
};
