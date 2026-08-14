"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

/**
 * Course selector for the menu board.
 * Set as type, not as buttons: the count sits in superscript like a menu
 * footnote, and a single gold rule slides between the active course.
 */
function CategoryTabs({ categories, active, onChange, counts = {} }) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="-mx-1 flex items-center gap-6 overflow-x-auto px-1 sm:gap-8"
    >
      {categories.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className="group relative shrink-0 py-3"
          >
            <span
              className={cn(
                "font-serif text-[15px] tracking-wide transition-colors duration-300 sm:text-base",
                isActive
                  ? "text-gold-300"
                  : "text-white/55 group-hover:text-white"
              )}
            >
              {category}
            </span>

            {counts[category] != null && (
              <sup
                className={cn(
                  "ml-1.5 font-serif text-[10px] transition-colors duration-300",
                  isActive ? "text-gold-400" : "text-white/25"
                )}
              >
                {counts[category]}
              </sup>
            )}

            {isActive && (
              <motion.span
                layoutId="menu-course-underline"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-x-0 -bottom-px h-px bg-gold-400"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
