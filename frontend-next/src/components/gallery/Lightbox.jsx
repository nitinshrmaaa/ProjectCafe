"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { EASE } from "../../utils/animations";

/**
 * Full-screen image viewer.
 * Arrow keys step through the set, Escape closes, and the backdrop is
 * click-to-dismiss.
 */
function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index != null;
  const item = open ? items[index] : null;

  useLockBodyScroll(open);

  const step = useCallback(
    (delta) => {
      if (index == null) return;

      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso-950/95 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-400"
          >
            <FaTimes />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-400 sm:left-8"
          >
            <FaChevronLeft />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-400 sm:right-8"
          >
            <FaChevronRight />
          </button>

          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
          >
            <Image
              src={item.image}
              alt={item.title}
              sizes="90vw"
              placeholder="blur"
              className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              style={{ height: "auto" }}
            />

            <figcaption className="mt-6 text-center">
              <p className="text-[0.625rem] uppercase tracking-[0.25rem] text-gold-400">
                {item.category}
              </p>

              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                {item.title}
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/50">
                {item.description}
              </p>

              <p className="mt-4 text-xs tracking-[0.1875rem] text-white/30">
                {index + 1} / {items.length}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
