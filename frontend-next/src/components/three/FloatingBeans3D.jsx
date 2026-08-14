"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/** Coffee beans orbiting the centrepiece on lazy, offset rings. */
function FloatingBeans({ count = 10, radius = 2.6, spread = 1.4 }) {
  const groupRef = useRef();

  const beans = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        angle: (index / count) * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.16,
        radius: radius + (Math.random() - 0.5) * 0.9,
        height: (Math.random() - 0.5) * spread,
        scale: 0.16 + Math.random() * 0.12,
        tilt: Math.random() * Math.PI,
      })),
    [count, radius, spread]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    const time = state.clock.elapsedTime;

    group.children.forEach((bean, index) => {
      const config = beans[index];
      const angle = config.angle + time * config.speed;

      bean.position.set(
        Math.cos(angle) * config.radius,
        config.height + Math.sin(time * 0.9 + index) * 0.18,
        Math.sin(angle) * config.radius
      );

      bean.rotation.x += delta * 0.5;
      bean.rotation.y += delta * 0.35;
    });
  });

  return (
    <group ref={groupRef}>
      {beans.map((bean, index) => (
        <mesh
          key={index}
          castShadow
          scale={[bean.scale, bean.scale * 0.78, bean.scale * 0.72]}
          rotation={[bean.tilt, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 12]} />
          <meshPhysicalMaterial
            color="#2a170d"
            roughness={0.5}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default FloatingBeans;
