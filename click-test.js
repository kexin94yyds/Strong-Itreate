const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: false, // 设置为 false 可以看到浏览器操作
        defaultViewport: null, // 使用默认视口大小
    });

    try {
        // 打开新页面
        const page = await browser.newPage();

        // 导航到指定网页
        const url = 'https://example.com'; // 替换为目标网页
        await page.goto(url, { waitUntil: 'networkidle2' });

        // 执行点击操作
        // 示例：点击页面上的某个按钮（通过选择器）
        const buttonSelector = 'button#submit'; // 替换为目标按钮的选择器
        await page.waitForSelector(buttonSelector);
        await page.click(buttonSelector);

        console.log('点击操作完成！');

    } catch (error) {
        console.error('执行过程中出错:', error);
    } finally {
        // 关闭浏览器
        await browser.close();
    }
})();