"use client";

import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll position, direction and page progress.
 * Reads are batched into an animation frame so the listener stays cheap.
 */
export function useScroll(threshold = 40) {
  const [state, setState] = useState({
    y: 0,
    progress: 0,
    scrolled: false,
    direction: "up",
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setState({
        y,
        progress: height > 0 ? Math.min(y / height, 1) : 0,
        scrolled: y > threshold,
        direction: y > lastY && y > threshold ? "down" : "up",
      });

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}

/**
 * Returns the id of the section currently under the top of the viewport.
 * Used by the one-page navigation on the home route.
 */
export function useActiveSection(sectionIds = [], offset = 140) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const handler = () => {
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (element && window.scrollY >= element.offsetTop - offset) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();

    return () => window.removeEventListener("scroll", handler);
  }, [sectionIds, offset]);

  return active;
}

export default useScroll;
