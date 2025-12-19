
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'https://esm.sh/three@0.132.2';
import { OrbitControls } from 'https://esm.sh/three@0.132.2/examples/jsm/controls/OrbitControls.js';

export interface GalaxyBackgroundRef {
  regenerate: () => void;
  togglePause: () => boolean;
  resetCamera: () => void;
}

interface GalaxyBackgroundProps {
  count?: number;
  size?: number;
  radius?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
  randomnessPower?: number;
  insideColor?: string;
  outsideColor?: string;
}

const GalaxyBackground = forwardRef<GalaxyBackgroundRef, GalaxyBackgroundProps>(({
  count = 100000,
  size = 0.01,
  radius = 2.15,
  branches = 3,
  spin = 3,
  randomness = 5,
  randomnessPower = 4,
  insideColor = '#ff6030',
  outsideColor = '#0949f0'
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const pausedRef = useRef(false);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const isUserInteractingRef = useRef(false);
  const autoRotateTimeoutRef = useRef<number | null>(null);

  const parameters = {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor
  };

  useImperativeHandle(ref, () => ({
    regenerate: () => {
      generateGalaxy();
    },
    togglePause: () => {
      pausedRef.current = !pausedRef.current;
      return pausedRef.current;
    },
    resetCamera: () => {
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.set(3, 3, 3);
        controlsRef.current.reset();
      }
    },
  }));

  const generateGalaxy = () => {
    if (!sceneRef.current) return;

    // Remove previous galaxy if exists
    if (pointsRef.current) {
      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      sceneRef.current.remove(pointsRef.current);
    }

    // Create material
    const material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    materialRef.current = material;

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    // Generate particles
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random() * parameters.randomness, Math.random() * parameters.radius);
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const negPos = [1, -1];
      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, Math.random() * radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current = geometry;

    // Create points
    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    sceneRef.current.add(points);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;
    cameraRef.current = camera;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    
    // Função para verificar se o elemento é interativo
    const isInteractiveElement = (element: HTMLElement | null): boolean => {
      if (!element || element === canvasRef.current || element === containerRef.current) return false;
      // Verificar se é um elemento interativo
      const tagName = element.tagName;
      if (
        tagName === 'BUTTON' ||
        tagName === 'A' ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        element.closest('button') ||
        element.closest('a') ||
        element.closest('nav')
      ) {
        return true;
      }
      // Verificar se está dentro de um elemento com pointer-events-auto
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.pointerEvents === 'auto' && element !== canvasRef.current) {
        return true;
      }
      return false;
    };
    
    // Handler para passar eventos para o canvas quando não estão sobre elementos interativos
    const handleGlobalMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Se não for um elemento interativo, passar evento para o canvas
      if (!isInteractiveElement(target) && canvasRef.current && target !== canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Criar evento sintético no canvas
        const syntheticEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          button: e.button,
          buttons: e.buttons,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          metaKey: e.metaKey
        });
        canvasRef.current.dispatchEvent(syntheticEvent);
        
        isUserInteractingRef.current = true;
        if (autoRotateTimeoutRef.current) {
          clearTimeout(autoRotateTimeoutRef.current);
        }
        if (canvasRef.current) {
          canvasRef.current.style.cursor = 'grabbing';
        }
      }
    };
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isInteractiveElement(target) && canvasRef.current && target !== canvasRef.current) {
        const syntheticEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          button: e.button,
          buttons: e.buttons,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          metaKey: e.metaKey
        });
        canvasRef.current.dispatchEvent(syntheticEvent);
      }
    };
    
    const handleGlobalMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isInteractiveElement(target) && canvasRef.current && target !== canvasRef.current) {
        const syntheticEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          button: e.button,
          buttons: e.buttons
        });
        canvasRef.current.dispatchEvent(syntheticEvent);
      }
      // Retomar rotação automática após 3 segundos sem interação
      autoRotateTimeoutRef.current = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 3000);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };
    
    const handleGlobalWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (!isInteractiveElement(target) && canvasRef.current && target !== canvasRef.current) {
        const syntheticEvent = new WheelEvent('wheel', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaZ: e.deltaZ,
          deltaMode: e.deltaMode,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          metaKey: e.metaKey
        });
        canvasRef.current.dispatchEvent(syntheticEvent);
        
        isUserInteractingRef.current = true;
        if (autoRotateTimeoutRef.current) {
          clearTimeout(autoRotateTimeoutRef.current);
        }
      }
    };
    
    // Detectar interação direta no canvas
    const onCanvasMouseDown = () => {
      isUserInteractingRef.current = true;
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
      }
    };
    
    const onCanvasMouseUp = () => {
      autoRotateTimeoutRef.current = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 3000);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };
    
    const onCanvasWheel = () => {
      isUserInteractingRef.current = true;
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
    
    // Adicionar listeners no canvas para interações diretas
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousedown', onCanvasMouseDown);
      canvasRef.current.addEventListener('mouseup', onCanvasMouseUp);
      canvasRef.current.addEventListener('wheel', onCanvasWheel);
      canvasRef.current.style.cursor = 'grab';
    }
    
    // Adicionar listeners globais para capturar eventos sobre elementos sobrepostos
    window.addEventListener('mousedown', handleGlobalMouseDown, true);
    window.addEventListener('mousemove', handleGlobalMouseMove, true);
    window.addEventListener('mouseup', handleGlobalMouseUp, true);
    window.addEventListener('wheel', handleGlobalWheel, true);
    
    controlsRef.current = controls;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Generate initial galaxy
    generateGalaxy();

    // Animation
    const clock = new THREE.Clock();
    clockRef.current = clock;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!pausedRef.current) {
        // Update controls
        controls.update();

        // Animate camera apenas se o usuário não estiver interagindo
        if (!isUserInteractingRef.current) {
          camera.position.x = Math.cos(elapsedTime * 0.05) * 3;
          camera.position.z = Math.sin(elapsedTime * 0.05) * 3;
          camera.lookAt(0, 0, 0);
          // Atualizar os controles para refletir a nova posição
          controls.target.set(0, 0, 0);
        }
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      animationIdRef.current = requestAnimationFrame(tick);
    };

    tick();

    // Handle resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleGlobalMouseDown, true);
      window.removeEventListener('mousemove', handleGlobalMouseMove, true);
      window.removeEventListener('mouseup', handleGlobalMouseUp, true);
      window.removeEventListener('wheel', handleGlobalWheel, true);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', onCanvasMouseDown);
        canvasRef.current.removeEventListener('mouseup', onCanvasMouseUp);
        canvasRef.current.removeEventListener('wheel', onCanvasWheel);
      }
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (pointsRef.current) {
        if (geometryRef.current) geometryRef.current.dispose();
        if (materialRef.current) materialRef.current.dispose();
        scene.remove(pointsRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Regenerate when parameters change
  useEffect(() => {
    generateGalaxy();
  }, [count, size, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-black" style={{ cursor: 'grab' }}>
      <canvas 
        ref={canvasRef} 
        className="webgl w-full h-full block" 
        style={{ display: 'block' }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"
        style={{ pointerEvents: 'none' }}
      ></div>
    </div>
  );
});

GalaxyBackground.displayName = 'GalaxyBackground';

export default GalaxyBackground;



