"use client";

import { useEffect } from "react";

/**
 * Freezes background scrolling while a drawer or lightbox is open.
 * Uses a data attribute so nested consumers cannot clobber each other's
 * inline styles.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - body.clientWidth;

    body.dataset.scrollLocked = "true";

    // Compensate for the disappearing scrollbar so the page does not jump.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      delete body.dataset.scrollLocked;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}

export default useLockBodyScroll;
