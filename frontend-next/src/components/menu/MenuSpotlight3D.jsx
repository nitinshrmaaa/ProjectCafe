"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import SceneCanvas from "../three/SceneCanvas";
import CoffeeCup from "../three/CoffeeCup3D";
import Pastry from "../three/Pastry3D";
import ParticleField from "../three/ParticleField3D";

const PLINTH_Y = -1.42;

/**
 * A single item on a lit plinth, rendered over the CSS studio backdrop —
 * the canvas itself is transparent so the two blend.
 */
function MenuSpotlight3D({ item }) {
  const cup = item?.cup ?? {};

  return (
    <SceneCanvas
      camera={{ position: [0, 1.45, 4.6], fov: 38 }}
      shadows
      transparent
      fog={null}
    >
      <ambientLight color="#fff3e2" intensity={0.75} />

      {/* Key light from front-right, rim light from behind */}
      <spotLight
        position={[3.2, 5.5, 3.4]}
        angle={0.55}
        penumbra={0.9}
        intensity={110}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight position={[-3, 1.8, 2.2]} color="#d4a762" intensity={26} distance={12} />
      <pointLight position={[0, 1.2, -3.4]} color="#c08f4a" intensity={30} distance={12} />

      <ParticleField count={60} radius={5} height={5} size={0.045} />

      {item?.model ? (
        <Pastry
          key={item.id}
          model={item.model}
          position={[0, -0.25, 0]}
          scale={1.2}
        />
      ) : (
        <CoffeeCup
          key={item?.id}
          position={[0, -0.2, 0]}
          scale={1.1}
          spin={0.25}
          bob
          {...cup}
        />
      )}

      <ContactShadows
        position={[0, PLINTH_Y + 0.07, 0]}
        opacity={0.65}
        scale={7}
        blur={2.2}
        far={3}
      />

      {/* Plinth */}
      <mesh position={[0, PLINTH_Y, 0]} receiveShadow>
        <cylinderGeometry args={[1.75, 1.85, 0.14, 64]} />
        <meshStandardMaterial color="#17120f" roughness={0.45} metalness={0.55} />
      </mesh>

      {/* Gold inlay around the plinth edge */}
      <mesh position={[0, PLINTH_Y + 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.72, 64]} />
        <meshStandardMaterial
          color="#d4a762"
          roughness={0.3}
          metalness={0.9}
          emissive="#7a552c"
          emissiveIntensity={0.35}
        />
      </mesh>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.15}
      />
    </SceneCanvas>
  );
}

export default MenuSpotlight3D;
