"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Steam from "./Steam3D";

/**
 * Parametric coffee cup — the same geometry renders an espresso, a latte
 * or an iced cold brew depending on the props it is given.
 */
function CoffeeCup({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  cupColor = "#f3ece1",
  liquidColor = "#2a1508",
  liquidLevel = 0.65,
  foamLevel = 0,
  hasHandle = true,
  hasIce = false,
  steam = true,
  spin = 0.12,
  bob = true,
}) {
  const groupRef = useRef();

  const height = 1.5;
  const liquidHeight = height * liquidLevel;
  // Top surface of the drink, in cup-local space.
  const liquidTop = -height / 2 + liquidHeight;

  const iceCubes = useMemo(
    () =>
      hasIce
        ? Array.from({ length: 5 }, () => ({
            x: (Math.random() - 0.5) * 0.55,
            y: liquidTop - Math.random() * 0.45,
            z: (Math.random() - 0.5) * 0.55,
            rotation: [
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ],
          }))
        : [],
    [hasIce, liquidTop]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    group.rotation.y += delta * spin;

    if (bob) {
      group.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Outer wall */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.46, height, 48, 1, true]} />
        <meshPhysicalMaterial
          color={cupColor}
          roughness={0.25}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, -height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.44, 0.06, 48]} />
        <meshPhysicalMaterial
          color={cupColor}
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.8}
        />
      </mesh>

      {/* Drink */}
      <mesh position={[0, -height / 2 + liquidHeight / 2, 0]} receiveShadow>
        <cylinderGeometry
          args={[0.57 * (0.8 + liquidLevel * 0.2), 0.44, liquidHeight, 48]}
        />
        <meshPhysicalMaterial
          color={liquidColor}
          roughness={0.08}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* Crema / milk foam */}
      {foamLevel > 0 && (
        <mesh position={[0, liquidTop + 0.01, 0]} receiveShadow>
          <cylinderGeometry
            args={[0.565, 0.55, Math.max(foamLevel * 0.22, 0.04), 48]}
          />
          <meshPhysicalMaterial
            color="#f0e2cb"
            roughness={0.75}
            metalness={0}
            clearcoat={0.3}
          />
        </mesh>
      )}

      {iceCubes.map((cube, index) => (
        <mesh
          key={index}
          position={[cube.x, cube.y, cube.z]}
          rotation={cube.rotation}
          castShadow
        >
          <boxGeometry args={[0.17, 0.17, 0.17]} />
          <meshPhysicalMaterial
            color="#eaf6ff"
            roughness={0.05}
            metalness={0}
            transmission={0.9}
            thickness={0.2}
            ior={1.31}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* Rim */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <torusGeometry args={[0.6, 0.035, 16, 48]} />
        <meshPhysicalMaterial
          color={cupColor}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
        />
      </mesh>

      {hasHandle && (
        <mesh
          position={[0.68, 0.02, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <torusGeometry args={[0.28, 0.055, 16, 40, Math.PI * 1.1]} />
          <meshPhysicalMaterial
            color={cupColor}
            roughness={0.25}
            metalness={0.05}
            clearcoat={1}
          />
        </mesh>
      )}

      {/* Saucer */}
      <mesh position={[0, -height / 2 - 0.06, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.95, 0.85, 0.06, 48]} />
        <meshPhysicalMaterial
          color={cupColor}
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.9}
        />
      </mesh>

      {steam && !hasIce && (
        <Steam position={[0, liquidTop + 0.15, 0]} count={9} />
      )}
    </group>
  );
}

export default CoffeeCup;
