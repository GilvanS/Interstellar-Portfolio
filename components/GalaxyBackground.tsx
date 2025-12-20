
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

    // Controls - desabilitados para animação automática apenas
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = false;
    controls.enabled = false; // Desabilitar controles de mouse para usar apenas animação automática
    
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

    // Animação automática da câmera - viagem espacial suave e lenta
    const animateCamera = (time: number) => {
      // Duração total do ciclo: ~50 segundos (bem lento para transição suave)
      const cycleDuration = 50;
      const t = (time % cycleDuration) / cycleDuration;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      
      // Função de easing muito suave (ease-in-out cubic)
      const easeInOutCubic = (t: number) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      // Segmento 1 (0-0.5): Viajando para frente através da galáxia
      if (t < 0.5) {
        const segmentT = easeInOutCubic(t / 0.5);
        // Começa de longe (3, 3, 3) e viaja através da galáxia até (0, 0, -5)
        targetX = THREE.MathUtils.lerp(3, 0, segmentT);
        targetY = THREE.MathUtils.lerp(3, 0, segmentT);
        targetZ = THREE.MathUtils.lerp(3, -5, segmentT);
      }
      // Segmento 2 (0.5-1.0): Voltando para trás suavemente
      else {
        const segmentT = easeInOutCubic((t - 0.5) / 0.5);
        // Volta para a posição inicial (3, 3, 3)
        targetX = THREE.MathUtils.lerp(0, 3, segmentT);
        targetY = THREE.MathUtils.lerp(0, 3, segmentT);
        targetZ = THREE.MathUtils.lerp(-5, 3, segmentT);
      }

      // Aplicar suavização (lerp) para movimento extremamente fluido
      const lerpSpeed = 0.03; // Bem lento para movimento muito suave
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);
      
      // Sempre olhar para o centro da galáxia
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
    };

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!pausedRef.current) {
        // Animar câmera automaticamente
        animateCamera(elapsedTime);
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
    <div ref={containerRef} className="fixed inset-0 z-0 bg-black">
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



