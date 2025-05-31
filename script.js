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
    time += 0.01;
    requestAnimationFrame(animate);
}

// GSAP动画
gsap.to('.venn-diagram', {
    rotation: 360,
    duration: 45,
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
            if (actionGrid.style.display === 'none' || !actionGrid.style.display) {
                actionGrid.style.display = 'grid';
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
            } else {
                actionGrid.style.display = 'none';
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

// main 区域切换逻辑
const mainDefault = document.querySelector('.main-default');
const mainDetail = document.querySelector('.main-detail');

profileImage.addEventListener('click', () => {
    mainDefault.style.display = 'none';
    mainDetail.style.display = 'flex';
    document.body.classList.remove('menu-open'); // 自动关闭侧边栏
});

// 可选：点击 main-detail 区域空白处返回主页
mainDetail.addEventListener('click', (e) => {
    if (e.target === mainDetail) {
        mainDetail.style.display = 'none';
        mainDefault.style.display = 'flex';
    }
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