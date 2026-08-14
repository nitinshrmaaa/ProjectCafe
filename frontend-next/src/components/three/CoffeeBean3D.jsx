"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/** A single roasted bean: rounded body with the signature centre crease. */
function CoffeeBean({
  position = [0, 0, 0],
  scale = 1,
  spin = 0.4,
  color = "#2a170d",
}) {
  const beanRef = useRef();

  useFrame((state, delta) => {
    const bean = beanRef.current;

    if (!bean) return;

    bean.rotation.y += delta * spin;
    bean.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
  });

  return (
    <group ref={beanRef} position={position} scale={scale}>
      <mesh castShadow receiveShadow scale={[1, 0.78, 0.72]}>
        <sphereGeometry args={[0.5, 32, 24]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.45}
          metalness={0.05}
          clearcoat={0.7}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* Crease, cut slightly into the body on both faces */}
      {[0.355, -0.355].map((z) => (
        <mesh key={z} position={[0, 0, z]} scale={[1, 0.7, 1]}>
          <capsuleGeometry args={[0.045, 0.62, 6, 12]} />
          <meshStandardMaterial color="#120a05" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default CoffeeBean;
