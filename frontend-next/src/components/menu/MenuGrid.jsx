"use client";

import { AnimatePresence, motion } from "framer-motion";
import MenuCard from "./MenuCard";
import useFavorites from "../../hooks/useFavorites";

function MenuGrid({ items }) {
  const { isFavorite, toggle } = useFavorites();

  if (!items.length) {
    return (
      <p className="py-20 text-center text-white/40">
        Nothing on the menu matches that just yet — try another category.
      </p>
    );
  }

  return (
    <motion.div
      layout
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default MenuGrid;
