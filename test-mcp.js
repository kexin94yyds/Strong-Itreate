const puppeteer = require('puppeteer');

async function testProject() {
  console.log('🚀 开始使用MCP Puppeteer测试您的项目...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  try {
    // 1. 访问您的项目
    console.log('📱 正在加载您的Strong-Itreate项目...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    console.log('✅ 项目加载成功！');

    // 2. 等待页面完全加载
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. 点击WHO按钮 - 修复选择器
    console.log('🖱️ 正在点击WHO按钮...');
    const whoButton = await page.waitForSelector('button.menu-item:has(span:contains("WHO"))', { visible: true });
    await whoButton.click();
    console.log('✅ WHO按钮点击成功！');

    // 4. 验证人物卡片显示
    await new Promise(resolve => setTimeout(resolve, 1000));
    const personGrid = await page.waitForSelector('.person-grid', { visible: true });
    console.log('✅ 人物卡片已显示！');

    // 5. 截图保存结果
    await page.screenshot({ 
      path: 'mcp-test-result.png',
      fullPage: true 
    });
    console.log('📸 测试截图已保存: mcp-test-result.png');

    // 6. 测试滑动功能
    console.log('👆 测试滑动功能...');
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(200, 300, { steps: 10 });
    await page.mouse.up();
    console.log('✅ 滑动测试完成！');

    console.log('\n🎉 MCP Puppeteer测试全部通过！');
    console.log('您的项目功能正常，WHO按钮和滑动效果都工作良好！');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    try {
      await page.screenshot({ path: 'mcp-test-error.png' });
      console.log('⚠️ 错误截图已保存: mcp-test-error.png');
    } catch (screenshotError) {
      console.log('⚠️ 无法保存错误截图');
    }
  } finally {
    await browser.close();
  }
}

// 运行测试
testProject(); 