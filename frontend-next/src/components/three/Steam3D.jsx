"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Wisps of steam rising from a cup.
 * Each puff owns its material so it can fade independently; the animation
 * runs inside the render loop instead of a detached requestAnimationFrame.
 */
function Steam({ position = [0, 0, 0], count = 10, spread = 0.28, height = 1.6 }) {
  const groupRef = useRef();

  const puffs = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: (Math.random() - 0.5) * spread,
        z: (Math.random() - 0.5) * spread,
        y: (index / count) * height,
        speed: 0.18 + Math.random() * 0.22,
        drift: Math.random() * Math.PI * 2,
      })),
    [count, spread, height]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    const time = state.clock.elapsedTime;

    group.children.forEach((puff, index) => {
      const config = puffs[index];

      puff.position.y += config.speed * delta;
      puff.position.x =
        config.x + Math.sin(time * 0.8 + config.drift) * 0.08;

      const life = puff.position.y / height;

      puff.scale.setScalar(0.12 + life * 0.26);
      puff.material.opacity = Math.max(0, 0.28 * (1 - life));

      if (puff.position.y > height) {
        puff.position.y = 0;
        puff.position.z = (Math.random() - 0.5) * spread;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {puffs.map((puff, index) => (
        <mesh
          key={index}
          position={[puff.x, puff.y, puff.z]}
          scale={0.12}
          renderOrder={2}
        >
          <sphereGeometry args={[0.5, 10, 10]} />
          <meshBasicMaterial
            color="#fff8f0"
            transparent
            opacity={0.25}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Steam;
