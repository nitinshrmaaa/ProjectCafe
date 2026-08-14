"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import useScroll from "../../hooks/useScroll";

/** Floating scroll-to-top control with a progress ring. */
function BackToTop() {
  const { y, progress } = useScroll();
  const visible = y > 600;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-7 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-espresso-800/90 text-gold-400 backdrop-blur-md transition-colors hover:bg-gold-400 hover:text-espresso-950"
          style={{
            backgroundImage: `conic-gradient(var(--color-gold-400) ${
              progress * 360
            }deg, transparent 0deg)`,
          }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-espresso-800/95 transition-colors hover:bg-transparent">
            <FaArrowUp />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
