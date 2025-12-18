
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'https://esm.sh/three@0.162.0';
import { OrbitControls } from 'https://esm.sh/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://esm.sh/three@0.162.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://esm.sh/three@0.162.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://esm.sh/three@0.162.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'https://esm.sh/three@0.162.0/examples/jsm/postprocessing/OutputPass.js';

export interface Background3DRef {
  morph: () => void;
  togglePause: () => boolean;
  resetCamera: () => void;
}

interface Background3DProps {
  theme?: 'light' | 'dark';
  density?: number;
  paletteIndex?: number;
}

const Background3D = forwardRef<Background3DRef, Background3DProps>(({ theme = 'dark', density = 100, paletteIndex = 0 }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  const currentFormationRef = useRef(0);
  const buildVizRef = useRef<((f: number, d: number) => void) | null>(null);
  const pausedRef = useRef(false);

  const colorPalettes = [
    [new THREE.Color(0x00c3ff), new THREE.Color(0x764ba2), new THREE.Color(0x00ffff), new THREE.Color(0x0077ff), new THREE.Color(0x6e48aa)],
    [new THREE.Color(0xf857a6), new THREE.Color(0xff5858), new THREE.Color(0xfeca57), new THREE.Color(0xff6348), new THREE.Color(0xff9068)],
    [new THREE.Color(0x4facfe), new THREE.Color(0x00f2fe), new THREE.Color(0x43e97b), new THREE.Color(0x38f9d7), new THREE.Color(0x4484ce)]
  ];

  useImperativeHandle(ref, () => ({
    morph: () => {
      currentFormationRef.current = (currentFormationRef.current + 1) % 3;
      buildVizRef.current?.(currentFormationRef.current, density / 100);
    },
    togglePause: () => {
      pausedRef.current = !pausedRef.current;
      return pausedRef.current;
    },
    resetCamera: () => {
      window.dispatchEvent(new CustomEvent('reset-3d-camera'));
    },
  }));

  useEffect(() => {
    if (buildVizRef.current) {
      buildVizRef.current(currentFormationRef.current, density / 100);
    }
  }, [density, paletteIndex]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const noiseFunctions = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        vec4 j = p - 49.0 * floor(p * (1.0/49.0));
        vec4 x_ = floor(j * (1.0/7.0));
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * 0.142857 + 0.071428;
        vec4 y = y_ * 0.142857 + 0.071428;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m; return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
    `;

    const pulseUniforms = {
      uTime: { value: 0.0 },
      uPulsePositions: { value: [new THREE.Vector3(1e4,0,0), new THREE.Vector3(1e4,0,0), new THREE.Vector3(1e4,0,0)] },
      uPulseTimes: { value: [-1e4, -1e4, -1e4] },
      uPulseColors: { value: [new THREE.Color(1,1,1), new THREE.Color(1,1,1), new THREE.Color(1,1,1)] },
      uPulseSpeed: { value: 22.0 },
      uBaseNodeSize: { value: 0.7 }
    };

    const nodeMat = new THREE.ShaderMaterial({
      uniforms: pulseUniforms,
      vertexShader: `
        ${noiseFunctions}
        attribute float nodeSize; attribute vec3 nodeColor; attribute float distFromRoot;
        uniform float uTime; uniform vec3 uPulsePositions[3]; uniform float uPulseTimes[3]; uniform float uPulseSpeed; uniform float uBaseNodeSize;
        varying vec3 vColor; varying float vPulse;
        void main() {
          vColor = nodeColor;
          vec3 wPos = (modelMatrix * vec4(position, 1.0)).xyz;
          float pulse = 0.0;
          for(int i=0; i<3; i++) {
            float d = distance(wPos, uPulsePositions[i]);
            float r = (uTime - uPulseTimes[i]) * uPulseSpeed;
            pulse += smoothstep(4.0, 0.0, abs(d - r)) * smoothstep(5.0, 0.0, uTime - uPulseTimes[i]);
          }
          vPulse = pulse;
          float breathe = sin(uTime * 0.8 + distFromRoot * 0.15) * 0.2 + 0.8;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = nodeSize * uBaseNodeSize * breathe * (1.0 + pulse * 3.0) * (1200.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vPulse;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          vec3 color = mix(vColor, vec3(1.0), vPulse * 0.9);
          gl_FragColor = vec4(color, (1.0 - d * 2.0) * (0.85 + vPulse * 0.15));
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });

    const connMat = new THREE.ShaderMaterial({
      uniforms: pulseUniforms,
      vertexShader: `
        ${noiseFunctions}
        attribute vec3 start; attribute vec3 end; attribute vec3 connColor;
        uniform float uTime; uniform vec3 uPulsePositions[3]; uniform float uPulseTimes[3]; uniform float uPulseSpeed;
        varying vec3 vColor; varying float vPulse; varying float vT;
        void main() {
          float t = position.x; vT = t; vColor = connColor;
          vec3 pos = mix(start, end, t);
          vec3 wPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          float pulse = 0.0;
          for(int i=0; i<3; i++) {
            float d = distance(wPos, uPulsePositions[i]);
            float r = (uTime - uPulseTimes[i]) * uPulseSpeed;
            pulse += smoothstep(4.0, 0.0, abs(d - r)) * smoothstep(5.0, 0.0, uTime - uPulseTimes[i]);
          }
          vPulse = pulse;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vColor; varying float vPulse; varying float vT;
        void main() {
          float flow = sin(vT * 12.0 - uTime * 6.0) * 0.5 + 0.5;
          vec3 color = mix(vColor, vec3(1.0), vPulse * 0.7);
          gl_FragColor = vec4(color, 0.15 + flow * 0.15 + vPulse * 0.5);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = 0x000000;
    scene.fog = new THREE.FogExp2(bgColor, 0.0018);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1500);
    camera.position.set(0, 5, 60);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bgColor, 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 30;
    controls.maxDistance = 250;

    // --- CORREÇÃO DO STARFIELD (Float32Array nativo) ---
    const starsCount = 12000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starsCount * 3);
    const starSizes = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const r = 200 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i3 + 2] = r * Math.cos(phi);
      
      starSizes[i] = Math.random() * 2.5;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.8);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    let currentNetworkMesh: THREE.Points | null = null;
    let currentConnMesh: THREE.LineSegments | null = null;

    const buildViz = (f: number, d: number) => {
      if (currentNetworkMesh) scene.remove(currentNetworkMesh);
      if (currentConnMesh) scene.remove(currentConnMesh);

      const palette = colorPalettes[paletteIndex];
      const nodes: any[] = [];
      const root = { pos: new THREE.Vector3(0,0,0), level: 0, connections: [] as any[] };
      nodes.push(root);

      if (f === 0) {
        for(let l=1; l<=4; l++) {
          const count = Math.floor(l * 15 * d);
          for(let i=0; i<count; i++) {
            const phi = Math.acos(1 - 2 * (i+0.5)/count);
            const theta = 2 * Math.PI * i / 1.618;
            const n = { pos: new THREE.Vector3().setFromSphericalCoords(l*8, phi, theta), level: l, connections: [] as any[] };
            nodes.push(n);
            const parent = nodes[Math.floor(Math.random() * (nodes.length-1))];
            parent.connections.push({ node: n });
          }
        }
      } else if (f === 1) {
        const count = Math.floor(180 * d);
        for(let i=0; i<count; i++) {
          const t = i / count;
          const angle = t * Math.PI * 30;
          const radius = 12 + Math.sin(t * 10) * 4;
          const n = { 
            pos: new THREE.Vector3(
              Math.cos(angle) * radius, 
              (t - 0.5) * 120,
              Math.sin(angle) * radius
            ), 
            level: Math.floor(t * 5), 
            connections: [] as any[] 
          };
          nodes.push(n);
          if (i > 0) nodes[i-1].connections.push({ node: n });
          if (i > 10 && Math.random() > 0.85) nodes[i-10].connections.push({ node: n });
        }
      } else {
        const grow = (p: any, depth: number) => {
          if (depth > 3) return;
          const subBranches = Math.ceil(3 * d);
          for(let i=0; i<subBranches; i++) {
            const n = { 
              pos: p.pos.clone().add(new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(25),
                THREE.MathUtils.randFloatSpread(25),
                THREE.MathUtils.randFloatSpread(25)
              )), 
              level: depth, 
              connections: [] as any[] 
            };
            nodes.push(n); 
            p.connections.push({ node: n });
            grow(n, depth+1);
          }
        };
        grow(root, 1);
      }

      const nodeGeo = new THREE.BufferGeometry();
      const pos: number[] = [], sizes: number[] = [], colors: number[] = [], dists: number[] = [];
      nodes.forEach(n => {
        pos.push(n.pos.x, n.pos.y, n.pos.z);
        sizes.push(n.level === 0 ? 3.0 : 1.5);
        const c = palette[n.level % palette.length];
        colors.push(c.r, c.g, c.b);
        dists.push(n.pos.length());
      });
      nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      nodeGeo.setAttribute('nodeSize', new THREE.Float32BufferAttribute(sizes, 1));
      nodeGeo.setAttribute('nodeColor', new THREE.Float32BufferAttribute(colors, 3));
      nodeGeo.setAttribute('distFromRoot', new THREE.Float32BufferAttribute(dists, 1));
      currentNetworkMesh = new THREE.Points(nodeGeo, nodeMat);
      scene.add(currentNetworkMesh);

      const connGeo = new THREE.BufferGeometry();
      const c_pos: number[] = [], c_start: number[] = [], c_end: number[] = [], c_colors: number[] = [];
      nodes.forEach(n => {
        n.connections.forEach((c: any) => {
          for(let i=0; i<15; i++) {
            const t = i/14;
            c_pos.push(t, 0, 0);
            c_start.push(n.pos.x, n.pos.y, n.pos.z);
            c_end.push(c.node.pos.x, c.node.pos.y, c.node.pos.z);
            const col = palette[Math.min(n.level, c.node.level) % palette.length];
            c_colors.push(col.r, col.g, col.b);
          }
        });
      });
      connGeo.setAttribute('position', new THREE.Float32BufferAttribute(c_pos, 3));
      connGeo.setAttribute('start', new THREE.Float32BufferAttribute(c_start, 3));
      connGeo.setAttribute('end', new THREE.Float32BufferAttribute(c_end, 3));
      connGeo.setAttribute('connColor', new THREE.Float32BufferAttribute(c_colors, 3));
      currentConnMesh = new THREE.LineSegments(connGeo, connMat);
      scene.add(currentConnMesh);
    };

    buildVizRef.current = buildViz;
    buildViz(currentFormationRef.current, density / 100);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      if (!pausedRef.current) {
        pulseUniforms.uTime.value = t;
        if (currentNetworkMesh) currentNetworkMesh.rotation.y = t * 0.08;
        if (currentConnMesh) currentConnMesh.rotation.y = t * 0.08;
        
        starField.rotation.y = t * 0.01;
        starField.rotation.z = t * 0.005;
      }
      controls.update();
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    const triggerPulse = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.z-50') || (e.target as HTMLElement).closest('.glass-panel')) return;
      const mouse = new THREE.Vector2((e.clientX/window.innerWidth)*2-1, -(e.clientY/window.innerHeight)*2+1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion), 0);
      const intersect = new THREE.Vector3();
      if (ray.ray.intersectPlane(plane, intersect)) {
        const currentTime = clock.getElapsedTime();
        const i = Math.floor(currentTime * 10) % 3;
        pulseUniforms.uPulsePositions.value[i].copy(intersect);
        pulseUniforms.uPulseTimes.value[i] = currentTime;
        pulseUniforms.uPulseColors.value[i].copy(colorPalettes[paletteIndex][Math.floor(Math.random() * colorPalettes[paletteIndex].length)]);
      }
    };

    const handleScroll = () => {
      if (!cameraRef.current) return;
      const scrollY = window.scrollY;
      const scrollRatio = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const targetZ = 60 - scrollRatio * 35;
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.1);
    };

    const onResetCamera = () => {
      controls.reset();
      camera.position.set(0, 5, 60);
    };

    window.addEventListener('reset-3d-camera', onResetCamera);
    window.addEventListener('click', triggerPulse);
    window.addEventListener('scroll', handleScroll);
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', triggerPulse);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('reset-3d-camera', onResetCamera);
      renderer.dispose();
    };
  }, [paletteIndex]); 

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none"></div>
    </div>
  );
});

export default Background3D;
