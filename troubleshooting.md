# 问题排查手册

## 目录
1. [图片加载问题](#图片加载问题)
2. [页面切换功能问题](#页面切换功能问题)

## 图片加载问题

### 问题描述
在多页面切换应用中，某些页面的图片无法正常加载，显示为空白或破损图标。

### 问题原因
1. 图片文件路径错误
   - HTML中引用的图片文件名与实际文件名不匹配
   - 文件扩展名错误（如：使用.jpg而实际文件是.png）

### 排查步骤
1. 检查图片是否存在
   ```bash
   # 使用 list_dir 命令查看当前目录下的所有文件
   ```
2. 验证图片文件名
   - 检查文件名大小写
   - 检查文件扩展名
   - 确认文件名中的特殊字符

3. 检查HTML中的图片路径
   ```html
   <img src="图片文件名.扩展名" alt="描述">
   ```

### 解决方案
1. 使用正确的文件名和扩展名
   - 将HTML中的图片路径改为与实际文件完全匹配的路径
   - 示例：从 `结果主义.jpg` 改为 `张鹏.png`

2. 最佳实践
   - 在开发过程中使用统一的图片命名规范
   - 避免在文件名中使用特殊字符
   - 保持文件扩展名的一致性
   - 在添加新图片时立即测试加载情况

### 相关代码示例
```html
<!-- 修改前 -->
<img src="结果主义.jpg" alt="从结果主义到目的主义">

<!-- 修改后 -->
<img src="张鹏.png" alt="从结果主义到目的主义">
```

### 预防措施
1. 建立图片资源清单
2. 在开发阶段进行图片加载测试
3. 实施统一的文件命名规范
4. 使用版本控制系统追踪图片资源变更

## 页面切换功能问题

### 问题描述
在多页面应用中，下一页按钮点击无响应，页面无法正常切换。具体表现为：
- 下一页按钮可见但点击无效
- 页面内容未按预期切换
- 新页面未能正确显示

### 问题原因
1. 页面显示状态问题
   - 所有页面默认显示或全部隐藏
   - 页面显示状态控制逻辑错误

2. JavaScript事件绑定问题
   - 事件监听器绑定时机不当
   - 重复绑定导致冲突

3. DOM结构问题
   - 页面元素选择器不匹配
   - 动态生成的元素未正确初始化

### 排查步骤
1. 检查页面初始状态
   ```javascript
   // 确保初始化时只显示第一个页面
   mainDefault.style.display = 'flex';
   mainDetails.forEach(detail => {
       detail.style.display = 'none';
   });
   ```

2. 验证事件监听器
   ```javascript
   // 检查事件绑定是否正确
   nextButtons.forEach((button, index) => {
       button.addEventListener('click', () => {
           // 事件处理逻辑
       });
   });
   ```

3. 检查DOM元素选择
   ```javascript
   // 确保正确获取所有必需元素
   const mainDetails = document.querySelectorAll('.main-detail');
   const nextButtons = document.querySelectorAll('.next-episode-btn');
   ```

### 解决方案
1. 正确初始化页面状态
   - 确保主页面正确显示
   - 其他页面默认隐藏
   - 使用正确的显示/隐藏切换方式

2. 实现页面切换逻辑
   ```javascript
   nextButtons.forEach((button, index) => {
       button.addEventListener('click', () => {
           // 隐藏当前页面
           mainDetails[index].style.display = 'none';
           
           // 显示下一个页面或返回主页
           if (mainDetails[index + 1]) {
               mainDetails[index + 1].style.display = 'flex';
           } else {
               mainDefault.style.display = 'flex';
           }
       });
   });
   ```

3. 添加过渡动画效果
   ```javascript
   // 使用GSAP添加平滑过渡
   gsap.fromTo(nextPage,
       { opacity: 0 },
       { 
           opacity: 1,
           duration: 0.5,
           ease: "power2.out"
       }
   );
   ```

### 最佳实践
1. 页面状态管理
   - 使用统一的显示/隐藏控制方法
   - 维护清晰的页面状态
   - 避免页面状态冲突

2. 事件处理
   - 合理组织事件绑定时机
   - 避免重复绑定事件
   - 及时移除不需要的事件监听器

3. 代码组织
   - 模块化页面切换逻辑
   - 使用统一的动画处理方式
   - 保持代码结构清晰

### 预防措施
1. 实施页面状态检查机制
2. 建立完整的页面切换测试用例
3. 使用状态管理工具（适用于复杂应用）
4. 实现页面切换的错误处理机制

---
*最后更新: 2024-03-21* 