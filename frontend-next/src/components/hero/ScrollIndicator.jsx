"use client";

import { motion } from "framer-motion";

/** Animated cue inviting the visitor into the first section. */
function ScrollIndicator({ targetId = "story" }) {
  const scrollToTarget = () => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTarget}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      aria-label="Scroll to content"
      className="flex shrink-0 items-center gap-3 text-white/45 transition-colors hover:text-gold-300"
    >
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1">
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1 rounded-full bg-current"
        />
      </span>

      <span className="text-[10px] uppercase tracking-[4px]">Scroll</span>
    </motion.button>
  );
}

export default ScrollIndicator;
