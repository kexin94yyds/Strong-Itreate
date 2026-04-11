// 导入所有图片资源
import 跑步2024 from '/images/跑步2024.JPG';
import 跑步2025 from '/images/跑步2025.png';
import 跑步2025PB from '/images/跑步2025-20.26公里.png';
import 跑步2024愿望 from '/images/跑步2024愿望.JPG';
import 越来越强 from '/images/越来越强.jpg';
import 死不旋踵 from '/images/死不旋踵.webp';
import 世界在我面前 from '/images/世界在我面前.png';
import 世界在我面前缓缓展开 from '/images/世界在我面前，缓缓展开.JPG';
import 水仙花 from '/images/水仙花.png';
import 心中温暖 from '/images/心中温暖.jpg';
import 江南书院 from '/images/江南书院.png';
import 你怎么就没血了 from '/images/你怎么就没血了.PNG';
import 我们没有永远 from '/images/我们没有永远.JPG';
import 科目三 from '/images/科目三.JPG';
import SlashCommandPrompter from '/images/Slash Command Prompter.JPG';
import 笑来 from '/images/笑来.JPG';
import 请辩 from '/images/请辩.JPG';
import GPTBuilder from '/images/GPT Builder.JPG';
import Learn from '/images/Learn.png';
import Run from '/images/Run.png';
import 事实核查员 from '/images/事实核查员.png';
import 将抵月 from '/images/将抵月.png';
import 猫咪头像 from '/images/cat-avatar.jpg';
import 兰顿蚂蚁 from '/images/兰顿蚂蚁.webp';
import 做最好的自己 from '/images/做最好的自己.jpeg';
import 可控之事 from '/images/可控之事.JPG';
import 最好的 from '/images/最好的.JPG';
import 李笑来 from '/images/李笑来.jpg';
import 笔记神器 from '/images/笔记神器.png';
import 自救 from '/images/自救.png';
import 金刚柱 from '/images/金刚柱.JPG';
import 张鹏 from '/images/张鹏.png';
import 曾叔 from '/images/曾叔.png';
import 时间管道 from '/images/时间管道.JPG';
import AttentionSpanTracker from '/images/Attention-Span-Tracker.JPG';
import EpubReaderIcon from '/images/Epub 阅读器.png';
import FloatingMD from '/images/FloatingMD.png';
import RelaxIcon from '/images/relax.png';
import 单词记录器 from '/images/单词.png';
import FireIcon from '/images/Fire.png';
import 闹钟Icon from '/images/闹钟.png';
import YouTubeTranscript from '/images/YouTube-Transcript.png';
import TwitterCrawler from '/images/Twitter-Crawler.png';
import GeminiWatermarkRemover from '/images/Gemini-Watermark-Remover.png';
import AISidebar from '/images/AI-Sidebar.png';
import PixelTunePhoto from '/images/PixelTunePhoto.png';
import ContentDash from '/images/ContentDash.png';
import Monoshot from '/images/Monoshot.png';
import RIIcon from '/images/RI.png';
import PrompterIcon from '/images/Prompter.png';
import FlowIcon from '/images/Flow.png';
import WechatQR from '/images/可鑫二维码.JPG';
import PodcastIcon from '/images/Podcast.jpeg';
import WechatIcon from '/images/公众号头像.png';
import WechatGzhQR from '/images/公众号二维码.png';

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
    
    // 隐藏Apps列表页面
    const appsView = document.querySelector('.apps-view');
    if (appsView) {
        appsView.style.display = 'none';
    }
    
    // 隐藏Web项目列表页面
    const webProjectsView = document.querySelector('.web-projects-view');
    if (webProjectsView) {
        webProjectsView.style.display = 'none';
    }
    
    // 隐藏Crawlers列表页面
    const crawlersView = document.querySelector('.crawlers-view');
    if (crawlersView) {
        crawlersView.style.display = 'none';
    }
    
    // 隐藏Iterate页面
    const iterateView = document.querySelector('.iterate-view');
    if (iterateView) {
        iterateView.style.display = 'none';
    }
    
    // 隐藏Tools列表页面
    const toolsView = document.querySelector('.tools-view');
    if (toolsView) {
        toolsView.style.display = 'none';
    }
    
    // 隐藏Music页面
    const musicView = document.querySelector('.music-view');
    if (musicView) {
        musicView.style.display = 'none';
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
    const navBackButton = document.getElementById('nav-back-to-creations-btn');
    if (navBackButton) {
        navBackButton.style.display = 'none';
    }
    
    // 显示主页面
    const mainDefault = document.querySelector('.main-default');
    if (mainDefault) {
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
                        } else if (button.textContent.trim() === 'iterate') {
                            actionGrid.style.display = 'none';
                            showIterateView();
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
        img.src = 跑步2025;
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
            writeDetail.style.overflowY = 'auto';
            writeDetail.style.maxHeight = '100vh'; 

            writeDetail.innerHTML = `
                <div style="margin-bottom: 2rem; text-align: center;">
                    <div class="season-info" style="font-size: 0.8rem; color: #999; margin-bottom: 0.2rem;">MY WRITINGS</div>
                    <!-- <h2 class="detail-title" style="font-size: 1.8rem; color: #e0e0e0; margin-top: 0; letter-spacing: 1px;">微信公众号文章</h2> -->
                        </div>
                <div class="articles-container-wrapper" style="max-width: 100%; margin: 0 auto; width: 100%; display: flex; flex-direction: column; flex-grow: 1; padding: 0 1rem;"><div class="wechat-articles-list" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; overflow-y: auto; width: 100%; flex-grow: 1;">
<a href="https://mp.weixin.qq.com/s/MXpK0fihTVwwkkyDfVgIjQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-1" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">TO 2025</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_139.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Vo-UGtOUmVAqPQLt94SGdg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-2" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-11-29</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">越来越强</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_022.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/wjDEGHZ4FnAOOXnIT1Pw1w" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-3" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-10-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">世界在我面前</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_020.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/dqTtYmz4-ZgM8VOQXEO7gQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-4" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-21</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">富足是做出来的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_134.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/qi__Z4IPiEQ4kW-mMzmHrw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-5" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-01-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">TO 2024</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_006.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/fSeK6egxV1PmcYktB_0LKA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-6" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-01-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与江南书院</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_007.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/VSDlvWIv2Q1M2udMvwkYUQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-7" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-04-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命力</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_040.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ZMFm6y6U3qe5EiRczVH2TA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-8" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-01</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">人生三大事</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_096.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TXLVjjp3fO9pvKy9ITAqwQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-9" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-19</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">长期就是我乐观的最大必杀技</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_090.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Mv88gODeq5IN2Aq8_8GNBg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-10" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-12-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">运动改造大脑</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_138.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/hqWkD0jpxH-H7uDZ1OT-tw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-11" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-12-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命就是体验</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_137.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/p_jk57zbA-VFrexHYygL3g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-12" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">好奇心带来复利</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_145.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/md2yyYnqLtI_mYzYmFh6nw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-13" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-20</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">未来普通人最需掌握的底层能力</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_144.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/6qfe_Sbn-lbeD0LHinORfw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-14" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-19</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">时间管道的应用</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_143.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/SIS2y4tObwKEh7yxkZUI-w" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-15" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">未来十年最不可替代的能力，藏在《死亡诗社》里</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_142.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/tcf6Ftnq_GFX075PfphL4A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-16" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我宣布：人工智能在电脑里就是最伟大的发明</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_141.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TxnFtl1WApGAZL6wtKuLKA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-17" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个几乎解决了我所有学习问题的看书网站</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_140.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/BZzF1gajzuvpgzACBAWoFA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-18" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">创造对人有用的东西</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_147.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/p9cthj0TCfU5zq-3HoHEnA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-19" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2026-01-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">2025，向每一刻努力的你致敬！🫡</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_146.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/nk1xufK41Z06aoVrn8Eqlg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-20" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-12-05</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Vibe 时代正在吞噬整个世界</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_136.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/yRuQUthT4SqzaQ1rBGmaSw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-21" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-27</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何最好地使用AI？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_135.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/MChYcaQX7QAc_TeByU6dUQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-22" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">常识就是让世界变好</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_133.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/VW4N9aKKmpDaG2O15xuwzg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-23" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">问题是无法逃避的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_132.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/7o7n7P8fOKj7KGIsY4PmlQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-24" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">勇敢地把自己置于风险线上</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_131.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/AiiD1xDqKX2NcgwOzA18wg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-25" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">编程范式的转变</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_130.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Mu2u4X6H4OuXQE5F6LX6rg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-26" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-11-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">慢慢接受挣扎</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_129.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/-Q4w2Xu2DEXigPVvwOIx-Q" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-27" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">行动就是解药</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_128.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/lqMT7N7IpDx-dvtffsZX-g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-28" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个集成所有 AI 的侧边栏助手</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_127.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/e0VXL8-s3OjF9OqeLgNi8w" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-29" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">屁股也有决定脑袋的时候</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_126.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/LuP2XVK6ggISI8b3DCLngQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-30" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个 AI 侧边栏助手</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_124.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/azIevc7_OQ_6K_3Jvp8YPg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-31" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">人生本就是在不断的解决问题</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_125.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/SzHnpKX9mCejG41GPIsVTg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-32" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-05</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个 CLI-prompt 库</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_123.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/tHqaAlyS8A-lMDyh6sOVrQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-33" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-03</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">鸡排背后的真相</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_122.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/zPWGfzZ4vubjHsk0sFstlw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-34" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-10-01</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">好的解释难以被撼动</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_121.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/yxBYcSE3eov3QkjQF0_xpg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-35" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Vibe Coding</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_120.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/4MWVnSTIXuq0ywmbSqNlsQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-36" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">从反复用AI中获得的经验</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_119.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/QDYWrGf3E32vtoocftU0Ag" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-37" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-26</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">赚钱往往就在低谷</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_118.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/bJN8lFERHdAelDHGG8PvAQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-38" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">过去的建议,对你仍然成立</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_117.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/NRoTItJ_WqAhDZLHGrbWug" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-39" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-21</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">当你想做，就去做</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_116.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Byeq9S8h4X5DNz0j91hnig" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-40" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-16</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">更有意识的生活</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_115.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/NUieMlpBbrB2DuksMvOoLw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-41" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">不是我做到了，是我和 AI 一起做成的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_114.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/3Dgi2dz4gVNueFHyzsG_bg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-42" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-10</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你的时间并不值那么多</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_113.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/QGmrI2fItXdkAvBnsgO2nw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-43" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">当体验成为价值，浪费还有意义吗？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_112.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/e2Scgka4vt1jpzFoEACFEQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-44" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-08</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你不知道工具带来的影响有多大</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_111.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/qeqCZkD6OHJAx_zaKEeO-g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-45" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何防止自己变得更傻？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_110.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/WPi1BKmH8uhf8EYwgUWFqw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-46" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-09-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我们最终的走向</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_109.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8oLYcsX9SoJ-ow6_BKG3UQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-47" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">真诚才是必杀技</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_108.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/b9Cg5Q69D29lo11AxYIkZw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-48" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">什么是真爱？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_107.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TFBoUDAp9TXhJ0PdsNBLHA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-49" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">到底什么什么是最重要的？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_106.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8jbKm8DMPCByE25Rxq5GHA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-50" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">创造价值让我不断发展</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_105.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/WRyyI7QxYHFCodz7yptnEg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-51" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-20</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个看所有语言的书籍网站</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_104.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Dt6jdjJZvN7l5O3IKblmAg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-52" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-18</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何最大化你的注意力？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_103.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/o2Zc1PDZjrs-DXfVShg5Bg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-53" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-16</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何对别人有用？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_102.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/BSTU3na68TcfIMFHlmXqPA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-54" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-14</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你为什么需要一种势不可挡的心力？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_101.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8FIK06_Vh8STnoNMr6kUIw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-55" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-13</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">镜像世界</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_100.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/_gVQv6EIypjktED9UPr6NQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-56" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">活在现实中</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_099.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/i4tjggDGMfnSuzjOAf-FlQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-57" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">只活这一次</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_098.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/5cbUkbf71kVYVWWsCAIELA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-58" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-08-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">不断的纠错</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_097.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Ya8ZEO8JNWBtmlLqW_KmYw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-59" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-31</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我们的大脑正在被编程</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_095.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/OmLt4Io5TxTLQ3aO1o8zKQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-60" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">最大的限制在自身</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_094.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/z2ErFy9oQHpmSZ9wj_mc9g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-61" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">活在生命中</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_093.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/lMQb9GRMO4Z56hUoJStW7Q" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-62" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何提高能量？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_092.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/cwg8sqmcc01BEosYX3_Mew" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-63" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">做比看快，看比听快</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_091.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/9vTd6Si3Mc5cF1yEwZkQxw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-64" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-18</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">先做了再说</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_089.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/sLY3TSiJXMGkjV2GpeoUXA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-65" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-16</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">为什么我会关闭ChatGPT记忆窗口?</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_088.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/JqOhndHfjfWvZIKHtwfgNA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-66" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-14</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">一切都是你自己造成的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_087.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/wkakTLZpNr7SPY8aDI2rbg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-67" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-13</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">前所未有的未来</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_086.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/6gRy_i-OPZyMwV75fe6hYg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-68" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Vibe Code</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_085.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/-4ijEaDdws6AvA91MuhhHg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-69" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">为什么要生产?</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_084.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/PGgzqIpQakSafrnJSIComw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-70" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-10</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">慢慢变好</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_083.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/rxJsuM4JbU9Gg9Qb7Fb9dg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-71" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-08</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你的选择决定了你做的事</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_082.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/4UbZX_fUilSg5yThW_GcyQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-72" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">为什么要写？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_081.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/P8q02HxYdOwnhsWMIPEcTg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-73" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-06</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">做了一个看英文的翻译脚本</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_080.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ZeF3em8s77rhJrDsQ-i_gw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-74" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">其实你的生活，本身就可以过得很好</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_079.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/9AipOxf2OpwkGPncEunVfw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-75" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-03</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">无限迭代</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_078.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/hLf1nPbkcPKSe08UuFuHgA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-76" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-07-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个可以随时记录笔记的编辑器</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_077.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/H1XYiORQlS9YJL0R_MAgUg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-77" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">真正的因材施教</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_076.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/A47LEu9SBn5Xr0gB4M7BZQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-78" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-29</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何避免诱惑？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_075.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/I67pasBde_k_44N3OzLnQQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-79" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">机灵只能是学来的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_074.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/cGOuKmFr59dvrRPWn9v05g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-80" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-27</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">NPC 也会进步</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_073.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/q3oz5lvZunsa6ocaUB8HZg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-81" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">从简单出发</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_072.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/9uQ2fSCHD_5d-qEHKclvtg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-82" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-20</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">专注于正确的事</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_071.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/PvQQTzAgPO7FtuuNuXEjzg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-83" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">一气呵成</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_070.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ArUOUQQKukcmHT6_lJNFfw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-84" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-16</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">拔剑</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_069.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/aG66b5uSt3xLyxHNnN3pfg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-85" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-15</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">一切都需要时间</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_068.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/O8rkJIsk3inmA1wMlO4n5Q" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-86" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">热爱你的热爱</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_067.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Zs396ymZczmw8Qium4udzA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-87" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">跑步的多重效益</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_066.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/0W5jd-ZTzkgRdw228OSDFw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-88" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-10</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">知识就是力量</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_065.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/zkb2Ufj9Iwj8AqVpbJ5Ahg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-89" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">去面对那些对你来说重要的事</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_064.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/6I2QCjUJGwQmM524fNOcTw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-90" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-08</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生活中的迭代</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_063.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/qV1_g0W_aeql22Dj10va1Q" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-91" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">不学习只能吃亏</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_062.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/-SkAgVVP-IclO7HNOq14mQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-92" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-04</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">和有前途的人并行</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_061.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/N-_n0lEKzLu2p_23ovV0bw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-93" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-03</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">请做一个不听话的小孩</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_060.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/DjefGAbiDOdfHLC-1sP0Tg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-94" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-06-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你的注意力只会越来越贵</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_059.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/_4xIm3KhICPc9_wuzEnHkg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-95" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-31</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">任何事都会脱水</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_058.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/gcgWlRvVnuklEeAkrRseoA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-96" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-30</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">用时间去发展</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_057.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/22BvTyA896hkc8L1bYkXEA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-97" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-29</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">越困难，就不做了</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_056.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/DFUjIP-HiCEMwr_qpT34-Q" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-98" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">好奇心</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_055.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/G14h8tVnZMvRnQ6npiS8tw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-99" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-27</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">古老的去中心化形式</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_054.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/g-vonsedftwsWjF6TGpLhQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-100" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-26</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你有得选吗?</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_053.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/aPLAfEA54bgKUjqBoLRjaA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-101" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">构建自己的宇宙</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_052.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ZeP6HjsuVQRasxVyPNZysw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-102" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">遇到坏人坏事怎么办？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_051.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/huveBs4X_0XRmXnvnuXn5w" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-103" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">周围的环境和你有关</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_050.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Lw63k1JSfAvObtynke9O6g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-104" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">聊聊记忆</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_049.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/_L9UpYUw9YFz2cNpUVUqgQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-105" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-20</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">勇敢打开你的索引</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_048.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/-mKe02lokblbyfvpf53nhA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-106" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-19</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">终究逃不了热爱</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_047.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/7sYvo0588ebFp4BGhHvR1g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-107" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-16</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">从《思考的真相》获得的感受</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_046.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Xzm3uHCs6sNvqzlHuUeDlg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-108" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-11</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">都应该睡个好觉</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_045.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/x8a3cLB_YRRfmVvpUqYnYA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-109" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-05-02</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我做了一个适用于所有AI的插件</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_044.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/iMIT9jJC0BijgjHBPsKWOg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-110" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-04-29</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">从业力上学到的</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_043.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/PWIBUkuwkgc3ges3Lgrc7A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-111" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-04-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">如何快速成长？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_042.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TCRJhOD2NV7cGtcNwRlWsg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-112" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-04-19</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">相约一年后</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_041.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/eOr1jHb9afdwzP536_AdpQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-113" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-04-03</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">创造中学习</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_039.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/moJZVBt9sJBBG-1reTC-FA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-114" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-03-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">由内而外</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_038.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/mTOs6nU5q7Qlzv5UZ273DQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-115" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-03-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">为什么人会懒?</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_037.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ngkJ24k9zBeipeeH3ZsjHg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-116" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-03-21</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我为什么选择练口语?</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_036.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/GPsYj9l2sfWJTtJqj-o70g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-117" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-03-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">AGI</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_035.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/OMM0jNPg9Wh5YhSdHXMwJg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-118" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-03-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">不想变成猪</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_034.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/xlQG7jDHTiN_nSy2DQw3gQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-119" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-02-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">一切都是你的注意力</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_033.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/IYcJc8JiC0JOxQSvY2iKZg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-120" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-02-27</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">探索未来</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_032.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/wO927FV60tIb3VSHzd4TwQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-121" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-02-26</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">自然奇迹</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_031.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/x210OPNksAhmmt740RyFyg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-122" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-02-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">存在的理由</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_030.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/ftf4eLCvMjbac4Az5puWzg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-123" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-02-05</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">上工治未病</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_029.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8V-oFPTIQchtVVYlMlLXew" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-124" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-01-24</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">此外致生</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_028.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8KRr1kvwXHFDXZl-yjy4vg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-125" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2025-01-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">能量从何而来？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_027.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/bV8I3VlHJrsCJGPCjRGgBA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-126" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-12-23</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">做自己</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_026.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/qWeuT6b4HqAcYL-p7-fqTw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-127" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-12-15</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">无限游戏</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_025.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/qMdDVUbItMVTfFK2J_uqLg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-128" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-12-08</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">内耗</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_024.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/p-aMHC68CFpNwD8lWQf_FQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-129" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-12-01</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">跑步带给了我什么？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_023.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/L9jdovqkJjEFusYJzEUrjQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-130" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-10-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">未来已来</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_021.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/XkL1IQFmj-8TmlT1DoF60A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-131" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-09-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">世界很大</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_019.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/NdY0V7BC0hRRjUj1iPRr3g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-132" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-26</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">幸运</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_018.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/noUwpymKzl4A2AoixGtvBA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-133" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-25</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">​为什么阅读少即是多？</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_017.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/2lFWoF23TPjxRXrUjMqV2g" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-134" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-20</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">跑步</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_016.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/VSDlvWIv2Q1M2udMvwkYUQ" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-135" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-19</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命力</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_040.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/-LASa9di1OFPDO-7MUqIpw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-136" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-18</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">科目三</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_014.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/Jy2i_vV4S_K-ROajgxR0_w" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-137" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-08-17</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与教练对话——20 年的改变</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_013.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/OyyG-ArpvTyswNhExNXW8A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-138" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-07-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">气运</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_012.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TUCAEDyvZp-0kGXqwZbhkg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-139" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-07-13</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命中的体验</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_011.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/5EldnhFPTjRjtTwJTzcElg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-140" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-06-14</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我们没有永远</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_010.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/E4djVYPjjknWaPjwttsFjA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-141" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-05-09</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与自己</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_009.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/TSrhdxBb9c6dy0xKXudGCg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-142" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-02-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你怎么就没血了</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_008.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/x7TcfT8NZMGco-_BhWIpBA" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-143" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-28</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">因世时破，更漫爱己</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_005.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/1q606fV6JYvNu6ebuf1z1A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-144" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-22</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">这就是爱</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_004.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/8zX1Kv8X-G7CSXT_w2SKLw" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-145" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-12</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">有求皆苦，无求乃乐</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_003.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/D52woGnh6iV_0-QwZQCqXg" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-146" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-07</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">做最真实的自己———我的五大维度</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_002.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
<a href="https://mp.weixin.qq.com/s/T6cYTcPIpL4X4qcq1amw8A" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><div class="wechat-article-card" data-article-id="article-147" style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; width: 100%; box-sizing: border-box;"><div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;"><p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-06</p><h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">宇宙快看我 热烈而繁荣</h3></div><div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;"><img src="/images/wechat-covers/cover_001.jpg" style="width: 100%; height: 100%; object-fit: cover;"></div></div></a>
</div></div>
            `;
            document.querySelector('main').appendChild(writeDetail);
            
            writeDetail.querySelectorAll('.wechat-article-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.backgroundColor = '#2A2A2A';
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
                            <p class="product-category-desc">个人网站与 Web 应用项目。</p>
                            <button class="view-products-btn">访问网站</button>
                        </div>
                        <div class="product-category-card" data-category="plugins">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M20.5,11H19V7C19,5.89 18.11,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.5A2.5,2.5 0 0,0 4.5,13A2.5,2.5 0 0,0 2,15.5V19A2,2 0 0,0 4,21H8V19.5A2.5,2.5 0 0,0 10.5,17A2.5,2.5 0 0,0 8,14.5V13H12V17H13.5A2.5,2.5 0 0,0 16,19.5A2.5,2.5 0 0,0 13.5,22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">Extensions</h3>
                            <p class="product-category-desc">提升效率的浏览器与应用扩展。</p>
                            <button class="view-products-btn">查看扩展</button>
                        </div>
                        <div class="product-category-card" data-category="apps">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1M17,19H7V5H17V19Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">Apps</h3>
                            <p class="product-category-desc">精心设计的移动与桌面应用。</p>
                            <button class="view-products-btn">体验应用</button>
                        </div>
                        <div class="product-category-card" data-category="tools">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">Tools</h3>
                            <p class="product-category-desc">Iterate、爬虫与 MCP 工具集。</p>
                            <button class="view-products-btn">探索工具</button>
                        </div>
                        <div class="product-category-card" data-category="scripts">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,19L12,15H9V10H15V15L13,19H10Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">Scripts</h3>
                            <p class="product-category-desc">自动化脚本与实用工具。</p>
                            <button class="view-products-btn">查看脚本</button>
                        </div>
                        <div class="product-category-card" data-category="gpts">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,2A2,2 0 0,1 14,4V6H10V4A2,2 0 0,1 12,2M19,11V13H16V15H8V13H5V11H19M8.5,9.5A1,1 0 0,1 9.5,8.5A1,1 0 0,1 10.5,9.5A1,1 0 0,1 9.5,10.5A1,1 0 0,1 8.5,9.5M14.5,9.5A1,1 0 0,1 15.5,8.5A1,1 0 0,1 16.5,9.5A1,1 0 0,1 15.5,10.5A1,1 0 0,1 14.5,9.5Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">GPTs</h3>
                            <p class="product-category-desc">专为特定任务定制的智能模型。</p>
                            <button class="view-products-btn">探索 GPTs</button>
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
                        } else if (category === 'tools') {
                            showToolsView();
                        } else if (category === 'scripts') {
                            showScriptsView();
                        } else if (category === 'apps') {
                            showAppsView();
                        } else {
                            console.log(`View ${category} details`);
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
            },
            {
                id: 'ai-sidebar',
                name: 'AI Sidebar',
                icon: `<img src="${AISidebar}" alt="AI Sidebar" class="gpts-card-img-icon">`,
                description: '侧边栏 AI 助手，随时调用',
                storeUrl: '',
                manualUrl: ''
            },
            {
                id: 'word-recorder',
                name: '单词记录器',
                icon: `<img src="${单词记录器}" alt="单词记录器" class="gpts-card-img-icon">`,
                description: '点击按钮将剪贴板的内容保存为单词，支持复习、管理、导出',
                storeUrl: 'https://chromewebstore.google.com/detail/%E5%8D%95%E8%AF%8D%E8%AE%B0%E5%BD%95%E5%99%A8/ecihmcbeijcdgmbbabdmpgfbhpchbfpj?hl=zh-CN&utm_source=ext_sidebar',
                manualUrl: 'https://chromewebstore.google.com/detail/%E5%8D%95%E8%AF%8D%E8%AE%B0%E5%BD%95%E5%99%A8/ecihmcbeijcdgmbbabdmpgfbhpchbfpj?hl=zh-CN&utm_source=ext_sidebar'
            },
            {
                id: 'youtube-transcript',
                name: 'YouTube Transcript',
                icon: `<img src="${YouTubeTranscript}" alt="YouTube Transcript" class="gpts-card-img-icon">`,
                description: '一键获取 YouTube 视频字幕，支持导出',
                storeUrl: '',
                manualUrl: ''
            },
            {
                id: 'twitter-crawler',
                name: '推特爬虫',
                icon: `<img src="${TwitterCrawler}" alt="推特爬虫" class="gpts-card-img-icon">`,
                description: '自动化抓取推特内容',
                storeUrl: '',
                manualUrl: ''
            },
            {
                id: 'gemini-watermark-remover',
                name: 'Gemini 去水印',
                icon: `<img src="${GeminiWatermarkRemover}" alt="Gemini 去水印" class="gpts-card-img-icon">`,
                description: '一键去除 Gemini 生成图片的水印',
                storeUrl: '',
                manualUrl: ''
            }
        ];

        let pluginCardsHTML = '';
        myPlugins.forEach(plugin => {
            const storeButton = plugin.storeUrl ? `
                <a href="${plugin.storeUrl}" target="_blank" rel="noopener noreferrer" class="gpts-action-btn" style="margin-bottom: 10px;">
                    <svg class="chrome-store-icon" viewBox="0 0 24 24" width="18" height="18" style="margin-right: 8px;"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.93 4.93c1.52 1.52 2.47 3.59 2.47 5.87s-.95 4.34-2.47 5.87C15.41 20.22 13.78 21 12 21c-1.43 0-2.76-.54-3.77-1.45l6.22-6.22-4.01-4.01-6.22 6.22C3.17 14.25 2.5 12.62 2.5 11c0-1.78.54-3.41 1.45-4.77L10.17 10l4.01-4.01-6.22-6.22C9.24 3.17 10.57 2.5 12 2.5c1.78 0 3.41.54 4.77 1.45L10.55 10l6.38-6.07z"/><path fill="currentColor" d="M12,6.5c1.38 0 2.5 1.12 2.5 2.5S13.38 11.5 12,11.5 9.5 10.38 9.5 9s1.12-2.5 2.5-2.5zm0 7c2.49 0 4.5 2.01 4.5 4.5S14.49 22.5 12,22.5s-4.5-2.01-4.5-4.5 2.01-4.5 4.5-4.5z"/></svg>
                    <span>Chrome 应用店</span>
                </a>` : '';
            const manualButton = plugin.manualUrl ? `<a href="${plugin.manualUrl}" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">使用说明书</a>` : '';

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
gptsView.style.paddingTop = '100px';
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
                id: 'gpts-wechat',
                name: '将抵月',
                icon: `<img src="${猫咪头像}" alt="将抵月" class="gpts-card-img-icon">`,
                description: '微信公众号文章智能体'
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
            },
            {
                id: 'gpts-builder',
                name: 'GPT Builder',
                icon: `<img src="${GPTBuilder}" alt="GPT Builder" class="gpts-card-img-icon">`,
                description: '用 AI 构建 AI'
            }
        ];

        const gptsToShowTooltip = ['gpts-xiaolai', 'gpts-qingbian', 'gpts-builder', 'gpts-wechat'];

        let gptsCardsHTML = '';
        myGPTS.forEach(gpt => {
            let actionButtonHTML;
            if (gpt.id === 'gpts-learn') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67be8d6b2dec819186d2ab6041969366-learn" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">启动 GPTs</a>`;
            } else if (gpt.id === 'gpts-run') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67d4ce8e0894819183f11ae56e049445-run" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">启动 GPTs</a>`;
            } else if (gpt.id === 'gpts-fact-checker') {
                actionButtonHTML = `<a href="https://chatgpt.com/g/g-67be8eb1a560819191efb6675cb8d169-shi-shi-he-cha-yuan" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">启动 GPTs</a>`;
            } else if (gpt.id === 'gpts-wechat') {
                actionButtonHTML = `<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzk0MjU2OTA1Nw==" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">访问公众号</a>`;
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
                            <img src="${gpt.id === 'gpts-wechat' ? 将抵月 : WechatQR}" alt="QR Code">
                            <p>${gpt.id === 'gpts-wechat' ? '打开微信扫描二维码，即刻开始聊天' : '微信扫码添加好友即可获取'}</p>
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
                name: 'Tobooks',
                icon: `<img src="${EpubReaderIcon}" alt="Tobooks" class="gpts-card-img-icon">`,
                description: '一个简洁、高效的在线Epub电子书阅读器。',
                url: 'https://tobooks.xin'
            },
            {
                id: 'pixeltune-photo',
                name: 'PixelTune Photo',
                icon: `<img src="${PixelTunePhoto}" alt="PixelTune Photo" class="gpts-card-img-icon">`,
                description: '图片调整工具，随意调整图片大小。',
                url: 'https://pixeltunephoto.netlify.app/'
            },
            {
                id: 'content-dash',
                name: 'ContentDash',
                icon: `<img src="${ContentDash}" alt="ContentDash" class="gpts-card-img-icon">`,
                description: '内容管理与订阅工具。',
                url: 'https://cotentdash.netlify.app/'
            },
            {
                id: 'monoshot-web',
                name: 'Monoshot',
                icon: `<img src="${Monoshot}" alt="Monoshot" class="gpts-card-img-icon">`,
                description: '截图工具，快速捕捉屏幕内容。',
                url: 'https://monoshot-vault.netlify.app/'
            },
            {
                id: 'podcast',
                name: 'KeXin Podcast',
                icon: `<img src="${PodcastIcon}" alt="KeXin Podcast" class="gpts-card-img-icon">`,
                description: '可鑫的播客。',
                url: 'https://kexin-podcast.netlify.app/'
            }
        ];

        let webCardsHTML = '';
        webProjects.forEach(project => {
            webCardsHTML += `
                <div class="gpts-card" data-projectid="${project.id}">
                    <div class="gpts-card-icon">${project.icon}</div>
                    <h3 class="gpts-card-name">${project.name}</h3>
                    <p class="gpts-card-description">${project.description}</p>
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">访问网站</a>
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
        '/images/跑步2024.JPG': 跑步2024,
        '/images/跑步2024愿望.JPG': 跑步2024愿望,
        '/images/越来越强.jpg': 越来越强,
        '/images/死不旋踵.webp': 死不旋踵,
        '/images/世界在我面前.png': 世界在我面前,
        '/images/世界在我面前，缓缓展开.JPG': 世界在我面前缓缓展开,
        '/images/水仙花.png': 水仙花,
        '/images/心中温暖.jpg': 心中温暖,
        '/images/江南书院.png': 江南书院,
        '/images/你怎么就没血了.PNG': 你怎么就没血了,
        '/images/我们没有永远.JPG': 我们没有永远,
        '/images/科目三.JPG': 科目三,
        '/images/Slash Command Prompter.JPG': SlashCommandPrompter,
        '/images/笑来.JPG': 笑来,
        '/images/请辩.JPG': 请辩,
        '/images/GPT Builder.JPG': GPTBuilder,
        '/images/Learn.png': Learn,
        '/images/Run.png': Run,
        '/images/事实核查员.png': 事实核查员,
        '/images/将抵月.png': 将抵月,
        '/images/兰顿蚂蚁.webp': 兰顿蚂蚁,
        '/images/做最好的自己.jpeg': 做最好的自己,
        '/images/可控之事.JPG': 可控之事,
        '/images/最好的.JPG': 最好的,
        '/images/李笑来.jpg': 李笑来,
        '/images/笔记神器.png': 笔记神器,
        '/images/自救.png': 自救,
        '/images/金刚柱.JPG': 金刚柱,
        '/images/张鹏.png': 张鹏,
        '/images/曾叔.png': 曾叔,
        '/images/时间管道.JPG': 时间管道,
        '/images/单词.png': 单词记录器,
        '/images/Fire.png': FireIcon,
        '/images/闹钟.png': 闹钟Icon
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
    
    // 只在明显的水平滑动时阻止默认行为，允许垂直滚动
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    
    // 只有当水平滑动距离明显大于垂直滑动时才阻止默认行为
    if (deltaX > deltaY && deltaX > 30) {
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
                id: 'ai-sidebar-app',
                name: 'AI Sidebar',
                icon: `<img src="${AISidebar}" alt="AI Sidebar" class="gpts-card-img-icon">`,
                description: '侧边栏 AI 助手，支持 Mac 和 iOS。',
                url: 'https://aibar.xin',
                actionLabel: '访问获取'
            },
            {
                id: 'flow-app',
                name: 'Relearn',
                icon: `<img src="${FlowIcon}" alt="Relearn" class="gpts-card-img-icon">`,
                description: '一款笔记软件，你可以写下，就是想到就记，复制即记。',
                url: 'https://relearn.xin',
                actionLabel: '访问获取'
            },
            {
                id: 'iterate-app',
                name: 'Iterate',
                icon: `<img src="/iterate-icon.png" alt="Iterate" class="gpts-card-img-icon">`,
                description: '连接 AI IDE、CLI 与桌面宿主。让 AI 继续，而不是重来。',
                url: 'https://iterate.xin/iterate/',
                actionLabel: '访问获取'
            },
            {
                id: 'prompter-app',
                name: 'Prompter',
                icon: `<img src="${PrompterIcon}" alt="Prompter" class="gpts-card-img-icon">`,
                description: '提示词管理工具，支持手机和电脑。',
                url: 'https://prompter.xin',
                actionLabel: '访问获取'
            },
            {
                id: 'monoshot-app',
                name: 'Monoshot',
                icon: `<img src="${Monoshot}" alt="Monoshot" class="gpts-card-img-icon">`,
                description: '截图工具，快速捕捉屏幕内容。',
                url: ''
            },
            {
                id: 'ri-app',
                name: 'Replace Information',
                icon: `<img src="${RIIcon}" alt="Replace Information" class="gpts-card-img-icon">`,
                description: '信息置换工具，智能管理你的信息。',
                url: ''
            },
            {
                id: 'relax-app',
                name: 'Relax',
                icon: `<img src="${RelaxIcon}" alt="Relax" class="gpts-card-img-icon">`,
                description: '一个帮助你放松和冥想的应用。',
                url: 'https://need-relax.netlify.app/'
            },
            {
                id: 'fire-app',
                name: 'Fire',
                icon: `<img src="${FireIcon}" alt="Fire" class="gpts-card-img-icon">`,
                description: 'Fire计划。',
                url: 'https://fire-plan.netlify.app/'
            },
            {
                id: 'standing-app',
                name: '久坐提醒',
                icon: `<img src="${闹钟Icon}" alt="久坐提醒" class="gpts-card-img-icon">`,
                description: '提醒间隔设置，循环提醒，帮助您保持健康的工作习惯。',
                url: 'https://standing.netlify.app/'
            },
            {
                id: 'xspeech-app',
                name: 'xspeech',
                icon: `<img src="/xspeech-icon.png" alt="xspeech" class="gpts-card-img-icon">`,
                description: '本地语音转文字应用，让表达直接变成文本。',
                url: ''
            }
        ];

        let appCardsHTML = '';
        myApps.forEach(app => {
            const actionLabel = app.actionLabel || (app.url ? '访问 App' : '联系获取');
            const buttonHTML = app.url 
                ? `<a href="${app.url}" target="_blank" rel="noopener noreferrer" class="gpts-action-btn">${actionLabel}</a>`
                : `<button class="gpts-action-btn app-contact-btn">${actionLabel}</button>`;
            const tooltipHTML = !app.url ? `
                <div class="gpts-hover-tooltip">
                    <img src="${WechatQR}" alt="QR Code">
                    <p>付费内容，联系作者获取</p>
                </div>` : '';
            appCardsHTML += `
                <div class="gpts-card" data-appid="${app.id}">
                    <div class="gpts-card-icon">${app.icon}</div>
                    <h3 class="gpts-card-name">${app.name}</h3>
                    <p class="gpts-card-description">${app.description}</p>
                    ${buttonHTML}
                    ${tooltipHTML}
                </div>
            `;
        });

        appsView.innerHTML = `
            <div class="gpts-cards-grid">
                ${appCardsHTML}
            </div>
        `;
        mainContainer.appendChild(appsView);

        // 添加悬停显示二维码事件
        appsView.querySelectorAll('.gpts-card').forEach(card => {
            const tooltip = card.querySelector('.gpts-hover-tooltip');
            const actionButton = card.querySelector('.app-contact-btn');

            if (tooltip && actionButton) {
                actionButton.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                });
                actionButton.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                });
            }
        });

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

// 显示微信二维码弹窗
function showQRModal(appName) {
    // 移除已存在的弹窗
    const existingModal = document.querySelector('.qr-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <button class="qr-modal-close">&times;</button>
            <h3>联系获取 ${appName}</h3>
            <p>扫描下方二维码添加微信</p>
            <img src="${WechatQR}" alt="微信二维码" class="qr-code-img">
        </div>
    `;
    document.body.appendChild(modal);

    // 点击关闭按钮或背景关闭弹窗
    modal.querySelector('.qr-modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    // 动画显示
    gsap.fromTo(modal, {opacity: 0}, {opacity: 1, duration: 0.3});
    gsap.fromTo(modal.querySelector('.qr-modal-content'), {scale: 0.8, y: 20}, {scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)"});
}

function showIterateView() {
    const mainContainer = document.querySelector('main');
    let iterateView = document.querySelector('.iterate-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!iterateView) {
        iterateView = document.createElement('div');
        iterateView.className = 'main-detail iterate-view';
        iterateView.style.flexDirection = 'column';
        iterateView.style.alignItems = 'center';
        iterateView.style.padding = '2rem';
        iterateView.style.paddingTop = '100px';
        iterateView.style.textAlign = 'center';

        const iterateCard = `
            <div class="gpts-card" data-toolid="iterate">
                <div class="gpts-card-icon">
                    <div style="width: 64px; height: 32px; position: relative;">
                        <div style="position: absolute; left: 0; top: 0; width: 32px; height: 32px; border: 3px solid currentColor; border-radius: 50%; border-right: none;"></div>
                        <div style="position: absolute; right: 0; top: 0; width: 32px; height: 32px; border: 3px solid currentColor; border-radius: 50%; border-left: none;"></div>
                    </div>
                </div>
                <h3 class="gpts-card-name">Iterate</h3>
                <p class="gpts-card-description">连接 AI IDE、CLI 与桌面宿主。让 AI 继续，而不是重来。</p>
                <a href="/iterate/" class="gpts-action-btn">申请内测</a>
            </div>
        `;

        iterateView.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
                ${iterateCard}
            </div>
        `;
        mainContainer.appendChild(iterateView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                iterateView.style.display = 'none';
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
        if (detail !== iterateView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    iterateView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(iterateView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

function showToolsView() {
    const mainContainer = document.querySelector('main');
    let toolsView = document.querySelector('.tools-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!toolsView) {
        toolsView = document.createElement('div');
        toolsView.className = 'main-detail tools-view';
        toolsView.style.flexDirection = 'column';
        toolsView.style.alignItems = 'center';
        toolsView.style.padding = '2rem';
        toolsView.style.paddingTop = '100px';
        toolsView.style.textAlign = 'center';

        const myTools = [
            {
                id: 'iterate',
                name: 'Iterate',
                icon: `<div style="width: 64px; height: 32px; position: relative;">
                    <div style="position: absolute; left: 0; top: 0; width: 32px; height: 32px; border: 3px solid currentColor; border-radius: 50%; border-right: none;"></div>
                    <div style="position: absolute; right: 0; top: 0; width: 32px; height: 32px; border: 3px solid currentColor; border-radius: 50%; border-left: none;"></div>
                </div>`,
                description: '连接 AI IDE、CLI 与桌面宿主。让 AI 继续，而不是重来。',
                url: '/iterate/',
                actionLabel: '申请内测'
            },
            {
                id: 'youtube-crawler',
                name: 'YouTube Crawler',
                icon: `<svg viewBox="0 0 24 24" width="64" height="45"><path fill="currentColor" d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762C5.746,20,12,20,12,20s6.254,0,7.82-0.424c0.854-0.23,1.532,0.908,1.762-1.762C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.5v-7l6,3.5L10,15.5z"></path></svg>`,
                description: '抓取 YouTube 视频与数据。',
                url: null
            },
            {
                id: 'twitter-crawler',
                name: 'Twitter/X Crawler',
                icon: `<svg viewBox="0 0 24 24" width="50" height="50"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`,
                description: '抓取推文与用户数据。',
                url: null
            }
        ];

        let toolCardsHTML = '';
        myTools.forEach(tool => {
            const btnText = tool.actionLabel || (tool.url ? '查看 GitHub' : '联系获取');
            const btnClass = tool.url ? 'gpts-action-btn' : 'gpts-action-btn crawler-detail-btn';
            toolCardsHTML += `
                <div class="gpts-card" data-toolid="${tool.id}">
                    <div class="gpts-card-icon">${tool.icon}</div>
                    <h3 class="gpts-card-name">${tool.name}</h3>
                    <p class="gpts-card-description">${tool.description}</p>
                    ${tool.url ? `<a href="${tool.url}" class="${btnClass}">${btnText}</a>` : `<button class="${btnClass}">${btnText}</button>`}
                </div>
            `;
        });

        toolsView.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
                ${toolCardsHTML}
            </div>
        `;
        mainContainer.appendChild(toolsView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                toolsView.style.display = 'none';
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
        if (detail !== toolsView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    toolsView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(toolsView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

function showScriptsView() {
    const mainContainer = document.querySelector('main');
    let scriptsView = document.querySelector('.scripts-view');
    const navBackButton = document.getElementById('nav-back-to-creations-btn');

    if (!scriptsView) {
        scriptsView = document.createElement('div');
        scriptsView.className = 'main-detail scripts-view';
        scriptsView.style.flexDirection = 'column';
        scriptsView.style.alignItems = 'center';
        scriptsView.style.padding = '2rem';
        scriptsView.style.paddingTop = '100px';
        scriptsView.style.textAlign = 'center';

        const myScripts = [
            {
                id: 'coming-soon',
                name: '敬请期待',
                icon: `<svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"></path></svg>`,
                description: '自动化脚本正在准备中...'
            }
        ];

        let scriptCardsHTML = '';
        myScripts.forEach(script => {
            scriptCardsHTML += `
                <div class="gpts-card" data-scriptid="${script.id}">
                    <div class="gpts-card-icon">${script.icon}</div>
                    <h3 class="gpts-card-name">${script.name}</h3>
                    <p class="gpts-card-description">${script.description}</p>
                </div>
            `;
        });

        scriptsView.innerHTML = `
            <div class="gpts-cards-grid">
                ${scriptCardsHTML}
            </div>
        `;
        mainContainer.appendChild(scriptsView);

        if (navBackButton) {
            const newBtn = navBackButton.cloneNode(true);
            navBackButton.parentNode.replaceChild(newBtn, navBackButton);
            newBtn.addEventListener('click', () => {
                scriptsView.style.display = 'none';
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
        if (detail !== scriptsView) {
            detail.style.display = 'none';
        }
    });

    const newNavBackButton = document.getElementById('nav-back-to-creations-btn');
    scriptsView.style.display = 'flex';
    if (newNavBackButton) newNavBackButton.style.display = 'inline-block';
    gsap.fromTo(scriptsView, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
}

// 处理 MUSIC 按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const musicButton = document.querySelector('.action-grid .action-button:nth-child(11)'); // MUSIC 按钮
    const mainDefault = document.querySelector('.main-default');
    const musicView = document.querySelector('.music-view');

    if (musicButton && musicView) {
        musicButton.addEventListener('click', () => {
            if (mainDefault) {
                mainDefault.style.display = 'none';
            }
            // 隐藏所有其他视图
            document.querySelectorAll('.main-detail').forEach(detail => {
                detail.style.display = 'none';
            });
            const investView = document.querySelector('.invest-view');
            if (investView) investView.style.display = 'none';
            const buildView = document.querySelector('.build-view');
            if (buildView) buildView.style.display = 'none';
            
            musicView.style.display = 'flex';
            gsap.fromTo(musicView, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"});
            
            // 为音乐卡片添加动画
            const musicCards = musicView.querySelectorAll('.music-card');
            gsap.fromTo(musicCards, 
                {opacity: 0, y: 20}, 
                {opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out"}
            );
            
            document.body.classList.remove('menu-open');
        });
    }
});
