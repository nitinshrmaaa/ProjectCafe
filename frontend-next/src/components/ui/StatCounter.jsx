"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

/** Counts up to `value` the first time it scrolls into view. */
function StatCounter({ value, suffix = "", duration = 1600, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  const target = parseFloat(value);
  const decimals = String(value).includes(".") ? 1 : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;

    if (reducedMotion) {
      setDisplay(target);
      return;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      // ease-out so the number settles rather than stopping dead
      setDisplay(target * (1 - Math.pow(1 - progress, 3)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(target) ? value : display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default StatCounter;
