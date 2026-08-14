"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Drifting dust motes rendered as a single Points object.
 * One draw call for the whole field — the previous implementation created
 * hundreds of individual meshes, which is what made the hero stutter.
 */
function ParticleField({
  count = 220,
  radius = 16,
  height = 12,
  color = "#d4a762",
  size = 0.07,
  speed = 0.35,
}) {
  const pointsRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * radius * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
      velocities[i] = 0.25 + Math.random() * 0.75;
    }

    return { positions, velocities };
  }, [count, radius, height]);

  useFrame((_, delta) => {
    const points = pointsRef.current;

    if (!points) return;

    const attribute = points.geometry.attributes.position;
    const half = height / 2;

    for (let i = 0; i < count; i += 1) {
      const y = attribute.array[i * 3 + 1] + velocities[i] * speed * delta;

      attribute.array[i * 3 + 1] = y > half ? -half : y;
    }

    attribute.needsUpdate = true;
    points.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default ParticleField;
