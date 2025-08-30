// 导入所有图片资源
import 跑步2024 from './images/跑步2024.JPG';
import 跑步2024愿望 from './images/跑步2024愿望.JPG';
import 越来越强 from './images/越来越强.jpg';
import 死不旋踵 from './images/死不旋踵.webp';
import 世界在我面前 from './images/世界在我面前.png';
import 世界在我面前缓缓展开 from './images/世界在我面前，缓缓展开.JPG';
import 水仙花 from './images/水仙花.png';
import 心中温暖 from './images/心中温暖.jpg';
import 江南书院 from './images/江南书院.png';
import 你怎么就没血了 from './images/你怎么就没血了.PNG';
import 我们没有永远 from './images/我们没有永远.JPG';
import 科目三 from './images/科目三.JPG';
import SlashCommandPrompter from './images/Slash Command Prompter.JPG';
import 笑来 from './images/笑来.JPG';
import 请辩 from './images/请辩.JPG';
import GPTBuilder from './images/GPT Builder.JPG';
import Learn from './images/Learn.png';
import Run from './images/Run.png';
import 事实核查员 from './images/事实核查员.png';
import 将抵月 from './images/将抵月.png';
import 兰顿蚂蚁 from './images/兰顿蚂蚁.webp';
import 做最好的自己 from './images/做最好的自己.jpeg';
import 可控之事 from './images/可控之事.JPG';
import 最好的 from './images/最好的.JPG';
import 李笑来 from './images/李笑来.jpg';
import 笔记神器 from './images/笔记神器.png';
import 自救 from './images/自救.png';
import 金刚柱 from './images/金刚柱.JPG';
import 张鹏 from './images/张鹏.png';
import 曾叔 from './images/曾叔.png';
import 时间管道 from './images/时间管道.JPG';
import AttentionSpanTracker from './images/Attention-Span-Tracker.JPG';
import EpubReaderIcon from './images/Epub 阅读器.png';
import FloatingMD from './images/FloatingMD.png';
import RelaxIcon from './images/relax.png';

// Perlin噪声函数
function noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;
    return lerp(v, lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
        lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)));
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
    return a + t * (b - a);
}

function grad(hash, x, y) {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return ((h & 8) ? -grad : grad) * x + ((h & 4) ? -grad : grad) * y;
}

// 生成置换数组
const p = new Array(512);
for(let i = 0; i < 256; i++) p[i] = p[i + 256] = Math.floor(Math.random() * 256);

// Canvas设置
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 动画循环
let time = 0;
function animate() {
    ctx.fillStyle = '#0066CC';
    ctx.globalAlpha = 0.05;
    
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            const value = noise(x / 100, y / 100 + time / 10) * 0.5 + 0.5;
            const index = (y * canvas.width + x) * 4;
            data[index] = 0;        // R
            data[index + 1] = 102;  // G
            data[index + 2] = 204;  // B
            data[index + 3] = value * 255 * 0.1;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    time += 0.03;
    requestAnimationFrame(animate);
}

// GSAP动画
gsap.to('.venn-diagram', {
    rotation: 360,
    duration: 15,
    repeat: -1,
    ease: 'none'
});

// 视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    gsap.to('.venn-diagram', {
        y: scrolled * 0.2,
        duration: 0.5
    });
});

// 剧集按钮交互
const episodeButtons = document.querySelectorAll('.episode-selector button');
episodeButtons.forEach(button => {
    button.addEventListener('click', () => {
        episodeButtons.forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');
    });
});

// 菜单交互
const menuToggle = document.querySelector('.menu-toggle');
const closeButton = document.querySelector('.close');
const menuItems = document.querySelectorAll('.menu-item');

menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
});

closeButton.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    
    // 隐藏所有详情页面和特殊页面
    mainDetails.forEach(detail => detail.style.display = 'none');
    
    // 隐藏Create相关页面
    const createDetailSection = document.querySelector('.create-detail');
    if (createDetailSection) {
        createDetailSection.style.display = 'none';
    }
    
    // 隐藏插件详情页面
    const pluginView = document.querySelector('.plugin-detail-view');
    if (pluginView) {
        pluginView.style.display = 'none';
    }
    
    // 隐藏GPTS列表页面
    const gptsListView = document.querySelector('.gpts-list-view');
    if (gptsListView) {
        gptsListView.style.display = 'none';
    }
    
    // 隐藏DO相关页面
    const actionGrid = document.querySelector('.action-grid');
    const runStory = document.querySelector('.run-story');
    if (actionGrid) {
        actionGrid.style.display = 'none';
    }
    if (runStory) {
        runStory.style.display = 'none';
    }
    
    // 隐藏Write相关页面
    const writeDetail = document.querySelector('.write-detail');
    if (writeDetail) {
        writeDetail.style.display = 'none';
    }
    
    // 隐藏跑步记录相关元素
    const runningContainer = document.querySelector('.running-container');
    const runningNextBtn = document.querySelector('.running-next-btn');
    if (runningContainer) {
        runningContainer.remove();
    }
    if (runningNextBtn) {
        runningNextBtn.remove();
    }
    
    // 隐藏返回按钮
    if (navBackButton) {
        navBackButton.style.display = 'none';
    }
    
    // 显示主页面
    mainDefault.style.display = 'flex';
    gsap.fromTo(mainDefault,
        { opacity: 0 },
        { 
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }
    );
});

// 点击菜单项时的效果
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const currentActive = document.querySelector('.menu-item.active');
        if (currentActive && currentActive !== item) {
            currentActive.classList.remove('active');
        }
        item.classList.toggle('active');
        
        const actionGrid = document.querySelector('.action-grid');
        const personGrid = document.querySelector('.person-grid');
        
        // 处理 WHO 按钮点击
        if (item.querySelector('span').textContent.trim() === 'WHO') {
            actionGrid.style.display = 'none';
            const runStory = document.querySelector('.run-story');
            runStory.style.display = 'none'; // 隐藏 run-story
            if (personGrid.style.display === 'none' || !personGrid.style.display) {
                personGrid.style.display = 'block';
                // 添加动画效果
                const personCard = personGrid.querySelector('.person-card');
                gsap.fromTo(personCard,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    }
                );
            } else {
                personGrid.style.display = 'none';
            }
        }
        // 处理 DO 按钮点击
        else if (item.querySelector('span').textContent.trim() === 'DO') {
            personGrid.style.display = 'none';
            const runStory = document.querySelector('.run-story');
            if (actionGrid.style.display === 'none' || !actionGrid.style.display) {
                actionGrid.style.display = 'grid';
                runStory.style.display = 'none'; // 确保Run故事内容被隐藏
                // 添加动画效果
                const buttons = actionGrid.querySelectorAll('.action-button');
                gsap.fromTo(buttons,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power2.out"
                    }
                );

                // 为每个action按钮添加点击事件
                buttons.forEach(button => {
                    button.addEventListener('click', () => {
                        if (button.textContent.trim() === 'Run') {
                            actionGrid.style.display = 'none';
                            runStory.style.display = 'block';
                            // 添加动画效果
                            gsap.fromTo(runStory,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    ease: "power2.out"
                                }
                            );
                        } else {
                            // 点击其他按钮时隐藏Run故事内容
                            runStory.style.display = 'none';
                        }
                    });
                });
            } else {
                actionGrid.style.display = 'none';
                runStory.style.display = 'none'; // 关闭菜单时也隐藏Run故事内容
            }
        } else {
            actionGrid.style.display = 'none';
            personGrid.style.display = 'none';
        }
    });
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', (e) => {
    if (!e.target.closest('.side-menu') && 
        !e.target.closest('.menu-toggle') && 
        document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
    }
});

// 详情页面交互
const profileImage = document.querySelector('.profile-image');
const detailView = document.querySelector('.detail-view');
const closeDetail = document.querySelector('.close-detail');
const progressIndicator = document.querySelector('.progress-indicator');
const navBackButton = document.getElementById('nav-back-to-creations-btn'); // Get the button from nav

// main 区域切换逻辑
const mainDefault = document.querySelector('.main-default');
const mainDetails = document.querySelectorAll('.main-detail');

