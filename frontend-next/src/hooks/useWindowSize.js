"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

/** Viewport size plus the breakpoint flags the 3D scenes switch on. */
export function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: typeof window === "undefined" ? 800 : window.innerHeight,
  }));

  useEffect(() => {
    let frame = 0;

    const onResize = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() =>
        setSize({ width: window.innerWidth, height: window.innerHeight })
      );
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return {
    ...size,
    isMobile: size.width < MOBILE_BREAKPOINT,
    isTablet: size.width >= MOBILE_BREAKPOINT && size.width < TABLET_BREAKPOINT,
    isDesktop: size.width >= TABLET_BREAKPOINT,
  };
}

export default useWindowSize;
