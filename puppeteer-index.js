const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 显示浏览器界面
    defaultViewport: null, // 使用默认视口大小
    args: ['--start-maximized'] // 启动时最大化窗口
  });
  
  const page = await browser.newPage();
  
  // 加载本地 index.html 文件
  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`);
  
  console.log('页面已打开，标题为:', await page.title());
  
  // 保持浏览器打开
  console.log('按 Ctrl+C 退出...');
})();