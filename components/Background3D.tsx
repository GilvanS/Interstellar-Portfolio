
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

const Background3D = forwardRef<Background3DRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const internalRef = useRef<{
    morph: () => void;
    togglePause: () => boolean;
    resetCamera: () => void;
  } | null>(null);

  useImperativeHandle(ref, () => ({
    morph: () => internalRef.current?.morph(),
    togglePause: () => internalRef.current?.togglePause() || false,
    resetCamera: () => internalRef.current?.resetCamera(),
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    const config = {
      paused: false,
      activePaletteIndex: 0,
      currentFormation: 0,
      numFormations: 3,
      densityFactor: 1.0,
      pulseSpeed: 18.0
    };

    const palette = [
      new THREE.Color(0x00c3ff), // Azul Gilvan
      new THREE.Color(0x0077ff),
      new THREE.Color(0x764ba2), 
      new THREE.Color(0x00ffff),
      new THREE.Color(0xffd700)
    ];

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 45);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050b14, 1);

    // Starfield
    const createStarfield = () => {
      const count = 6000;
      const pos = [], cols = [], sizes = [];
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(60, 200);
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        cols.push(0.6, 0.9, 1.0);
        sizes.push(THREE.MathUtils.randFloat(0.1, 0.3));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
      geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      return new THREE.Points(geo, new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor; uniform float uTime;
          void main() {
            vColor = color;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            float blink = sin(uTime * 1.2 + position.x * 10.0) * 0.4 + 0.6;
            gl_PointSize = size * blink * (300.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            if (length(gl_PointCoord - 0.5) > 0.5) discard;
            gl_FragColor = vec4(vColor, 0.7);
          }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      }));
    };
    const stars = createStarfield();
    scene.add(stars);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.4, 0.5, 0.8);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const pulseUniforms = {
      uTime: { value: 0.0 },
      uPulsePositions: { value: [new THREE.Vector3(1e4,0,0), new THREE.Vector3(1e4,0,0), new THREE.Vector3(1e4,0,0)] },
      uPulseTimes: { value: [-1e4, -1e4, -1e4] },
      uPulseColors: { value: [new THREE.Color(1,1,1), new THREE.Color(1,1,1), new THREE.Color(1,1,1)] },
      uPulseSpeed: { value: config.pulseSpeed },
      uBaseNodeSize: { value: 0.65 }
    };

    const noiseShader = `
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

    const nodeMat = new THREE.ShaderMaterial({
      uniforms: pulseUniforms,
      vertexShader: `
        ${noiseShader}
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
            pulse += smoothstep(3.0, 0.0, abs(d - r)) * smoothstep(4.0, 0.0, uTime - uPulseTimes[i]);
          }
          vPulse = pulse;
          float breathe = sin(uTime * 0.7 + distFromRoot * 0.2) * 0.15 + 0.85;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = nodeSize * uBaseNodeSize * breathe * (1.0 + pulse * 2.5) * (1000.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vPulse;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          vec3 color = mix(vColor, vec3(1.0), vPulse * 0.8);
          gl_FragColor = vec4(color, (1.0 - d * 2.0) * 0.9);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });

    const connMat = new THREE.ShaderMaterial({
      uniforms: pulseUniforms,
      vertexShader: `
        ${noiseShader}
        attribute vec3 start; attribute vec3 end; attribute vec3 connColor; attribute float strength;
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
            pulse += smoothstep(3.0, 0.0, abs(d - r)) * smoothstep(4.0, 0.0, uTime - uPulseTimes[i]);
          }
          vPulse = pulse;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`,
      fragmentShader: `
        uniform float uTime; // DECLARAÇÃO ADICIONADA AQUI PARA CORREÇÃO
        varying vec3 vColor; varying float vPulse; varying float vT;
        void main() {
          float flow = sin(vT * 10.0 - uTime * 5.0) * 0.5 + 0.5;
          vec3 color = mix(vColor, vec3(1.0), vPulse * 0.6);
          gl_FragColor = vec4(color, 0.3 + flow * 0.2 + vPulse * 0.5);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });

    class Network {
      nodes: any[] = [];
      constructor(formation: number) { this.generate(formation); }
      generate(f: number) {
        this.nodes = [];
        const root = { pos: new THREE.Vector3(0,0,0), level: 0, connections: [] as any[] };
        this.nodes.push(root);

        if (f === 0) { // Sphere
          for(let l=1; l<=4; l++) {
            const count = l * 12;
            for(let i=0; i<count; i++) {
              const phi = Math.acos(1 - 2 * (i+0.5)/count);
              const theta = 2 * Math.PI * i / 1.618;
              const n = { pos: new THREE.Vector3().setFromSphericalCoords(l*6, phi, theta), level: l, connections: [] as any[] };
              this.nodes.push(n);
              const parent = this.nodes[Math.floor(Math.random() * (this.nodes.length-1))];
              parent.connections.push({ node: n, strength: 0.8 });
            }
          }
        } else if (f === 1) { // Helix
          for(let i=0; i<120; i++) {
            const t = i / 120;
            const n = { pos: new THREE.Vector3(Math.cos(t*25)*10, (t-0.5)*40, Math.sin(t*25)*10), level: Math.floor(t*5), connections: [] as any[] };
            this.nodes.push(n);
            if (i > 0) this.nodes[i-1].connections.push({ node: n, strength: 1.0 });
          }
        } else { // Web
          const grow = (p: any, d: number) => {
            if (d > 3) return;
            for(let i=0; i<3; i++) {
              const n = { pos: p.pos.clone().add(new THREE.Vector3(THREE.MathUtils.randFloatSpread(15),THREE.MathUtils.randFloatSpread(15),THREE.MathUtils.randFloatSpread(15))), level: d, connections: [] as any[] };
              this.nodes.push(n); p.connections.push({ node: n, strength: 0.7 });
              grow(n, d+1);
            }
          };
          grow(root, 1);
        }
      }
    }

    let currentNetworkMesh: THREE.Points | null = null;
    let currentConnMesh: THREE.LineSegments | null = null;

    const buildViz = (f: number) => {
      if (currentNetworkMesh) scene.remove(currentNetworkMesh);
      if (currentConnMesh) scene.remove(currentConnMesh);

      const net = new Network(f);
      const nodeGeo = new THREE.BufferGeometry();
      const pos: number[] = [], sizes: number[] = [], colors: number[] = [], dists: number[] = [];
      
      net.nodes.forEach(n => {
        pos.push(n.pos.x, n.pos.y, n.pos.z);
        sizes.push(n.level === 0 ? 2.5 : 1.2);
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
      net.nodes.forEach(n => {
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

    buildViz(0);

    const clock = new THREE.Clock();
    let lastPulse = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      if (!config.paused) {
        pulseUniforms.uTime.value = t;
        stars.material.uniforms.uTime.value = t;
        if (currentNetworkMesh) currentNetworkMesh.rotation.y = t * 0.05;
        if (currentConnMesh) currentConnMesh.rotation.y = t * 0.05;
      }
      controls.update();
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    const triggerPulse = (e: MouseEvent) => {
      const mouse = new THREE.Vector2((e.clientX/window.innerWidth)*2-1, -(e.clientY/window.innerHeight)*2+1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion), 0);
      const intersect = new THREE.Vector3();
      if (ray.ray.intersectPlane(plane, intersect)) {
        const i = lastPulse % 3;
        pulseUniforms.uPulsePositions.value[i].copy(intersect);
        pulseUniforms.uPulseTimes.value[i] = clock.getElapsedTime();
        pulseUniforms.uPulseColors.value[i].copy(palette[Math.floor(Math.random() * palette.length)]);
        lastPulse++;
      }
    };

    window.addEventListener('click', triggerPulse);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    internalRef.current = {
      morph: () => {
        config.currentFormation = (config.currentFormation + 1) % config.numFormations;
        buildViz(config.currentFormation);
      },
      togglePause: () => {
        config.paused = !config.paused;
        controls.autoRotate = !config.paused;
        return config.paused;
      },
      resetCamera: () => controls.reset(),
    };

    return () => {
      window.removeEventListener('click', triggerPulse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-[#050b14]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none"></div>
    </div>
  );
});

export default Background3D;
