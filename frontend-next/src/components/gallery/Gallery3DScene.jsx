"use client";

import { useMemo, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import SceneCanvas from "../three/SceneCanvas";
import GalleryPhotoFrame from "./GalleryPhotoFrame";
import ParticleField from "../three/ParticleField3D";

const RADIUS = 7.2;
const ARC = Math.PI * 0.78;

/**
 * The photographs hung on a curved wall you can walk around by dragging.
 * Selecting a frame surfaces its caption beneath the canvas.
 */
function Gallery3DScene({ items }) {
  const [active, setActive] = useState(null);

  // Spread the frames evenly across the arc, alternating hanging heights.
  const placements = useMemo(
    () =>
      items.map((item, index) => {
        const t = items.length === 1 ? 0.5 : index / (items.length - 1);
        const angle = -ARC / 2 + t * ARC;

        return {
          item,
          position: [
            Math.sin(angle) * RADIUS,
            index % 2 === 0 ? 0.45 : -0.35,
            -Math.cos(angle) * RADIUS,
          ],
          rotation: [0, angle, 0],
        };
      }),
    [items]
  );

  return (
    <div className="relative h-full w-full">
      <SceneCanvas
        camera={{ position: [0, 0.8, 3.4], fov: 55 }}
        shadows
        fog={[9, 22]}
      >
        <ambientLight color="#fff3e2" intensity={0.35} />
        <hemisphereLight args={["#3a2a1c", "#0a0908", 0.6]} />

        <pointLight position={[0, 5, 0]} color="#d4a762" intensity={40} distance={22} />

        <ParticleField count={110} radius={9} height={7} size={0.05} />

        {placements.map(({ item, position, rotation }) => (
          <GalleryPhotoFrame
            key={item.id}
            item={item}
            position={position}
            rotation={rotation}
            isActive={active?.id === item.id}
            onSelect={setActive}
          />
        ))}

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
          <circleGeometry args={[16, 64]} />
          <meshStandardMaterial color="#0d0b0a" roughness={0.55} metalness={0.35} />
        </mesh>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          autoRotate={!active}
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.95}
        />
      </SceneCanvas>

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-6">
        <div className="max-w-lg rounded-2xl border border-white/10 bg-espresso-950/85 px-6 py-4 text-center backdrop-blur-md">
          {active ? (
            <>
              <p className="text-[10px] uppercase tracking-[4px] text-gold-400">
                {active.category}
              </p>

              <h3 className="mt-1.5 font-serif text-xl text-white">
                {active.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/50">
                {active.description}
              </p>
            </>
          ) : (
            <p className="text-xs uppercase tracking-[4px] text-white/40">
              Drag to look around · click a photograph
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery3DScene;
