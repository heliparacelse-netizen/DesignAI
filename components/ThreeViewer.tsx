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

  const isPremium = false;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b0f19");

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5.5, 4.2, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;

    scene.add(new THREE.AmbientLight("#bcdcff", 0.5));
    const dir = new THREE.DirectionalLight("#ffffff", 0.85);
    dir.position.set(8, 10, 6);
    scene.add(dir);

    // floor + walls
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: "#151c2f", roughness: 0.75, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 4.5),
      new THREE.MeshStandardMaterial({ color: "#111827" })
    );
    backWall.position.set(0, 2.2, -5);
    scene.add(backWall);

    const sideWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 4.5),
      new THREE.MeshStandardMaterial({ color: "#0f172a" })
    );
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.set(-5, 2.2, 0);
    scene.add(sideWall);

    // simple furniture
    const sofa = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1, 1.2),
      new THREE.MeshStandardMaterial({ color: "#7c5cff", roughness: 0.45 })
    );
    sofa.position.set(0.2, 0.6, -2);
    scene.add(sofa);

    const table = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.25, 1),
      new THREE.MeshStandardMaterial({ color: "#2dd4bf", roughness: 0.4 })
    );
    table.position.set(0.8, 0.45, -0.5);
    scene.add(table);

    const cabinet = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.8, 0.55),
      new THREE.MeshStandardMaterial({ color: "#374151" })
    );
    cabinet.position.set(-2.8, 0.9, -3.2);
    scene.add(cabinet);

    const lamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 2.2, 16),
      new THREE.MeshStandardMaterial({ color: "#d1d5db" })
    );
    lamp.position.set(2.7, 1.1, -1.4);
    scene.add(lamp);

    const lampHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 20),
      new THREE.MeshStandardMaterial({ color: "#fef08a", emissive: "#eab308", emissiveIntensity: 0.3 })
    );
    lampHead.position.set(2.7, 2.35, -1.4);
    scene.add(lampHead);

    const floatingAccent = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.35, 0),
      new THREE.MeshStandardMaterial({ color: "#7c5cff", emissive: "#5b4bff", emissiveIntensity: 0.35 })
    );
    floatingAccent.position.set(1.6, 2.2, 1.4);
    scene.add(floatingAccent);

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
      floatingAccent.rotation.y += 0.01;
      floatingAccent.position.y = 2.2 + Math.sin(Date.now() * 0.002) * 0.08;
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (event: MouseEvent) => {
      const tiltX = (event.clientX / window.innerWidth - 0.5) * 0.08;
      const tiltY = (event.clientY / window.innerHeight - 0.5) * 0.08;
      floatingAccent.rotation.x = tiltY;
      floatingAccent.rotation.z = tiltX;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
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
          <span className="rounded-full border border-white/20 px-3 py-1">Room: {selectedRoom}</span>
          <span className="rounded-full border border-white/20 px-3 py-1">Style: {selectedStyle}</span>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onToggleAutoRotate} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/40" type="button">🧭 {autoRotate ? "Auto on" : "Auto off"}</button>
          <button onClick={handleFullscreen} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/40" type="button">⛶ {isFullscreen ? "Exit" : "Fullscreen"}</button>
          <button onClick={handleScreenshot} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/40" type="button">📸 Screenshot</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <p className="font-semibold">Detected furniture</p>
          <ul className="mt-3 space-y-2 text-white/70">
            <li>• Sofa</li>
            <li>• Coffee table</li>
            <li>• Cabinet</li>
            <li>• Floor lamp</li>
            <li>• Accent object</li>
          </ul>
        </aside>

        <div className="relative">
          <div ref={containerRef} className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>

          {!isPremium ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-[#0b0f19]/55 backdrop-blur-[2px]">
              <div className="rounded-2xl border border-white/20 bg-black/40 px-5 py-3 text-sm text-white/85">Premium only · upgrade to unlock interactive viewer</div>
            </div>
          ) : null}
        </div>
      </div>

      {snapshotUrl ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Screenshot saved locally. Preview ready below.
          <img src={snapshotUrl} alt="DesignAI room snapshot" className="mt-3 rounded-2xl border border-white/10" />
        </div>
      ) : null}
    </div>
  );
}
