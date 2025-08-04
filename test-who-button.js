const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  // 启动浏览器（显示界面方便调试）
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
    defaultViewport: null,
    slowMo: 100 // 操作减速100ms方便观察
  });

  const page = await browser.newPage();
  const htmlPath = 'file://' + path.resolve('/Users/apple/测试马上删除/Strong-Itreate/index.html');

  try {
    console.log('🔍 开始测试WHO按钮功能...');

    // 1. 加载页面
    await page.goto(htmlPath, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    console.log('✅ 页面加载成功');

    // 2. 点击WHO按钮
    const whoBtn = await page.waitForSelector('.menu-item:has-text("WHO")', { visible: true });
    await whoBtn.click();
    console.log('✅ 已点击WHO按钮');

    // 3. 验证人物卡片显示
    await page.waitForFunction(() => {
      const grid = document.querySelector('.person-grid');
      return window.getComputedStyle(grid).display !== 'none';
    }, { timeout: 5000 });

    // 4. 额外验证：检查可鑫的图片是否加载
    const kexinImg = await page.waitForSelector('.profile-image[src*="kexin.jpg"]', { visible: true });
    console.log('✅ 人物卡片内容加载正常');

    // 5. 截图保存测试结果
    await page.screenshot({ 
      path: 'who-button-test-result.png',
      fullPage: true 
    });
    console.log('📸 已保存测试截图: who-button-test-result.png');

    console.log('\n🎉 测试全部通过！WHO按钮功能正常');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    await page.screenshot({ path: 'test-error.png' });
    console.log('⚠️ 错误截图已保存: test-error.png');
  } finally {
    await browser.close();
  }
})(); 