// 初始化：隐藏所有详情页面，显示主页
mainDefault.style.display = 'flex';
mainDetails.forEach(detail => {
    detail.style.display = 'none';
});
if (navBackButton) navBackButton.style.display = 'none'; // Hide nav back button on init

// 点击个人图片时显示第一个详情页面（集成滑动功能）
profileImage.addEventListener('click', () => {
    mainDefault.style.display = 'none';
    mainDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // 重置状态并显示第一个Episode
    currentEpisodeIndex = -1; // 设置为-1，这样showEpisode(0)会正确处理首次显示
    isTransitioning = false;
    showEpisode(0);
    
    if (navBackButton) navBackButton.style.display = 'none'; // Hide nav back button
    document.body.classList.remove('menu-open'); // 自动关闭侧边栏
});

// 原有的"下一页"按钮代码已移除，现在使用滑动切换功能

// 可选：点击 main-detail 区域空白处返回主页
mainDetails.forEach(detail => {
    detail.addEventListener('click', (e) => {
        if (e.target === detail) {
            if (navBackButton) navBackButton.style.display = 'none'; // Hide nav back button
            mainDetails.forEach(d => d.style.display = 'none');
            mainDefault.style.display = 'flex';
            gsap.fromTo(mainDefault,
                { opacity: 0 },
                { 
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }
            );
        }
    });
});

// 关闭详情页面
closeDetail.addEventListener('click', () => {
    detailView.classList.remove('active');
    setTimeout(() => {
        detailView.style.display = 'none';
        // 重置进度条
        progressIndicator.style.width = '0';
    }, 500);
});

// 点击其他区域关闭详情
detailView.addEventListener('click', (e) => {
    if (e.target === detailView) {
        closeDetail.click();
    }
});

// 启动动画
animate();

