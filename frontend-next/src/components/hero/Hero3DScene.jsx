"use client";

import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import SceneCanvas from "../three/SceneCanvas";
import CoffeeCup from "../three/CoffeeCup3D";
import CoffeeBean from "../three/CoffeeBean3D";
import FloatingBeans from "../three/FloatingBeans3D";
import ParticleField from "../three/ParticleField3D";

/**
 * The hero centrepiece: a slowly turning cup of espresso ringed by beans
 * and drifting dust. Loaded lazily and only on capable, motion-friendly
 * devices — see Hero.jsx.
 */
function Hero3DScene() {
  return (
    <SceneCanvas
      className="absolute inset-0"
      camera={{ position: [0, 1.1, 6.2], fov: 42 }}
      shadows
      fog={[7, 24]}
    >
      <ambientLight color="#fff3e2" intensity={0.55} />

      <directionalLight
        position={[4, 8, 6]}
        color="#fff1dc"
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={24}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Warm key from the left, cool spill from behind for separation */}
      <pointLight position={[-4, 2, 2]} color="#d4a762" intensity={26} distance={14} />
      <pointLight position={[3, 1, -4]} color="#8b5e3c" intensity={18} distance={16} />

      <ParticleField count={200} radius={14} height={10} />

      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <CoffeeCup
          position={[0, -0.35, 0]}
          scale={1.35}
          cupColor="#f4ede2"
          liquidColor="#33190a"
          liquidLevel={0.62}
          foamLevel={0.5}
          spin={0.14}
          bob={false}
        />
      </Float>

      <FloatingBeans count={11} radius={2.9} spread={2.2} />

      <CoffeeBean position={[-3.1, 1.3, -1.6]} scale={0.75} spin={0.3} />
      <CoffeeBean position={[3.2, -0.9, -1.2]} scale={0.6} spin={-0.25} />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* Drag to look around; zoom stays off so the page keeps scrolling. */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </SceneCanvas>
  );
}

export default Hero3DScene;
