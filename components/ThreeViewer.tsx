"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ThreeViewerProps {
  selectedRoom: string;
  selectedStyle: string;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export default function ThreeViewer({
  selectedRoom,
  selectedStyle,
  autoRotate,
  onToggleAutoRotate,
}: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b0f19");

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 3, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;

    const ambientLight = new THREE.AmbientLight("#bcdcff", 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.8);
    directionalLight.position.set(5, 8, 4);
    scene.add(directionalLight);

    const floorGeometry = new THREE.CircleGeometry(6, 32);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#111827",
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const ringGeometry = new THREE.TorusGeometry(2.2, 0.3, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#7c5cff",
      emissive: "#5b4bff",
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.7,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = 1.2;
    scene.add(ring);

    const cubeGeometry = new THREE.BoxGeometry(1.8, 1.2, 1.8);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: "#2dd4bf",
      roughness: 0.2,
      metalness: 0.6,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0.8, 0);
    scene.add(cube);

    const pointsGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const pointsMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      emissive: "#7c5cff",
      emissiveIntensity: 0.6,
    });

    const points = Array.from({ length: 8 }).map((_, index) => {
      const mesh = new THREE.Mesh(pointsGeometry, pointsMaterial);
      mesh.position.set(
        Math.sin(index) * 3,
        1 + Math.cos(index) * 0.4,
        Math.cos(index) * 3
      );
      scene.add(mesh);
      return mesh;
    });

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });

    resizeObserver.observe(containerRef.current);

    let animationFrameId: number;

    const animate = () => {
      controls.autoRotate = autoRotate;
      ring.rotation.y += 0.004;
      cube.rotation.y += 0.002;
      points.forEach((point, index) => {
        point.position.y = 1 + Math.sin(Date.now() * 0.001 + index) * 0.2;
      });
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [autoRotate]);

  useEffect(() => {
    setSnapshotUrl(null);
  }, [selectedRoom, selectedStyle]);

  const handleScreenshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL("image/png");
    setSnapshotUrl(dataUrl);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "designai-room.png";
    link.click();
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/20 px-3 py-1">
            Room: {selectedRoom}
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1">
            Style: {selectedStyle}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onToggleAutoRotate}
            className="rounded-full border border-white/20 px-3 py-1"
          >
            {autoRotate ? "Auto-rotation on" : "Auto-rotation off"}
          </button>
          <button
            onClick={handleFullscreen}
            className="rounded-full border border-white/20 px-3 py-1"
          >
            {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
          <button
            onClick={handleScreenshot}
            className="rounded-full border border-white/20 px-3 py-1"
          >
            Screenshot
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
          Orbit · Zoom · Pan
        </div>
      </div>

      {snapshotUrl ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Screenshot saved locally. Preview ready below.
          <img
            src={snapshotUrl}
            alt="DesignAI room snapshot"
            className="mt-3 rounded-2xl border border-white/10"
          />
        </div>
      ) : null}
    </div>
  );
}
