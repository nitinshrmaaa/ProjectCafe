"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { cn, formatPrice } from "../../utils/helpers";
import { EASE } from "../../utils/animations";

/**
 * One line of the menu board: photograph, name, leader dots, price and a
 * single line of description. Tags and origin are deliberately left out —
 * they belong to the filters and the signature cards, not to every row.
 */
function MenuListRow({ item, isFavorite = false, onToggleFavorite }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group flex items-start gap-6 border-b border-white/[0.05] py-6"
    >
      <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          style={{ objectPosition: item.focus ?? "center 60%" }}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite?.(item.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${item.name} from favourites`
              : `Save ${item.name} to favourites`
          }
          className={cn(
            "absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-espresso-950/70 text-[11px] backdrop-blur-md transition-all duration-300",
            isFavorite
              ? "text-gold-400 opacity-100"
              : "text-white/70 opacity-0 hover:text-gold-300 group-hover:opacity-100 focus-visible:opacity-100"
          )}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-serif text-xl leading-snug text-white">
            {item.name}
          </h4>

          {/* Leader dots */}
          <span
            className="h-px min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-white/20"
            aria-hidden="true"
          />

          <span className="shrink-0 font-serif text-xl text-gold-400">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-white/40">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default MenuListRow;
