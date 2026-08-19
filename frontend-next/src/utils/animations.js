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
 * `amount: "some"` — a threshold of zero — is doing something specific and it
 * is not about the entrance. A repeating `whileInView` does not only animate
 * in, it animates back *out* the moment the element stops counting as in view,
 * and the element goes back to `hidden`, which for every variant here means
 * `opacity: 0`. The threshold therefore decides how much of a block can still
 * be on screen while its contents are invisible.
 *
 * This was 0.35, and on a section taller than the viewport that is a lot of
 * nothing: the story's copy column runs about 970px, so a third of it — some
 * 340px — sat on screen completely blank on the way down to the menu, which
 * read as a hole in the page rather than as an entrance that had finished.
 *
 * At zero the element can only reset once it is genuinely, entirely gone, so
 * anything you can see is drawn. It also puts the re-trigger point past the
 * edge of the screen instead of a third of the way into it, which is the same
 * flicker the old value was raised to avoid — just fixed from the other end.
 */
export const viewportRepeat = { once: false, amount: "some" };

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: EASE } },
};