// Metamorphosis Animation
function initMetamorphosis() {
  const container = document.getElementById('metamorphosis-container');
  if (!container) return;

  const canvas = container.querySelector('.metamorphosis-canvas');
  if (!canvas) return;
  
  // 设置canvas尺寸为窗口大小
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  
  // Configuration
  const numLines = 150;
  const lineSegments = 200;
  const lineAlpha = 0.5;
  const lineWidth = 0.6;
  
  // 基础动画参数 - 大幅提升速度
  const morphSpeed = 0.002;     // 提升4倍
  const rotateSpeed = 0.001;    // 提升4倍
  const cycleTime = 400;        // 减半
  
  // 形态转换节奏 - 加快过渡
  const pauseTime = 0.2;        // 减少停留时间
  const transitionTime = 1 - (pauseTime * 2);  // 增加过渡时间比例
  
  let time = 0;
  
  // Form definitions
  const forms = [
    // Form 1: 布料状波浪形
    (u, v, t) => {
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      
      // 波浪和变形频率 - 提升2-3倍
      const timeWave1 = Math.sin(t * 0.009) * 0.6 + 0.5;   // 提升3倍
      const timeWave2 = Math.cos(t * 0.006) * 0.4 + 0.7;   // 提升3倍
      const timeWave3 = Math.sin(t * 0.012) * 0.5 + 0.6;   // 提升3倍
      
      let r = 120 + 30 * Math.sin(phi * 4 + theta * 2 + t * 0.03);  // 提升3倍
      r += 20 * Math.sin(phi * 6 + t * 0.024) * Math.cos(theta * 3 + t * 0.015);
      r *= timeWave2;
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi) + 20 * Math.sin(theta * 5 + phi * 3 + t * 0.012) * timeWave1;  // Z轴波动
      
      // 流动效果
      const flow = Math.sin(t * 0.006 + phi * 2) * 15 * timeWave3;
      x += flow * Math.cos(theta);
      y += flow * Math.sin(theta);
      
      return { x, y, z };
    },
    
    // Form 2: 角状折叠形
    (u, v, t) => {
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      
      // 呼吸和折叠效果 - 提升2-3倍
      const breathe = Math.sin(t * 0.012) * 0.3 + 1.0;  // 提升3倍
      const fold = Math.cos(t * 0.009) * 0.2 + 0.8;     // 提升3倍
      const twist = Math.sin(t * 0.006) * 0.5;          // 提升3倍
      
      let r = 150 + 20 * Math.cos(phi * 8 + t * 0.01);  // 基础变化
      r *= (0.8 + 0.2 * Math.abs(Math.cos(theta * 2 + t * 0.007))) * breathe;  // 角度变化
      
      const angularShift = Math.sin(t * 0.005 + phi * 3) * 0.3;  // 角度偏移
      const dynamicTheta = theta + angularShift;
      
      let x = r * Math.sin(phi) * Math.cos(dynamicTheta);
      let y = r * Math.sin(phi) * Math.sin(dynamicTheta);
      let z = r * Math.cos(phi) * (fold + 0.3 * Math.sin(dynamicTheta * 4 + t * 0.009));  // Z轴变形
      
      const twistAngle = twist * phi;
      const newX = x * Math.cos(twistAngle) - y * Math.sin(twistAngle);
      const newY = x * Math.sin(twistAngle) + y * Math.cos(twistAngle);
      
      return { x: newX, y: newY, z };
    },
    
    // Form 3: 有机球状形
    (u, v, t) => {
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      
      // 有机体变化 - 提升2-3倍
      const pulse = Math.sin(t * 0.015) * 0.4 + 1.0;    // 提升3倍
      const growth = Math.cos(t * 0.009) * 0.3 + 0.7;   // 提升3倍
      const organicFlow = Math.sin(t * 0.012) * 0.2;    // 提升3倍
      
      let r = 120 * pulse;
      r += 50 * Math.sin(phi * 3 + t * 0.008) * Math.sin(theta * 2.5 + t * 0.006) * growth;  // 第一、二层变形
      r += 30 * Math.cos(phi * 5 + theta + t * 0.01);   // 第三层变形
      
      const hollowShift = Math.sin(t * 0.007);          // 空腔偏移
      const hollow = Math.max(0, Math.sin(phi * 2 + theta * 3 + hollowShift) - 0.7);
      r *= 1 - hollow * (0.8 + organicFlow * 0.3);
      
      const undulation = Math.sin(t * 0.009 + phi * 4) * 10;  // 起伏
      r += undulation;
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
      
      const sway = Math.sin(t * 0.004 + theta) * 8 * growth;  // 摆动
      x += sway * Math.cos(phi);
      y += sway * Math.sin(phi);
      
      return { x, y, z };
    },
    
    // Form 4: 机械六边形
    (u, v, t) => {
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      
      // 机械运动 - 提升2-3倍
      const mechanicalPulse = Math.sin(t * 0.018) * 0.2 + 1.0;  // 提升3倍
      const layerShift = Math.cos(t * 0.012) * 0.3;             // 提升3倍
      const precisionRotation = t * 0.006;                       // 提升3倍
      
      // 管体变化 - 提升2-3倍
      const tubeProgress = Math.sin(t * 0.024 + phi * Math.PI * 4);  // 提升3倍
      const spiralEffect = Math.sin(t * 0.009 + theta * 6);          // 提升3倍
      
      // Create multiple nested hexagonal layers
      const numLayers = 5; // Number of nested hexagons
      const layerSpacing = 0.2; // Distance between layers
      
      // Determine which layer this point belongs to based on phi
      const layerIndex = Math.floor(phi / Math.PI * numLayers);
      const layerProgress = (phi / Math.PI * numLayers) % 1;
      
      // Create hexagonal cross-section with dynamic rotation
      const hexSides = 6;
      const sideAngle = (Math.PI * 2) / hexSides;
      
      // Calculate which hexagon side we're on with layer-specific rotation
      const layerRotation = precisionRotation * (layerIndex + 1) * 0.5;
      const rotatedTheta = theta + layerRotation;
      const sideIndex = Math.floor(rotatedTheta / sideAngle);
      const sideProgress = (rotatedTheta % sideAngle) / sideAngle;
      const hexAngle = sideIndex * sideAngle + sideProgress * sideAngle;
      
      // Create nested structure - each layer gets smaller with dynamic scaling
      const maxRadius = 120;
      const minRadius = 30;
      const dynamicLayerRatio = 1 - (layerIndex / (numLayers - 1)) * (0.7 + layerShift * 0.2);
      const baseRadius = maxRadius * dynamicLayerRatio * mechanicalPulse;
      
      // Create hexagonal shape by adjusting radius based on angle
      const distanceFromCenter = Math.cos((rotatedTheta - sideIndex * sideAngle) - sideAngle/2);
      const hexRadius = baseRadius / Math.max(0.6, Math.abs(distanceFromCenter));
      
      // Tube length varies by layer with dynamic extension
      const dynamicLength = 180 * (0.5 + 0.5 * dynamicLayerRatio) * mechanicalPulse;
      const tubeLength = dynamicLength;
      const normalizedPhi = phi / Math.PI;
      
      let x, y, z;
      
      // Create nested tube structure with dynamic depth
      if (normalizedPhi < 0.15 || normalizedPhi > 0.85) {
        // End caps - create stepped/nested appearance with breathing
        const capRadius = hexRadius * (0.6 + 0.3 * dynamicLayerRatio);
        x = capRadius * Math.cos(hexAngle);
        y = capRadius * Math.sin(hexAngle);
        z = normalizedPhi < 0.15 ? -tubeLength/2 : tubeLength/2;
        
        // Add dynamic depth variation for nested effect
        const dynamicDepthOffset = (layerIndex * layerSpacing * 20) * (1 + layerShift * 0.5);
        z += normalizedPhi < 0.15 ? dynamicDepthOffset : -dynamicDepthOffset;
      } else {
        // Tube body with nested layers and dynamic variations
        const tubeProgress = (normalizedPhi - 0.15) / 0.7;
        z = -tubeLength/2 + tubeProgress * tubeLength;
        
        // Create radius variation along the tube with mechanical precision
        const radiusVariation = 0.9 + 0.1 * Math.sin(tubeProgress * Math.PI * 4 + t * 0.008);
        const radius = hexRadius * radiusVariation;
        
        x = radius * Math.cos(hexAngle);
        y = radius * Math.sin(hexAngle);
        
        // Add dynamic inward spiral for nested effect
        const spiralEffect = layerIndex * 0.1;
        const dynamicSpiralAngle = tubeProgress * Math.PI * spiralEffect + t * 0.003 * layerIndex;
        const newX = x * Math.cos(dynamicSpiralAngle) - y * Math.sin(dynamicSpiralAngle);
        const newY = x * Math.sin(dynamicSpiralAngle) + y * Math.cos(dynamicSpiralAngle);
        x = newX;
        y = newY;
      }
      
      return { x, y, z };
    }
  ];
  
  // Interpolate between forms - letting go of surface to reveal essence
  const interpolateForms = (formA, formB, u, v, t, blend) => {
    const pointA = formA(u, v, t);
    const pointB = formB(u, v, t);
    
    return {
      x: pointA.x * (1 - blend) + pointB.x * blend,
      y: pointA.y * (1 - blend) + pointB.y * blend,
      z: pointA.z * (1 - blend) + pointB.z * blend
    };
  };
  
  // Get the current form - opening to transformation with an open heart
  const getCurrentForm = (u, v, t) => {
    // Calculate which two forms to blend between
    const totalForms = forms.length;
    const position = (t % (cycleTime * totalForms)) / cycleTime;
    const formIndex = Math.floor(position);
    const nextFormIndex = (formIndex + 1) % totalForms;
    
    // Calculate blend with pause and easing
    let rawBlend = position - formIndex;
    
    let blend;
    if (rawBlend < pauseTime) {
      // Initial pause
      blend = 0;
    } else if (rawBlend > (1 - pauseTime)) {
      // End pause
      blend = 1;
    } else {
      // Transition with easing
      const normalizedTime = (rawBlend - pauseTime) / transitionTime;
      // Ease in-out cubic
      blend = normalizedTime < 0.5
        ? 4 * normalizedTime * normalizedTime * normalizedTime
        : 1 - Math.pow(-2 * normalizedTime + 2, 3) / 2;
    }
    
    return interpolateForms(
      forms[formIndex], 
      forms[nextFormIndex], 
      u, v, t, blend
    );
  };
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // 动态旋转变化 - 提升整体速度
    const dynamicRotateSpeed = rotateSpeed * (1 + Math.sin(time * 0.003) * 0.5);  // 提升3倍
    const rotateX = Math.sin(time * dynamicRotateSpeed) * 0.5;
    const rotateY = Math.cos(time * dynamicRotateSpeed * 0.7) * 0.3;
    const rotateZ = time * dynamicRotateSpeed * 0.3 + Math.sin(time * 0.006) * 0.2;  // 提升3倍
    
    // Draw horizontal contour lines
    for (let i = 0; i < numLines; i++) {
      const v = i / (numLines - 1);
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
      ctx.lineWidth = lineWidth;
      
      let lastPointVisible = false;
      let lastPoint = { x: 0, y: 0 };
      
      for (let j = 0; j <= lineSegments; j++) {
        const u = j / lineSegments;
        
        // Get the current form
        const point = getCurrentForm(u, v, time);
        
        // Apply rotation
        const rotatedX = point.x * Math.cos(rotateZ) - point.y * Math.sin(rotateZ);
        const rotatedY = point.x * Math.sin(rotateZ) + point.y * Math.cos(rotateZ);
        const rotatedZ = point.z;
        
        // Project to screen
        const scale = 1.5 + rotatedZ * 0.001;
        const projX = width / 2 + rotatedX * scale;
        const projY = height / 2 + rotatedY * scale;
        
        // Check if point should be visible (simple back-face culling)
        const pointVisible = rotatedZ > -50;
        
        if (j === 0) {
          if (pointVisible) {
            ctx.moveTo(projX, projY);
            lastPointVisible = true;
            lastPoint = { x: projX, y: projY };
          }
        } else {
          if (pointVisible && lastPointVisible) {
            ctx.lineTo(projX, projY);
          } else if (pointVisible && !lastPointVisible) {
            ctx.moveTo(projX, projY);
          }
        }
        
        lastPointVisible = pointVisible;
        lastPoint = { x: projX, y: projY };
      }
      
      ctx.stroke();
    }
    
    // Draw vertical contour lines (fewer)
    for (let i = 0; i < numLines * 0.3; i++) {
      const u = i / (numLines * 0.3 - 1);
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.7})`;
      ctx.lineWidth = lineWidth * 0.7;
      
      let lastPointVisible = false;
      let lastPoint = { x: 0, y: 0 };
      
      for (let j = 0; j <= lineSegments * 0.5; j++) {
        const v = j / (lineSegments * 0.5);
        
        // Get the current form
        const point = getCurrentForm(u, v, time);
        
        // Apply rotation
        const rotatedX = point.x * Math.cos(rotateZ) - point.y * Math.sin(rotateZ);
        const rotatedY = point.x * Math.sin(rotateZ) + point.y * Math.cos(rotateZ);
        const rotatedZ = point.z;
        
        // Project to screen
        const scale = 1.5 + rotatedZ * 0.001;
        const projX = width / 2 + rotatedX * scale;
        const projY = height / 2 + rotatedY * scale;
        
        // Check if point should be visible
        const pointVisible = rotatedZ > -50;
        
        if (j === 0) {
          if (pointVisible) {
            ctx.moveTo(projX, projY);
            lastPointVisible = true;
            lastPoint = { x: projX, y: projY };
          }
        } else {
          if (pointVisible && lastPointVisible) {
            ctx.lineTo(projX, projY);
          } else if (pointVisible && !lastPointVisible) {
            ctx.moveTo(projX, projY);
          }
        }
        
        lastPointVisible = pointVisible;
        lastPoint = { x: projX, y: projY };
      }
      
      ctx.stroke();
    }
    
    time += 1;
    requestAnimationFrame(animate);
  };
  
  animate();
}

// 在页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', () => {
    initMetamorphosis();
});

// 确保在窗口大小改变时重新初始化动画
window.addEventListener('resize', () => {
    initMetamorphosis();
});

// 处理 Run 按钮点击事件
document.querySelector('.action-button:nth-child(7)').addEventListener('click', () => {
    const mainContent = document.querySelector('main');
    const runningImage = document.querySelector('.running-record-image');
    const nextButton = document.querySelector('.running-next-btn');
    const mainDefault = document.querySelector('.main-default');
    
    // 如果不存在运动记录图片元素，则创建一个
    if (!runningImage) {
        // 创建包装容器
        const container = document.createElement('div');
        container.className = 'running-container';
        container.style.position = 'absolute';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '2';
        container.style.width = '80%';
        container.style.maxWidth = '1000px';
        
        // 创建图片元素
        const img = document.createElement('img');
        img.className = 'running-record-image';
        img.src = 跑步2024;
        img.style.width = '90%';
        img.style.height = 'auto';
        img.style.opacity = '0';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        
        // 创建下一页按钮
        const nextBtn = document.createElement('button');
        nextBtn.className = 'running-next-btn next-episode-btn';
        nextBtn.textContent = '›››';
        nextBtn.style.position = 'fixed';
        nextBtn.style.bottom = '40px';
        nextBtn.style.right = '40px';
        nextBtn.style.background = 'none';
        nextBtn.style.border = 'none';
        nextBtn.style.color = 'white';
        nextBtn.style.fontSize = '24px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.padding = '10px';
        nextBtn.style.zIndex = '3';
        nextBtn.style.opacity = '0.8';
        nextBtn.style.transition = 'opacity 0.3s';
        
        // 添加悬停效果
        nextBtn.addEventListener('mouseenter', () => {
            nextBtn.style.opacity = '1';
        });
        nextBtn.addEventListener('mouseleave', () => {
            nextBtn.style.opacity = '0.8';
        });
        
        // 添加按钮点击事件 - 返回主页
        nextBtn.addEventListener('click', () => {
            // 淡出当前内容
            gsap.to(container, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    // 移除跑步记录相关元素
                    container.remove();
                    nextBtn.remove();
                    
                    // 显示主页内容
                    mainDefault.style.display = 'flex';
                    gsap.fromTo(mainDefault,
                        { opacity: 0 },
                        { 
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        }
                    );
                }
            });
        });
        
        // 将元素添加到页面
        container.appendChild(img);
        document.body.appendChild(nextBtn);
        mainContent.appendChild(container);
        
        // 添加淡入动画
        gsap.to(img, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // 隐藏主页内容
        mainDefault.style.display = 'none';
    }
});

// 处理 WRITE 按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const writeButton = document.querySelector('.action-button:nth-child(9)'); // WRITE 按钮
    const mainDefault = document.querySelector('.main-default');
    
    writeButton.addEventListener('click', () => {
        mainDefault.style.display = 'none';
        document.querySelectorAll('.main-detail').forEach(detail => {
            if (!detail.classList.contains('write-detail')) {
            detail.style.display = 'none';
            }
        });
        
        let writeDetail = document.querySelector('.write-detail');
        if (!writeDetail) {
            writeDetail = document.createElement('div');
            writeDetail.className = 'main-detail write-detail';
            writeDetail.style.flexDirection = 'column';
            writeDetail.style.alignItems = 'stretch'; 
            writeDetail.style.padding = '2rem 1.5rem'; 
            writeDetail.style.textAlign = 'left';
            writeDetail.style.justifyContent = 'flex-start';
            writeDetail.style.backgroundColor = '#121212'; 

            writeDetail.innerHTML = `
                <div style="margin-bottom: 2rem; text-align: center;">
                    <div class="season-info" style="font-size: 0.8rem; color: #999; margin-bottom: 0.2rem;">MY WRITINGS</div>
                    <!-- <h2 class="detail-title" style="font-size: 1.8rem; color: #e0e0e0; margin-top: 0; letter-spacing: 1px;">微信公众号文章</h2> -->
                        </div>
                <div class="articles-container-wrapper" style="max-width: 750px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; flex-grow: 1;">
                    <div class="wechat-articles-list" style="display: flex; flex-wrap: wrap; justify-content: space-between; overflow-y: auto; width: 100%; flex-grow: 1; align-content: space-around;">
                        
                        <!-- Article Card 1 -->
                        <div class="wechat-article-card" data-article-id="article-1" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-07-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">越来越强</h3>
                                <!-- <p class="article-meta" style="font-size: 0.75rem; color: #777; margin-bottom: 0;">60 reads · 9 likes · 2 shared</p> -->
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${越来越强}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 2 (New: 生命力) -->
                        <div class="wechat-article-card" data-article-id="article-2" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-05-10</p> <!-- Date from original article-3 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命力</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${死不旋踵}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                        
                        <!-- Article Card 3 (New: TO 2024) -->
                        <div class="wechat-article-card" data-article-id="article-3" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-04-20</p> <!-- Date from original article-4 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">TO 2024</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${世界在我面前}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                         <!-- Article Card 4 (New: 世界在我前面，缓缓展开) -->
                        <div class="wechat-article-card" data-article-id="article-4" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-06-28</p> <!-- Date from original article-2 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">世界在我前面，缓缓展开</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${世界在我面前缓缓展开}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 5 -->
                        <div class="wechat-article-card" data-article-id="article-5" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-03-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与自己</h3>
                                <!-- <p class="article-meta" style="font-size: 0.75rem; color: #777; margin-bottom: 0;">300 reads · 40 likes · 15 shared</p> -->
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${水仙花}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 6 -->
                        <div class="wechat-article-card" data-article-id="article-6" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-02-20</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">勇敢打开你的索引</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${心中温暖}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 7 -->
                        <div class="wechat-article-card" data-article-id="article-7" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-01</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与江南书院</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${江南书院}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 8 -->
                        <div class="wechat-article-card" data-article-id="article-8" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-25</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你怎么就没血了</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${你怎么就没血了}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 9 -->
                        <div class="wechat-article-card" data-article-id="article-9" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-20</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我们没有永远</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${我们没有永远}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 10 -->
                        <div class="wechat-article-card" data-article-id="article-10" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">科目三</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${科目三}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 11 -->
                        <div class="wechat-article-card" data-article-id="article-11" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-10</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Placeholder Article 11</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <!-- No image tag for placeholders -->
                            </div>
                        </div>

                        <!-- Placeholder Article Card 12 -->
                        <div class="wechat-article-card" data-article-id="article-12" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-05</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Placeholder Article 12</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <!-- No image tag for placeholders -->
                            </div>
                        </div>

                    </div>
                </div>
            `;
            document.querySelector('main').appendChild(writeDetail);
            
            writeDetail.querySelectorAll('.wechat-article-card').forEach(card => {
                card.addEventListener('click', () => {
                    const articleId = card.dataset.articleId;
                    const articleTitle = card.querySelector('.article-title').textContent;
                    
                    if (articleId === 'article-1') {
                        window.open('https://mp.weixin.qq.com/s/Vo-UGtOUmVAqPQLt94SGdg', '_blank');
                    } else if (articleId === 'article-2') { // New: 生命力
                        window.open('https://mp.weixin.qq.com/s/VSDlvWIv2Q1M2udMvwkYUQ', '_blank');
                    } else if (articleId === 'article-3') { // New: TO 2024
                        window.open('https://mp.weixin.qq.com/s/qi__Z4IPiEQ4kW-mMzmHrw', '_blank');
                    } else if (articleId === 'article-4') { // New: 世界在我前面，缓缓展开
                        window.open('https://mp.weixin.qq.com/s/wjDEGHZ4FnAOOXnIT1Pw1w', '_blank');
                    } else if (articleId === 'article-5') {
                        window.open('https://mp.weixin.qq.com/s/E4djVYPjjknWaPjwttsFjA', '_blank');
                    } else if (articleId === 'article-6') {
                        window.open('https://mp.weixin.qq.com/s/_L9UpYUw9YFz2cNpUVUqgQ', '_blank');
                    } else if (articleId === 'article-7') {
                        window.open('https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247483933&idx=1&sn=7a6360a478627b05e26cb91f0a8f5164&scene=21#wechat_redirect', '_blank');
                    } else if (articleId === 'article-8') {
                        window.open('https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247483962&idx=1&sn=e984f3909965e70e1cb2ab4d6936e457&scene=21&poc_token=HJodPGijFYYRg4UJPY7ZQJC05NQcdJyDCh145ups', '_blank');
                    } else if (articleId === 'article-9') {
                        window.open('https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247484150&idx=1&sn=9172b3d07a5f01b40782818c1da468b9&scene=21#wechat_redirect', '_blank');
                    } else if (articleId === 'article-10') {
                        window.open('https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247484288&idx=1&sn=bafb1665755d6d6abeba5a8e5d6b1d51&scene=21#wechat_redirect', '_blank');
                    } else {
                        console.log(`Navigating to article: ${articleTitle} (ID: ${articleId})`);
                    }
                });
                card.addEventListener('mouseenter', () => {
                    card.style.backgroundColor = '#2A2A2A'; // Slightly lighter on hover
                    card.style.transform = 'translateY(-2px)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.backgroundColor = '#1E1E1E';
                    card.style.transform = 'translateY(0px)';
            });
            });
        }
        
        writeDetail.style.display = 'flex';
        gsap.fromTo(writeDetail, {opacity: 0}, {opacity: 1, duration: 0.3});
        
        document.body.classList.remove('menu-open');
    });
});

// 处理 INVEST 按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const investButton = document.querySelector('.action-grid .action-button:nth-child(4)'); // INVEST 按钮
    const mainDefault = document.querySelector('.main-default');
    const investView = document.querySelector('.invest-view');

    if (investButton) {
        investButton.addEventListener('click', () => {
            if (mainDefault) {
                mainDefault.style.display = 'none';
            }
            if (investView) {
                investView.style.display = 'flex';
                gsap.fromTo(investView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
            }
        });
    }
});

// 处理 CREATE 按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.action-grid .action-button:nth-child(2)'); // CREATE 按钮
    const mainDefault = document.querySelector('.main-default');
    const mainContainer = document.querySelector('main');

    if (createButton && mainDefault && mainContainer) {
        createButton.addEventListener('click', () => {
            // 隐藏默认主页内容
            mainDefault.style.display = 'none';

            // 隐藏所有其他 main-detail 页面
            document.querySelectorAll('.main-detail').forEach(detail => {
                detail.style.display = 'none';
            });

            // 检查是否已存在 create-detail 页面
            let createDetailSection = document.querySelector('.create-detail');
            if (!createDetailSection) {
                createDetailSection = document.createElement('div');
                createDetailSection.className = 'main-detail create-detail';
                createDetailSection.style.flexDirection = 'column';
                createDetailSection.style.alignItems = 'center';
                createDetailSection.style.justifyContent = 'center';
                createDetailSection.style.padding = '2rem';

                createDetailSection.innerHTML = `
                    <h2 class="create-section-title">MY CREATIONS</h2>
                    <div class="product-categories-grid">
                        <div class="product-category-card" data-category="web">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M12,18H11V17H12V18M15,18H14V17H15V18M18,18H17V17H18V18M20,15H4V8H20V15Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">Web</h3>
                            <p class="product-category-desc">个人网站与Web应用项目。</p>
                            <button class="view-products-btn">访问网站</button>
                        </div>
                        <div class="product-category-card" data-category="plugins">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M20.5,11H19V7C19,5.89 18.11,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.5A2.5,2.5 0 0,0 4.5,13A2.5,2.5 0 0,0 2,15.5V19A2,2 0 0,0 4,21H8V19.5A2.5,2.5 0 0,0 10.5,17A2.5,2.5 0 0,0 8,14.5V13H12V17H13.5A2.5,2.5 0 0,0 16,19.5A2.5,2.5 0 0,0 13.5,22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">插件</h3>
                            <p class="product-category-desc">提升效率的浏览器与应用扩展。</p>
                            <button class="view-products-btn">查看插件</button>
                        </div>
                        <div class="product-category-card" data-category="gpts">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,2A2,2 0 0,1 14,4V6H10V4A2,2 0 0,1 12,2M19,11V13H16V15H8V13H5V11H19M8.5,9.5A1,1 0 0,1 9.5,8.5A1,1 0 0,1 10.5,9.5A1,1 0 0,1 9.5,10.5A1,1 0 0,1 8.5,9.5M14.5,9.5A1,1 0 0,1 15.5,8.5A1,1 0 0,1 16.5,9.5A1,1 0 0,1 15.5,10.5A1,1 0 0,1 14.5,9.5Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">GPTS</h3>
                            <p class="product-category-desc">专为特定任务定制的智能模型。</p>
                            <button class="view-products-btn">探索 GPTS</button>
                        </div>
                        <div class="product-category-card" data-category="apps">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1M17,19H7V5H17V19Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">APP</h3>
                            <p class="product-category-desc">精心设计的移动与桌面应用。</p>
                            <button class="view-products-btn">体验 APP</button>
                        </div>
                        <div class="product-category-card" data-category="crawlers">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M6,3C4.89,3 4,3.89 4,5V7H6V5H7V3H6M10,3V5H14V3H10M17,3V5H18V7H20V5C20,3.89 19.11,3 18,3H17M7,8V11H5V8H7M17,8V11H19V8H17M4.79,13.04L7.62,14.46L7.03,16.29L3.06,14.79L4.79,13.04M19.21,13.04L20.94,14.79L16.97,16.29L16.38,14.46L19.21,13.04M7.03,17.71L7.62,19.54L4.79,20.96L3.06,19.21L7.03,17.71M16.97,17.71L20.94,19.21L19.21,20.96L16.38,19.54L16.97,17.71M10,13V15H7V19H9V16H11V21H13V16H15V19H17V15H14V13H10Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">爬虫</h3>
                            <p class="product-category-desc">自动化数据收集与处理工具。</p>
                            <button class="view-products-btn">探索爬虫</button>
                        </div>
                    </div>
                `;
                mainContainer.appendChild(createDetailSection);

                // 添加按钮点击事件
                createDetailSection.querySelectorAll('.view-products-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const categoryCard = e.target.closest('.product-category-card');
                        if (!categoryCard) return;
                        const category = categoryCard.dataset.category;
                        
                        // 隐藏 "MY CREATIONS" 概览页面
                        createDetailSection.style.display = 'none';

                        if (category === 'plugins') {
                            showPluginDetailView();
                        } else if (category === 'gpts') {
                            showGPTSListView();
                        } else if (category === 'web') {
                            showWebProjectsView();
                        } else if (category === 'crawlers') {
                            showCrawlersView();
                        } else if (category === 'apps') {
                            showAppsView();
                        } else {
                            console.log(`查看 ${category} 详情`);
                            // 为其他类别创建类似 showPluginDetailView 的函数
                            // 或者创建一个通用的函数来显示不同类别的内容
                            // 暂时先返回到概览页，如果其他页面未实现
                            // createDetailSection.style.display = 'flex'; 
                        }
                    });
                });
            }

            // 显示 Create Detail 页面 (分类总览)
            createDetailSection.style.display = 'flex';
            if (navBackButton) navBackButton.style.display = 'none'; // Hide nav back button
            gsap.fromTo(createDetailSection, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});

            // 关闭侧边栏
            document.body.classList.remove('menu-open');
        });
    }
});

function showPluginDetailView() {
    const mainContainer = document.querySelector('main');
    let pluginView = document.querySelector('.plugin-detail-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!pluginView) {
        pluginView = document.createElement('div');
        pluginView.className = 'main-detail plugin-detail-view';
        pluginView.style.flexDirection = 'column';
        pluginView.style.alignItems = 'center';
        pluginView.style.padding = '2rem';
        pluginView.style.paddingTop = '100px';
        pluginView.style.textAlign = 'center';

        const myPlugins = [
            {
                id: 'slash-prompter',
                name: 'Slash Command Prompter',
                icon: `<img src="${SlashCommandPrompter}" alt="Slash Command Prompter" class="gpts-card-img-icon">`,
                description: '我做了一个适用于所有AI的插件',
                storeUrl: 'https://chromewebstore.google.com/detail/slash-command-prompter/kjfihbeejjmdmkedgcopiglnhemejipl?hl=en-US&utm_source=ext_sidebar',
                manualUrl: 'https://mp.weixin.qq.com/s/x8a3cLB_YRRfmVvpUqYnYA'
            },
            {
                id: 'floating-md',
                name: 'FloatingMD',
                icon: `<img src="${FloatingMD}" alt="FloatingMD" class="gpts-card-img-icon">`,
                description: '我做了一个笔记神器',
                storeUrl: 'https://chromewebstore.google.com/detail/floatingmd/ceccfecoiifcejbfeadoognfinknapii',
                manualUrl: 'https://mp.weixin.qq.com/s/hLf1nPbkcPKSe08UuFuHgA'
            }
        ];

        let pluginCardsHTML = '';
        myPlugins.forEach(plugin => {
            const storeButton = plugin.storeUrl ? `
                <a href="${plugin.storeUrl}" target="_blank" class="gpts-action-btn" style="margin-bottom: 10px;">
                    <svg class="chrome-store-icon" viewBox="0 0 24 24" width="18" height="18" style="margin-right: 8px;"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.93 4.93c1.52 1.52 2.47 3.59 2.47 5.87s-.95 4.34-2.47 5.87C15.41 20.22 13.78 21 12 21c-1.43 0-2.76-.54-3.77-1.45l6.22-6.22-4.01-4.01-6.22 6.22C3.17 14.25 2.5 12.62 2.5 11c0-1.78.54-3.41 1.45-4.77L10.17 10l4.01-4.01-6.22-6.22C9.24 3.17 10.57 2.5 12 2.5c1.78 0 3.41.54 4.77 1.45L10.55 10l6.38-6.07z"/><path fill="currentColor" d="M12,6.5c1.38 0 2.5 1.12 2.5 2.5S13.38 11.5 12,11.5 9.5 10.38 9.5 9s1.12-2.5 2.5-2.5zm0 7c2.49 0 4.5 2.01 4.5 4.5S14.49 22.5 12,22.5s-4.5-2.01-4.5-4.5 2.01-4.5 4.5-4.5z"/></svg>
                    <span>Chrome 应用店</span>
                </a>` : '';
            const manualButton = plugin.manualUrl ? `<a href="${plugin.manualUrl}" target="_blank" class="gpts-action-btn">使用说明书</a>` : '';

            pluginCardsHTML += `
                <div class="gpts-card" data-pluginid="${plugin.id}">
                    <div class="gpts-card-icon">${plugin.icon}</div>
                    <h3 class="gpts-card-name">${plugin.name}</h3>
                    <p class="gpts-card-description">${plugin.description}</p>
                    <div style="margin-top: auto; display: flex; flex-direction: column; align-items: center;">
                        ${storeButton}
                        ${manualButton}
                    </div>
                </div>
            `;
        });

        pluginView.innerHTML = `
            <div class="gpts-cards-grid">
                ${pluginCardsHTML}
            </div>
        `;
        mainContainer.appendChild(pluginView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                pluginView.style.display = 'none';
                newBtn.style.display = 'none';
                const creationsView = document.querySelector('.create-detail');
                if (creationsView) {
                    creationsView.style.display = 'flex';
                    gsap.fromTo(creationsView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
                }
            });
        }
    }

    document.querySelectorAll('.main-detail').forEach(detail => {
        if (detail !== pluginView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    pluginView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(pluginView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

function showGPTSListView() {
    const mainContainer = document.querySelector('main');
    let gptsView = document.querySelector('.gpts-list-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn'); // Get the button from nav

    if (!gptsView) {
        gptsView = document.createElement('div');
        gptsView.className = 'main-detail gpts-list-view';
        gptsView.style.flexDirection = 'column';
        gptsView.style.alignItems = 'center';
        gptsView.style.padding = '2rem';
        gptsView.style.textAlign = 'center';

        // Placeholder GPTS data - replace with actual data later
        const myGPTS = [
            {
                id: 'gpts-xiaolai',
                name: '笑来',
                icon: `<img src="${笑来}" alt="笑来" class="gpts-card-img-icon">`,
                description: '读书、健身、投资、帮朋友、陪家人...' // 示例描述，请您后续提供
            },
            {
                id: 'gpts-qingbian',
                name: '请辩',
                icon: `<img src="${请辩}" alt="请辩" class="gpts-card-img-icon">`,
                description: '思考永不止步' // 示例描述，请您后续提供
            },
            {
                id: 'gpts-builder',
                name: 'GPT Builder',
                icon: `<img src="${GPTBuilder}" alt="GPT Builder" class="gpts-card-img-icon">`,
                description: '用 AI 构建 AI'
            },
            {
                id: 'gpts-learn',
                name: 'Learn',
                icon: `<img src="${Learn}" alt="Learn" class="gpts-card-img-icon">`,
                description: '辅助你学习想学的一切'
            },
            {
                id: 'gpts-run',
                name: 'Run',
                icon: `<img src="${Run}" alt="Run" class="gpts-card-img-icon">`,
                description: '更快、更久、更强'
            },
            {
                id: 'gpts-fact-checker',
                name: 'Fact Checker',
                icon: `<img src="${事实核查员}" alt="Fact Checker" class="gpts-card-img-icon">`,
                description: '打破 AI 幻觉'
            }
        ];

        const gptsToShowTooltip = ['gpts-xiaolai', 'gpts-qingbian', 'gpts-builder'];

        let gptsCardsHTML = '';
        myGPTS.forEach(gpt => {
            let actionButtonHTML;
            if (gpt.id === 'gpts-learn') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67be8d6b2dec819186d2ab6041969366-learn" target="_blank" class="gpts-action-btn">启动 GPTs</a>`;
            } else if (gpt.id === 'gpts-run') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67d4ce8e0894819183f11ae56e049445-run" target="_blank" class="gpts-action-btn">启动 GPTs</a>`;
            } else if (gpt.id === 'gpts-fact-checker') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67be8eb1a560819191efb6675cb8d169-shi-shi-he-cha-yuan" target="_blank" class="gpts-action-btn">启动 GPTs</a>`;
            } else {
                actionButtonHTML = `<button class="gpts-action-btn">启动 GPTs</button>`;
            }

            gptsCardsHTML += `
                <div class="gpts-card" data-gptid="${gpt.id}">
                    <div class="gpts-card-icon">${gpt.icon}</div>
                    <h3 class="gpts-card-name">${gpt.name}</h3>
                    <p class="gpts-card-description">${gpt.description}</p>
                    ${actionButtonHTML}
                    ${gptsToShowTooltip.includes(gpt.id) ? 
                        `<div class="gpts-hover-tooltip">
                            <img src="${将抵月}" alt="QR Code">
                            <p>付费内容，联系作者获取</p>
                        </div>` : ''}
                </div>
            `;
        });

        gptsView.innerHTML = `
            <div class="gpts-cards-grid">
                ${gptsCardsHTML}
            </div>
        `;
        mainContainer.appendChild(gptsView);

        // Event listener for the main navigation back button
        if (navBackButton) {
            const currentView = gptsView; // Keep a reference to this view
            const clickHandler = () => {
                currentView.style.display = 'none';
                navBackButton.style.display = 'none'; 
                const creationsView = document.querySelector('.create-detail');
                if (creationsView) {
                    creationsView.style.display = 'flex';
                    gsap.fromTo(creationsView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
                }
                // It's good practice to remove the event listener if the view is destroyed or a new one is created
                // For this specific setup, we assume navBackButton persists and is reused.
                // If showGPTSListView could be called multiple times creating multiple listeners on navBackButton,
                // we would need a more robust way to manage listeners, e.g., remove previous before adding new.
            };
            // Check if a listener for gptsView already exists to avoid duplicates if this function can be re-entered.
            // This is a simplified check; a more robust solution might involve flags or named functions.
            if (!navBackButton.gptsViewListenerAttached) {
                 navBackButton.addEventListener('click', clickHandler);
                 navBackButton.gptsViewListenerAttached = true; // Mark that a listener for this context is attached
            } else {
                // If re-entering and a listener specific to gptsView might already be there and different,
                // one might need to remove the old one and add the new one.
                // For now, we assume one-time attachment or that the handler is generic enough.
            }
        }

        // Tooltip event listeners for specific action buttons
        gptsView.querySelectorAll('.gpts-card').forEach(card => {
            const gptId = card.dataset.gptid;
            const tooltip = card.querySelector('.gpts-hover-tooltip');

            if (tooltip && gptsToShowTooltip.includes(gptId)) {
                const actionButton = card.querySelector('.gpts-action-btn');
                if (actionButton) {
                    actionButton.addEventListener('mouseenter', () => {
                        gsap.to(tooltip, { opacity: 1, visibility: 'visible', duration: 0.3, ease: 'power2.out' });
                    });
                    actionButton.addEventListener('mouseleave', () => {
                        gsap.to(tooltip, { opacity: 0, visibility: 'hidden', duration: 0.2, ease: 'power2.in' });
                    });
                }
            }
        });

        gptsView.querySelectorAll('.gpts-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gptId = e.target.closest('.gpts-card').dataset.gptid;
                console.log(`启动或查看 GPTS 详情: ${gptId}`);
                // Placeholder: Future navigation to specific GPT detail/interaction page
            });
        });
    }

    document.querySelectorAll('.main-detail').forEach(detail => {
        if (detail !== gptsView) {
            detail.style.display = 'none';
        }
    });
    gptsView.style.display = 'flex';
    if (navBackButton) navBackButton.style.display = 'inline-block'; // Show nav back button
    gsap.fromTo(gptsView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

function showWebProjectsView() {
    const mainContainer = document.querySelector('main');
    let webProjectsView = document.querySelector('.web-projects-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!webProjectsView) {
        webProjectsView = document.createElement('div');
        webProjectsView.className = 'main-detail web-projects-view';
        webProjectsView.style.flexDirection = 'column';
        webProjectsView.style.alignItems = 'center';
        webProjectsView.style.padding = '2rem';
        webProjectsView.style.paddingTop = '100px';
        webProjectsView.style.textAlign = 'center';

        const webProjects = [
            {
                id: 'attention-tracker',
                name: 'Attention Span Tracker',
                icon: `<img src="${AttentionSpanTracker}" alt="Attention Span Tracker" class="gpts-card-img-icon">`,
                description: '追踪并分析您的注意力时间，以提高生产力。',
                url: 'https://attention-span-tracker.netlify.app/'
            },
            {
                id: 'epub-reader',
                name: 'Epub Reader',
                icon: `<img src="${EpubReaderIcon}" alt="Epub Reader" class="gpts-card-img-icon">`,
                description: '一个简洁、高效的在线Epub电子书阅读器。',
                url: 'https://tobooks.netlify.app/'
            }
        ];

        let webCardsHTML = '';
        webProjects.forEach(project => {
            webCardsHTML += `
                <div class="gpts-card" data-projectid="${project.id}">
                    <div class="gpts-card-icon">${project.icon}</div>
                    <h3 class="gpts-card-name">${project.name}</h3>
                    <p class="gpts-card-description">${project.description}</p>
                    <a href="${project.url}" target="_blank" class="gpts-action-btn">访问网站</a>
                </div>
            `;
        });

        webProjectsView.innerHTML = `
            <div class="gpts-cards-grid">
                ${webCardsHTML}
            </div>
        `;
        mainContainer.appendChild(webProjectsView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                webProjectsView.style.display = 'none';
                newBtn.style.display = 'none';
                const creationsView = document.querySelector('.create-detail');
                if (creationsView) {
                    creationsView.style.display = 'flex';
                    gsap.fromTo(creationsView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
                }
            });
        }
    }

    document.querySelectorAll('.main-detail').forEach(detail => {
        if (detail !== webProjectsView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    webProjectsView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(webProjectsView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

function showCrawlersView() {
    const mainContainer = document.querySelector('main');
    let crawlersView = document.querySelector('.crawlers-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!crawlersView) {
        crawlersView = document.createElement('div');
        crawlersView.className = 'main-detail crawlers-view';
        crawlersView.style.flexDirection = 'column';
        crawlersView.style.alignItems = 'center';
        crawlersView.style.padding = '2rem';
        crawlersView.style.paddingTop = '100px';
        crawlersView.style.textAlign = 'center';

        const myCrawlers = [
            {
                id: 'youtube-crawler',
                name: 'YouTube Crawler',
                icon: `<svg viewBox="0 0 24 24" width="64" height="45"><path fill="currentColor" d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.5v-7l6,3.5L10,15.5z"></path></svg>`,
                description: '抓取YouTube视频。'
            },
            {
                id: 'twitter-crawler',
                name: 'Twitter/X Crawler',
                icon: `<svg viewBox="0 0 24 24" width="50" height="50"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`,
                description: '抓取推文和用户数据。'
            }
        ];

        let crawlerCardsHTML = '';
        myCrawlers.forEach(crawler => {
            crawlerCardsHTML += `
                <div class="gpts-card" data-crawlerid="${crawler.id}">
                    <div class="gpts-card-icon">${crawler.icon}</div>
                    <h3 class="gpts-card-name">${crawler.name}</h3>
                    <p class="gpts-card-description">${crawler.description}</p>
                    <button class="gpts-action-btn crawler-detail-btn">查看详情</button>
                    <div class="crawler-hover-tooltip">
                        <p>付费内容，请联系作者获取</p>
                        <img src="${将抵月}" alt="将抵月 QR Code">
                    </div>
                </div>
            `;
        });

        crawlersView.innerHTML = `
            <div class="gpts-cards-grid">
                ${crawlerCardsHTML}
            </div>
        `;
        mainContainer.appendChild(crawlersView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                crawlersView.style.display = 'none';
                newBtn.style.display = 'none';
                const creationsView = document.querySelector('.create-detail');
                if (creationsView) {
                    creationsView.style.display = 'flex';
                    gsap.fromTo(creationsView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
                }
            });
        }
    }

    document.querySelectorAll('.main-detail').forEach(detail => {
        if (detail !== crawlersView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    crawlersView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(crawlersView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}


// 更新HTML中的图片src
document.addEventListener('DOMContentLoaded', () => {
    // 创建图片映射
    const imageMap = {
        'images/跑步2024.JPG': 跑步2024,
        'images/跑步2024愿望.JPG': 跑步2024愿望,
        'images/越来越强.jpg': 越来越强,
        'images/死不旋踵.webp': 死不旋踵,
        'images/世界在我面前.png': 世界在我面前,
        'images/世界在我面前，缓缓展开.JPG': 世界在我面前缓缓展开,
        'images/水仙花.png': 水仙花,
        'images/心中温暖.jpg': 心中温暖,
        'images/江南书院.png': 江南书院,
        'images/你怎么就没血了.PNG': 你怎么就没血了,
        'images/我们没有永远.JPG': 我们没有永远,
        'images/科目三.JPG': 科目三,
        'images/Slash Command Prompter.JPG': SlashCommandPrompter,
        'images/笑来.JPG': 笑来,
        'images/请辩.JPG': 请辩,
        'images/GPT Builder.JPG': GPTBuilder,
        'images/Learn.png': Learn,
        'images/Run.png': Run,
        'images/事实核查员.png': 事实核查员,
        'images/将抵月.png': 将抵月,
        'images/兰顿蚂蚁.webp': 兰顿蚂蚁,
        'images/做最好的自己.jpeg': 做最好的自己,
        'images/可控之事.JPG': 可控之事,
        'images/最好的.JPG': 最好的,
        'images/李笑来.jpg': 李笑来,
        'images/笔记神器.png': 笔记神器,
        'images/自救.png': 自救,
        'images/金刚柱.JPG': 金刚柱,
        'images/张鹏.png': 张鹏,
        'images/曾叔.png': 曾叔,
        'images/时间管道.JPG': 时间管道
    };

    // 更新所有img元素的src
    document.querySelectorAll('img').forEach(img => {
        const currentSrc = img.getAttribute('src');
        if (imageMap[currentSrc]) {
            img.src = imageMap[currentSrc];
        }
    });
});

// 滑动切换功能
let currentEpisodeIndex = 0;
let isTransitioning = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// 获取所有main-detail元素（使用已存在的变量）
const totalEpisodes = mainDetails.length;

// 显示指定索引的Episode
function showEpisode(index) {
    if (index < 0 || index >= totalEpisodes || isTransitioning) return;
    
    isTransitioning = true;
    
    const oldIndex = currentEpisodeIndex;
    const direction = index > oldIndex ? 1 : -1; // 1表示向右，-1表示向左
    
    // 隐藏当前Episode
    if (mainDetails[oldIndex] && oldIndex !== index && oldIndex >= 0) {
        gsap.to(mainDetails[oldIndex], {
            opacity: 0,
            x: direction * -100, // 向右切换时当前页向左移出，向左切换时当前页向右移出
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                mainDetails[oldIndex].style.display = 'none';
                mainDetails[oldIndex].style.transform = 'translateX(0)';
            }
        });
    }
    
    // 显示新Episode
    currentEpisodeIndex = index;
    const targetEpisode = mainDetails[currentEpisodeIndex];
    
    if (!targetEpisode) {
        isTransitioning = false;
        return;
    }
    
    targetEpisode.style.display = 'flex';
    
    // 如果是首次显示（oldIndex === index），直接显示不需要动画
    if (oldIndex === index) {
        targetEpisode.style.opacity = '1';
        targetEpisode.style.transform = 'translateX(0)';
        isTransitioning = false;
        return;
    }
    
    gsap.fromTo(targetEpisode, 
        { 
            opacity: 0,
            x: direction * 100 // 向右切换时新页从右侧进入，向左切换时新页从左侧进入
        },
        { 
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                isTransitioning = false;
            }
        }
    );
}

// 下一个Episode
function nextEpisode() {
    if (currentEpisodeIndex < totalEpisodes - 1) {
        showEpisode(currentEpisodeIndex + 1);
    }
}

// 上一个Episode
function prevEpisode() {
    if (currentEpisodeIndex > 0) {
        showEpisode(currentEpisodeIndex - 1);
    }
}

// 触摸事件处理
function handleTouchStart(e) {
    if (isTransitioning) return;
    
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    currentX = startX;
    currentY = startY;
}

function handleTouchMove(e) {
    if (isTransitioning) return;
    
    const touch = e.touches[0];
    currentX = touch.clientX;
    currentY = touch.clientY;
    
    // 防止默认滚动行为
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    
    if (deltaX > deltaY) {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    if (isTransitioning) return;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const threshold = 50; // 滑动阈值
    
    // 只有水平滑动距离大于垂直滑动距离时才触发切换
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
            // 向右滑动，显示上一个Episode
            prevEpisode();
        } else {
            // 向左滑动，显示下一个Episode
            nextEpisode();
        }
    }
}

// 鼠标事件处理（桌面端）
function handleMouseDown(e) {
    if (isTransitioning) return;
    
    startX = e.clientX;
    startY = e.clientY;
    currentX = startX;
    currentY = startY;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e) {
    if (isTransitioning) return;
    
    currentX = e.clientX;
    currentY = e.clientY;
}

function handleMouseUp(e) {
    if (isTransitioning) return;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const threshold = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
            prevEpisode();
        } else {
            nextEpisode();
        }
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// 键盘事件处理
function handleKeyDown(e) {
    if (isTransitioning) return;
    
    // 检查是否有Episode在显示
    const hasVisibleEpisode = Array.from(mainDetails).some(detail => 
        detail.style.display !== 'none' && detail.style.display !== ''
    );
    
    if (!hasVisibleEpisode) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevEpisode();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextEpisode();
            break;
    }
}

// 绑定事件监听器
function initSwipeGestures() {
    // 为每个main-detail添加事件监听器
    mainDetails.forEach(detail => {
        // 触摸事件
        detail.addEventListener('touchstart', handleTouchStart, { passive: false });
        detail.addEventListener('touchmove', handleTouchMove, { passive: false });
        detail.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // 鼠标事件
        detail.addEventListener('mousedown', handleMouseDown);
        
        // 触控板滑动事件
        detail.addEventListener('wheel', handleWheel, { passive: false });
    });
    
    // 键盘事件
    document.addEventListener('keydown', handleKeyDown);
    
    // 全局触控板事件（作为备用）
    document.addEventListener('wheel', handleWheel, { passive: false });
}

// 初始化滑动手势
initSwipeGestures();

// 修改现有的profileImage点击事件，集成滑动功能
// 这个事件监听器会替换原有的profileImage点击逻辑

// 触控板滑动事件处理
let lastWheelTime = 0;
let wheelDirection = 0; // 记录当前滑动方向
let wheelAccumulator = 0; // 累积滑动距离

function handleWheel(e) {
    if (isTransitioning) return;
    
    // 检查是否有Episode在显示
    const hasVisibleEpisode = Array.from(mainDetails).some(detail => 
        detail.style.display !== 'none' && detail.style.display !== ''
    );
    
    if (!hasVisibleEpisode) return;
    
    const now = Date.now();
    const threshold = 80; // 提高阈值，需要更明确的滑动意图
    const cooldown = 500; // 增加冷却时间，确保一次手势只触发一次
    const resetTime = 150; // 方向重置时间
    
    // 如果距离上次触发太近，忽略
    if (now - lastWheelTime < cooldown) {
        return;
    }
    
    // 如果滑动方向改变或间隔太久，重置累积器
    const currentDirection = e.deltaX > 0 ? 1 : -1;
    if (wheelDirection !== currentDirection || now - lastWheelTime > resetTime) {
        wheelAccumulator = 0;
        wheelDirection = currentDirection;
    }
    
    // 只处理水平滑动
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        wheelAccumulator += Math.abs(e.deltaX);
        
        // 达到阈值时触发切换
        if (wheelAccumulator >= threshold) {
            if (e.deltaX > 0) {
                // 向右滑动，显示下一个Episode
                nextEpisode();
            } else {
                // 向左滑动，显示上一个Episode
                prevEpisode();
            }
            
            // 重置状态
            lastWheelTime = now;
            wheelAccumulator = 0;
            wheelDirection = 0;
        }
        
        e.preventDefault();
    }
}

function showAppsView() {
    const mainContainer = document.querySelector('main');
    let appsView = document.querySelector('.apps-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!appsView) {
        appsView = document.createElement('div');
        appsView.className = 'main-detail apps-view';
        appsView.style.flexDirection = 'column';
        appsView.style.alignItems = 'center';
        appsView.style.padding = '2rem';
        appsView.style.paddingTop = '100px';
        appsView.style.textAlign = 'center';

        const myApps = [
            {
                id: 'relax-app',
                name: 'Relax',
                icon: `<img src="${RelaxIcon}" alt="Relax" class="gpts-card-img-icon">`,
                description: '一个帮助你放松和冥想的应用。',
                url: 'https://need-relax.netlify.app/'
            }
        ];

        let appCardsHTML = '';
        myApps.forEach(app => {
            appCardsHTML += `
                <div class="gpts-card" data-appid="${app.id}">
                    <div class="gpts-card-icon">${app.icon}</div>
                    <h3 class="gpts-card-name">${app.name}</h3>
                    <p class="gpts-card-description">${app.description}</p>
                    <a href="${app.url}" target="_blank" class="gpts-action-btn">访问网站</a>
                </div>
            `;
        });

        appsView.innerHTML = `
            <div class="gpts-cards-grid">
                ${appCardsHTML}
            </div>
        `;
        mainContainer.appendChild(appsView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                appsView.style.display = 'none';
                newBtn.style.display = 'none';
                const creationsView = document.querySelector('.create-detail');
                if (creationsView) {
                    creationsView.style.display = 'flex';
                    gsap.fromTo(creationsView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
                }
            });
        }
    }

    document.querySelectorAll('.main-detail').forEach(detail => {
        if (detail !== appsView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    appsView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(appsView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}