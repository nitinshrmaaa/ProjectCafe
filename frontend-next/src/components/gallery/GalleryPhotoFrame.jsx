"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const WIDTH = 2.4;
const HEIGHT = 1.6;

/**
 * A framed photograph hanging on the gallery wall.
 * The texture is the real gallery image, not a flat placeholder colour.
 */
function GalleryPhotoFrame({ item, position, rotation, onSelect, isActive }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Static imports are objects in Next — drei needs the URL string.
  const texture = useTexture(item.image.src ?? item.image);

  // Never leave the pointer cursor behind if the scene unmounts on hover.
  useEffect(() => () => {
    document.body.style.cursor = "auto";
  }, []);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) return;

    // Ease towards the lifted state instead of snapping.
    const target = hovered || isActive ? 1.08 : 1;

    group.scale.lerp(new THREE.Vector3(target, target, target), delta * 6);

    group.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.04 +
      (hovered || isActive ? 0.12 : 0);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(item);
      }}
    >
      {/* Gilded frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH + 0.16, HEIGHT + 0.16, 0.08]} />
        <meshStandardMaterial
          color={hovered || isActive ? "#e6c489" : "#a97f45"}
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* Mount */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[WIDTH + 0.02, HEIGHT + 0.02]} />
        <meshStandardMaterial color="#0d0b0a" roughness={0.9} />
      </mesh>

      {/* Photograph */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Picture light — a warm wash from just above the frame */}
      <pointLight
        position={[0, HEIGHT / 2 + 0.55, 0.85]}
        intensity={hovered || isActive ? 14 : 7}
        distance={4.5}
        decay={2}
        color="#fff1dc"
      />
    </group>
  );
}

export default GalleryPhotoFrame;
