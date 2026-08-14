"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../utils/animations";

/**
 * Wraps content in a scroll-triggered entrance.
 * `delay` staggers siblings without needing a variants parent.
 */
function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
