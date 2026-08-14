"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { cn } from "../../utils/helpers";

/**
 * Shared WebGL host.
 *
 * Off-screen canvases drop to "demand", which keeps the scene painted but
 * stops the animation loop. Never use "never" here: R3F does not draw a
 * first frame in that mode, so the canvas would come up blank until the
 * viewport observer fired.
 */
function SceneCanvas({
  children,
  className,
  camera = { position: [0, 1, 6], fov: 45 },
  dpr = [1, 1.75],
  background = "#0a0908",
  transparent = false,
  fog = [8, 26],
  ...rest
}) {
  const wrapperRef = useRef(null);
  const inView = useInView(wrapperRef, { amount: 0.05 });

  return (
    <div ref={wrapperRef} className={cn("h-full w-full", className)}>
      <Canvas
        camera={camera}
        dpr={dpr}
        frameloop={inView ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: transparent,
          powerPreference: "high-performance",
        }}
        style={{ outline: "none", touchAction: "pan-y" }}
        {...rest}
      >
        {!transparent && <color attach="background" args={[background]} />}

        {fog && <fog attach="fog" args={[background, fog[0], fog[1]]} />}

        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

export default SceneCanvas;
