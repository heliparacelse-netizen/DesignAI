"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ViewerSceneProps {
  autoRotate: boolean;
}

function CameraIntro() {
  const { camera } = useThree();
  const ready = useRef(false);

  useFrame(() => {
    if (ready.current) return;

    const target = new THREE.Vector3(4, 2.8, 5.4);
    camera.position.lerp(target, 0.045);
    camera.lookAt(0, 1, 0);

    if (camera.position.distanceTo(target) < 0.04) {
      ready.current = true;
    }
  });

  return null;
}

export default function ViewerScene({ autoRotate }: ViewerSceneProps) {
  const stars = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      x: Math.sin(i * 2.2) * 3,
      y: 0.9 + ((i % 3) * 0.35),
      z: Math.cos(i * 2.2) * 3,
    })),
    []
  );

  return (
    <>
      <color attach="background" args={["#0b0f19"]} />

      <ambientLight intensity={0.45} color="#bcdcff" />
      <directionalLight
        castShadow
        intensity={0.95}
        color="#ffffff"
        position={[5, 8, 4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <CameraIntro />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <circleGeometry args={[8, 64]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={15}
          roughness={0.9}
          depthScale={0.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101726"
          metalness={0.35}
        />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.6}>
        <mesh castShadow position={[0, 1, 0]}>
          <torusKnotGeometry args={[1.1, 0.28, 150, 20]} />
          <meshStandardMaterial
            color="#7c5cff"
            emissive="#5b4bff"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.72}
          />
        </mesh>
      </Float>

      <mesh castShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[1.7, 1.1, 1.7]} />
        <meshStandardMaterial
          color="#2dd4bf"
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>

      {stars.map((star, idx) => (
        <mesh key={`${star.x}-${idx}`} castShadow position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#7c5cff" emissiveIntensity={0.55} />
        </mesh>
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}
