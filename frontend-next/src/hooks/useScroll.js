"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the page has scrolled past `threshold`, and nothing else.
 *
 * This exists because the header only ever needed a boolean and was being
 * handed a live scroll position instead. `useScroll` sets state on every
 * animation frame of every scroll — a new object each time, so React re-ran
 * the whole navbar sixty times a second while the page moved, and the navbar
 * paints behind a `backdrop-blur-xl`, which is the most expensive thing on the
 * page to repaint. The bar's appearance changes exactly twice in a session:
 * once on the way past 30px and once on the way back. So it subscribes to a
 * boolean, and re-renders twice instead of thousands of times.
 */
export function useScrolledPast(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      // The setter is called on every frame, but React bails out of a render
      // when the next state is identical, so a boolean that has not flipped
      // costs nothing beyond the comparison.
      setScrolled(window.scrollY > threshold);
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

  return scrolled;
}

/**
 * Tracks vertical scroll position, direction and page progress.
 *
 * Reads are batched into an animation frame, and — the part that matters —
 * only published when something a consumer can actually see has changed.
 * Position is quantised to 8px and progress to whole percent, so a full scroll
 * of a long page emits on the order of a hundred updates rather than one per
 * frame for as long as the page is moving. Neither step is visible: 8px is
 * under the radius of the control this drives, and its progress ring is 48px
 * across, where one percent is a third of a degree.
 *
 * Prefer `useScrolledPast` if all you need is "has it moved" — it is a boolean
 * and it re-renders twice.
 */
export function useScroll(threshold = 40) {
  const [state, setState] = useState({
    y: 0,
    progress: 0,
    scrolled: false,
    direction: "up",
  });

  // Compared against rather than rendered, so it can be a ref: the whole point
  // is to decide *not* to render.
  const published = useRef(state);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;

      const y = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(y / height, 1) : 0;

      const next = {
        y: Math.round(y / 8) * 8,
        progress: Math.round(progress * 100) / 100,
        scrolled: y > threshold,
        direction: y > lastY && y > threshold ? "down" : "up",
      };

      lastY = y;

      const previous = published.current;

      if (
        next.y === previous.y &&
        next.progress === previous.progress &&
        next.scrolled === previous.scrolled &&
        next.direction === previous.direction
      ) {
        return;
      }

      published.current = next;
      setState(next);
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

    let ticking = false;

    // `offsetTop` forces the browser to flush layout, so this must never run
    // straight off the scroll event — one read per frame at most, and only
    // when the answer has actually changed.
    const update = () => {
      ticking = false;

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (element && window.scrollY >= element.offsetTop - offset) {
          current = id;
        }
      }

      setActive(current);
    };

    const handler = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handler, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handler);
  }, [sectionIds, offset]);

  return active;
}

export default useScroll;
