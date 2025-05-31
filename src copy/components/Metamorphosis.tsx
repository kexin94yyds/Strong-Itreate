import React, { useRef, useEffect } from 'react';

// themes: inner over outer, simplicity over sensation, open heart over thought
// visualization: A form that transforms from complex to simple, revealing inner essence beneath surface appearance

const Metamorphosis = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Configuration
    const numLines = 150;
    const lineSegments = 200;
    const lineAlpha = 0.5;
    const lineWidth = 0.6;
    const morphSpeed = 0.0005;
    const rotateSpeed = 0.00025;
    
    // Start after initial pause
    let time = 0;
    
    // Form definitions - moving from outer complexity to inner simplicity
    const forms = [
      // Form 1: Draped cloth-like shape with dynamic waves
      (u: number, v: number, t: number) => {
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;
        
        // Dynamic time-based variations
        const timeWave1 = Math.sin(t * 0.003) * 0.5 + 0.5;
        const timeWave2 = Math.cos(t * 0.002) * 0.3 + 0.7;
        const timeWave3 = Math.sin(t * 0.004) * 0.4 + 0.6;
        
        let r = 120 + 30 * Math.sin(phi * 4 + theta * 2 + t * 0.01);
        r += 20 * Math.sin(phi * 6 + t * 0.008) * Math.cos(theta * 3 + t * 0.005);
        r *= timeWave2; // Dynamic scaling
        
        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.sin(phi) * Math.sin(theta);
        let z = r * Math.cos(phi) + 20 * Math.sin(theta * 5 + phi * 3 + t * 0.012) * timeWave1;
        
        // Add flowing motion
        const flow = Math.sin(t * 0.006 + phi * 2) * 15 * timeWave3;
        x += flow * Math.cos(theta);
        y += flow * Math.sin(theta);
        
        return { x, y, z };
      },
      
      // Form 2: Dynamic angular folded shape with breathing motion
      (u: number, v: number, t: number) => {
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;
        
        // Dynamic breathing and folding
        const breathe = Math.sin(t * 0.004) * 0.3 + 1.0;
        const fold = Math.cos(t * 0.003) * 0.2 + 0.8;
        const twist = Math.sin(t * 0.002) * 0.5;
        
        let r = 150 + 20 * Math.cos(phi * 8 + t * 0.01);
        r *= (0.8 + 0.2 * Math.abs(Math.cos(theta * 2 + t * 0.007))) * breathe;
        
        // Dynamic angular variations
        const angularShift = Math.sin(t * 0.005 + phi * 3) * 0.3;
        const dynamicTheta = theta + angularShift;
        
        let x = r * Math.sin(phi) * Math.cos(dynamicTheta);
        let y = r * Math.sin(phi) * Math.sin(dynamicTheta);
        let z = r * Math.cos(phi) * (fold + 0.3 * Math.sin(dynamicTheta * 4 + t * 0.009));
        
        // Add twisting motion
        const twistAngle = twist * phi;
        const newX = x * Math.cos(twistAngle) - y * Math.sin(twistAngle);
        const newY = x * Math.sin(twistAngle) + y * Math.cos(twistAngle);
        
        return { x: newX, y: newY, z };
      },
      
      // Form 3: Dynamic organic bulbous shape with pulsing life
      (u: number, v: number, t: number) => {
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;
        
        // Organic pulsing and growth patterns
        const pulse = Math.sin(t * 0.005) * 0.4 + 1.0;
        const growth = Math.cos(t * 0.003) * 0.3 + 0.7;
        const organicFlow = Math.sin(t * 0.004) * 0.2;
        
        let r = 120 * pulse;
        r += 50 * Math.sin(phi * 3 + t * 0.008) * Math.sin(theta * 2.5 + t * 0.006) * growth;
        r += 30 * Math.cos(phi * 5 + theta + t * 0.01);
        
        // Dynamic hollow areas that shift over time
        const hollowShift = Math.sin(t * 0.007);
        const hollow = Math.max(0, Math.sin(phi * 2 + theta * 3 + hollowShift) - 0.7);
        r *= 1 - hollow * (0.8 + organicFlow * 0.3);
        
        // Add organic undulation
        const undulation = Math.sin(t * 0.009 + phi * 4) * 10;
        r += undulation;
        
        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.sin(phi) * Math.sin(theta);
        let z = r * Math.cos(phi);
        
        // Add organic swaying motion
        const sway = Math.sin(t * 0.004 + theta) * 8 * growth;
        x += sway * Math.cos(phi);
        y += sway * Math.sin(phi);
        
        return { x, y, z };
      },
      
      // Form 4: Dynamic nested hexagonal tube with mechanical precision
      (u: number, v: number, t: number) => {
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;
        
        // Dynamic mechanical movements
        const mechanicalPulse = Math.sin(t * 0.006) * 0.2 + 1.0;
        const layerShift = Math.cos(t * 0.004) * 0.3;
        const precisionRotation = t * 0.002;
        
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
    const interpolateForms = (
      formA: (u: number, v: number, t: number) => { x: number; y: number; z: number },
      formB: (u: number, v: number, t: number) => { x: number; y: number; z: number },
      u: number,
      v: number,
      t: number,
      blend: number
    ) => {
      const pointA = formA(u, v, t);
      const pointB = formB(u, v, t);
      
      return {
        x: pointA.x * (1 - blend) + pointB.x * blend,
        y: pointA.y * (1 - blend) + pointB.y * blend,
        z: pointA.z * (1 - blend) + pointB.z * blend
      };
    };
    
    // Get the current form - opening to transformation with an open heart
    const getCurrentForm = (u: number, v: number, t: number) => {
      // Calculate which two forms to blend between
      const totalForms = forms.length;
      const cycleTime = 800; // Time to complete one full cycle
      const position = (t % (cycleTime * totalForms)) / cycleTime;
      const formIndex = Math.floor(position);
      const nextFormIndex = (formIndex + 1) % totalForms;
      
      // Calculate blend with pause and easing
      let rawBlend = position - formIndex;
      
      // Add pause time to showcase each form
      const pauseTime = 0.3;
      const transitionTime = 1 - (pauseTime * 2); // Remaining time for the transition
      
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
      
      // Calculate dynamic rotation based on time with varying speeds
      const dynamicRotateSpeed = rotateSpeed * (1 + Math.sin(time * 0.001) * 0.5);
      const rotateX = Math.sin(time * dynamicRotateSpeed) * 0.5;
      const rotateY = Math.cos(time * dynamicRotateSpeed * 0.7) * 0.3;
      const rotateZ = time * dynamicRotateSpeed * 0.1 + Math.sin(time * 0.002) * 0.2;
      
      // Draw horizontal contour lines
      for (let i = 0; i < numLines; i++) {
        const v = i / (numLines - 1);
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.lineWidth = lineWidth;
        
        let lastPointVisible = false;
        let lastPoint = null;
        
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
        let lastPoint = null;
        
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
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (canvas && ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#000000',
      width: '100%',
      height: '100%'
    }}>
      <canvas ref={canvasRef} width={550} height={550} />
    </div>
  );
};

export default Metamorphosis; 