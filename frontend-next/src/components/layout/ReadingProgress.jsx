"use client";

import useScroll from "../../hooks/useScroll";

/**
 * The hairline under the header that fills as the page is read.
 *
 * A component of its own for one reason: it is the only thing in the header
 * that changes while you scroll. Left inline, its scroll subscription belonged
 * to the navbar, so every step of the bar re-rendered the wordmark, the
 * opening-hours badge, the whole link list and the menu button — behind a
 * `backdrop-blur-xl`, sixty times a second. Isolated, the re-render is one
 * empty div with a transform on it, and React never touches the rest of the
 * header.
 *
 * `scaleX` on an already-composited layer, so the fill is a compositor
 * operation and never lays the page out again.
 */
function ReadingProgress() {
  const { progress } = useScroll();

  return (
    <div
      className="h-px origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 transition-transform duration-150"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

export default ReadingProgress;
