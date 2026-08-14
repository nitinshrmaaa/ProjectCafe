"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Croissant() {
  return (
    <group rotation={[-Math.PI / 2.6, 0, 0.2]} scale={0.95}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.17, 18, 40, Math.PI * 1.45]} />
        <meshPhysicalMaterial
          color="#c98f4e"
          roughness={0.55}
          clearcoat={0.35}
          clearcoatRoughness={0.5}
        />
      </mesh>

      {/* Laminated layers, slightly paler than the crust */}
      {[0.07, -0.07].map((offset) => (
        <mesh key={offset} position={[0, 0, offset]} castShadow>
          <torusGeometry args={[0.55, 0.13, 16, 36, Math.PI * 1.4]} />
          <meshPhysicalMaterial color="#e0b477" roughness={0.65} />
        </mesh>
      ))}

      {/* Tapered tips */}
      {[
        [0.58, -0.28, 0],
        [-0.58, -0.28, 0],
      ].map(([x, y, z]) => (
        <mesh key={x} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshPhysicalMaterial color="#b87d3f" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Cheesecake({ color = "#f2e2c6", toppingColor = "#c86a4a" }) {
  return (
    <group>
      {/* Biscuit base */}
      <mesh position={[0, -0.36, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.7, 0.22, 40]} />
        <meshStandardMaterial color="#8b6239" roughness={0.75} />
      </mesh>

      {/* Set filling */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.72, 0.42, 40]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.45}
          clearcoat={0.25}
          clearcoatRoughness={0.5}
        />
      </mesh>

      {/* Burnt top */}
      <mesh position={[0, 0.17, 0]} castShadow>
        <cylinderGeometry args={[0.69, 0.7, 0.06, 40]} />
        <meshPhysicalMaterial color={toppingColor} roughness={0.4} clearcoat={0.5} />
      </mesh>

      {/* Berry */}
      <mesh position={[0.16, 0.26, 0.05]} castShadow>
        <sphereGeometry args={[0.11, 16, 14]} />
        <meshPhysicalMaterial color="#8e2f3f" roughness={0.3} clearcoat={1} />
      </mesh>

      {/* Plate */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 0.95, 0.06, 48]} />
        <meshPhysicalMaterial color="#f4ede2" roughness={0.3} clearcoat={0.9} />
      </mesh>
    </group>
  );
}

const MODELS = {
  croissant: Croissant,
  cheesecake: Cheesecake,
};

/** Wraps a pastry model in the same gentle turn the cups use. */
function Pastry({ model = "croissant", position = [0, 0, 0], scale = 1, spin = 0.2 }) {
  const groupRef = useRef();
  const Model = MODELS[model] ?? Croissant;

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    group.rotation.y += delta * spin;
    group.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Model />
    </group>
  );
}

export { Croissant, Cheesecake };
export default Pastry;
