"use client";

import { AnimatePresence, motion } from "framer-motion";
import GalleryCard from "./GalleryCard";

/** Mosaic layout; each item carries its own column/row span. */
function GalleryGrid({ items, onOpen }) {
  return (
    <motion.div
      layout
      className="grid auto-rows-[13.75rem] grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[16.25rem] lg:grid-cols-12 lg:auto-rows-[17.5rem]"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            className={item.span ?? "lg:col-span-4"}
          >
            <GalleryCard item={item} onOpen={() => onOpen(index)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default GalleryGrid;
