/**
 * Shared Framer Motion variants.
 * Keeping them in one place means every section enters the viewport
 * with the same timing curve, which is what makes the page feel composed.
 */

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Parent wrapper that releases its children one after another. */
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Sensible default for `whileInView` sections. */
export const viewportOnce = { once: true, amount: 0.2 };

/**
 * Replays every time the element enters the viewport rather than only on the
 * first pass. For sections that should present themselves on each visit —
 * scroll away and back and they open again, the way they did on load.
 *
 * `amount` is higher than the once-only default: at 0.2 a tall section
 * re-triggers while most of it is still on screen, which reads as a flicker
 * instead of an entrance.
 */
export const viewportRepeat = { once: false, amount: 0.35 };

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: EASE } },
};
