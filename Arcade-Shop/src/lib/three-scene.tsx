import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";

import { useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Augment React's JSX.IntrinsicElements with the R3F scene primitives so the
// Canvas children type-check against ThreeElements instead of plain HTML.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const ARCADE_COLORS = {
  pink: 0xff006e,
  blue: 0x00d4ff,
  green: 0x39ff14,
  yellow: 0xffea00,
  purple: 0xbc13fe,
};

const GRID_SIZE = 100;
const GRID_DIVISIONS = 50;

export function ArcadeGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (gridRef.current) {
      const positions = gridRef.current.geometry.attributes.position;
      const colors = gridRef.current.geometry.attributes.color;

      if (colors) {
        for (let i = 0; i < colors.count; i++) {
          const hue = (Math.sin(timeRef.current * 0.5 + i * 0.01) + 1) / 2;
          const color = new THREE.Color().setHSL(hue * 0.8 + 0.9, 1, 0.5);
          colors.setXYZ(i, color.r, color.g, color.b);
        }
        colors.needsUpdate = true;
      }
    }
  });

  const grid = useMemo(
    () => new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, 0x000000, 0x000000),
    []
  );

  grid.material.transparent = true;
  grid.material.opacity = 0.1;
  grid.material.color.set(0xff006e);
  grid.position.y = -0.1;
  gridRef.current = grid;

  return <primitive object={grid} />;
}

export function NeonTubes() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.children.forEach((tube, i) => {
        const mesh = tube as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        if (material) {
          const intensity = 0.5 + Math.sin(timeRef.current * 2 + i) * 0.3;
          material.opacity = intensity;
        }
      });
    }
  });

  const tubes = useMemo(() => {
    const group = new THREE.Group();
    const colors = Object.values(ARCADE_COLORS);

    for (let i = 0; i < 8; i++) {
      const radius = 0.3 + Math.random() * 0.2;
      const height = 3 + Math.random() * 4;
      const geometry = new THREE.CylinderGeometry(radius, radius, height, 16, 1, true);
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });

      const tube = new THREE.Mesh(geometry, material);
      tube.position.set(
        (Math.random() - 0.5) * 20,
        height / 2 + Math.random() * 2,
        (Math.random() - 0.5) * 20
      );
      tube.rotation.x = Math.random() * 0.3;
      group.add(tube);
    }

    groupRef.current = group;
    return group;
  }, []);

  return <primitive object={tubes} />;
}

export function PixelParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      const colors = pointsRef.current.geometry.attributes.color;
      const sizes = pointsRef.current.geometry.attributes.size;

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i) - delta * 2;
        positions.setY(i, y < -10 ? 10 + Math.random() * 5 : y);

        const hue = (Math.sin(timeRef.current + i * 0.01) + 1) / 2;
        const color = new THREE.Color().setHSL(hue * 0.8 + 0.9, 1, 0.5);
        colors.setXYZ(i, color.r, color.g, color.b);

        sizes.setX(i, 0.1 + Math.sin(timeRef.current * 3 + i) * 0.05);
      }

      positions.needsUpdate = true;
      colors.needsUpdate = true;
      sizes.needsUpdate = true;
    }
  });

  const particles = useMemo(() => {
    const count = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const hue = Math.random() * 0.8 + 0.9;
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.1 + Math.random() * 0.1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    return points;
  }, []);

  return <primitive object={particles} />;
}

export function ArcadeCabinet() {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.15;
    }
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        const hue = (Math.sin(timeRef.current * 0.5) + 1) / 2;
        material.color.setHSL(hue * 0.8 + 0.9, 1, 0.5);
        material.opacity = 0.8 + Math.sin(timeRef.current * 3) * 0.1;
      }
    }
  });

  const cabinet = useMemo(() => {
    const group = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(3, 5, 3.5);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      roughness: 0.3,
      metalness: 0.1,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 2.5;
    group.add(body);

    const marqueeGeo = new THREE.BoxGeometry(3.2, 1, 0.3);
    const marqueeMat = new THREE.MeshStandardMaterial({
      color: 0xff006e,
      emissive: 0xff006e,
      emissiveIntensity: 0.5,
      roughness: 0,
      metalness: 0,
    });
    const marquee = new THREE.Mesh(marqueeGeo, marqueeMat);
    marquee.position.set(0, 5.5, 1.9);
    group.add(marquee);

    const screenGeo = new THREE.PlaneGeometry(2.4, 1.8);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 3.2, 1.85);
    screenRef.current = screen;
    group.add(screen);

    const controlGeo = new THREE.BoxGeometry(2.5, 0.5, 2);
    const controlMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      roughness: 0.5,
      metalness: 0.2,
    });
    const control = new THREE.Mesh(controlGeo, controlMat);
    control.position.set(0, 0.8, 1.5);
    group.add(control);

    const joystickGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
    const joystickMat = new THREE.MeshStandardMaterial({ color: 0xff006e });
    const joystick = new THREE.Mesh(joystickGeo, joystickMat);
    joystick.position.set(-0.6, 1.2, 1.8);
    group.add(joystick);

    const ballGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xffea00 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(-0.6, 1.7, 1.8);
    group.add(ball);

    const buttonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8);
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0x39ff14 });
    for (let i = 0; i < 4; i++) {
      const btn = new THREE.Mesh(buttonGeo, buttonMat);
      btn.position.set(0.4 + (i % 2) * 0.25, 1.05, 1.7 + Math.floor(i / 2) * 0.25);
      group.add(btn);
    }

    groupRef.current = group;
    return group;
  }, []);

  return <primitive object={cabinet} />;
}

export function CRTShaderMaterial() {
  return (
    <shaderMaterial
      name="CRTShader"
      uniforms={{
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uScanlineIntensity: { value: 0.1 },
        uVignette: { value: 0.3 },
        uCurvature: { value: 0.05 },
        uNoise: { value: 0.02 },
      }}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uScanlineIntensity;
        uniform float uVignette;
        uniform float uCurvature;
        uniform float uNoise;
        varying vec2 vUv;

        float rand(vec2 co) {
          return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5);
          float dist = length(uv - center);
          
          uv = center + (uv - center) * (1.0 + uCurvature * dist * dist);
          
          float scanlines = sin(uv.y * uResolution.y * 0.5 + uTime * 0.1) * uScanlineIntensity;
          
          float vignette = 1.0 - dist * uVignette * 2.0;
          
          float noise = rand(uv * uTime * 10.0) * uNoise;
          
          vec3 color = vec3(0.0, 0.0, 0.0);
          color += scanlines;
          color *= vignette;
          color += noise;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `}
    />
  );
}

export function ArcadeScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 5, 50]} />

      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ff006e" castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[0, 5, 0]} intensity={2} color="#ff006e" distance={30} decay={2} />
      <pointLight position={[5, 3, 5]} intensity={1} color="#00d4ff" distance={20} decay={2} />

      <ArcadeGrid />
      <NeonTubes />
      <PixelParticles />
      <ArcadeCabinet />
    </Canvas>
  );
}

export function Hero3DBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <ArcadeScene />
    </div>
  );
}

function primitive({ object }: { object: THREE.Object3D }) {
  return <primitive object={object} />;
}