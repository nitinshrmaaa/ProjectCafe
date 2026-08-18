"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { cn, formatPrice } from "../../utils/helpers";
import { scaleIn } from "../../utils/animations";

/**
 * The home page's featured item.
 *
 * Landscape rather than portrait: the photograph runs down the left edge and
 * the line of the menu — name, leader dots, price — down the right. Six of the
 * portrait cards the menu board uses stood about two viewports tall between
 * them, which is what stopped this screen from holding one; six of these sit
 * in a 2×3 block that does.
 *
 * The card takes whatever height its grid row is given rather than its own, so
 * on a tall display the photograph grows with the row instead of leaving the
 * card floating in a half-empty cell. The menu route keeps MenuCard.
 */
function MenuFeatureCard({ item, isFavorite = false, onToggleFavorite }) {
  return (
    <motion.article
      variants={scaleIn}
      className="group card-surface flex h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-glow"
    >
      {/* Narrow again between 1024px and 1280px: that is where the grid first
          goes two-up, so the card is at its tightest there and the picture has
          to give the name and the price room to stay on one line. */}
      <div className="relative w-24 shrink-0 overflow-hidden sm:w-32 xl:w-44">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 6rem, (max-width: 1280px) 8rem, 11rem"
          placeholder="blur"
          style={{ objectPosition: item.focus ?? "center 60%" }}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Feathers the photograph into the panel beside it, so the card reads
            as one surface rather than a picture set next to a block of type. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-espresso-950/70"
          aria-hidden="true"
        />

        {/* On the picture, not over the type — the right-hand column is a
            single line from the name to the price and a control sitting in it
            would break the leader dots. */}
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
            "absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300",
            isFavorite
              ? "border-gold-400 bg-gold-400/20 text-gold-300"
              : "border-white/20 bg-black/30 text-white/70 opacity-0 hover:border-gold-400 hover:text-gold-300 group-hover:opacity-100 focus-visible:opacity-100"
          )}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-4 sm:p-5 xl:p-6">
        <div className="flex items-baseline justify-between gap-3">
          {/* Wraps rather than truncates. A menu that clips its own item names
              is worse than one whose longest name takes two lines, and the
              price stays put on the first baseline either way. */}
          <h3 className="min-w-0 font-serif text-lg leading-snug text-white sm:text-xl xl:text-2xl">
            {item.name}
          </h3>

          {/* Leader dots, the same device the menu board's rows use. Dropped on
              the narrowest screens, where the line only has room for the two
              things that matter. */}
          <span
            className="hidden h-px min-w-6 flex-1 -translate-y-1 border-b border-dotted border-white/20 sm:block"
            aria-hidden="true"
          />

          <span className="shrink-0 font-serif text-lg text-gold-400 sm:text-xl xl:text-2xl">
            {formatPrice(item.price)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[0.625rem] uppercase tracking-[0.1875rem] text-gold-400/75">
            {item.origin}
          </p>

          {item.badge && (
            <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.125rem] text-gold-300">
              {item.badge}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-white/45">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default MenuFeatureCard;
