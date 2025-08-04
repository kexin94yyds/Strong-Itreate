const puppeteer = require('puppeteer');

async function simpleTest() {
  console.log('🚀 开始简单MCP测试...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  try {
    console.log('📱 访问项目页面...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    console.log('✅ 页面加载成功！');

    // 等待一下让页面完全渲染
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 尝试点击WHO按钮
    console.log('🖱️ 尝试点击WHO按钮...');
    const whoButton = await page.$('button.menu-item');
    if (whoButton) {
      await whoButton.click();
      console.log('✅ WHO按钮点击成功！');
      
      // 等待人物卡片显示
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 截图
      await page.screenshot({ path: 'simple-test-result.png' });
      console.log('📸 截图已保存: simple-test-result.png');
      
      console.log('🎉 简单测试通过！');
    } else {
      console.log('❌ 未找到WHO按钮');
    }

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    try {
      await page.screenshot({ path: 'simple-test-error.png' });
      console.log('⚠️ 错误截图已保存');
    } catch (e) {
      console.log('⚠️ 无法保存截图');
    }
  } finally {
    await browser.close();
  }
}

simpleTest(); 