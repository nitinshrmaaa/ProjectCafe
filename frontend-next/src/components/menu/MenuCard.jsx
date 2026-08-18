"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Rating from "../ui/Rating";
import { cn, formatPrice } from "../../utils/helpers";
import { EASE } from "../../utils/animations";

function MenuCard({ item, isFavorite = false, onToggleFavorite }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group card-surface flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-glow"
    >
      {/* Portrait crop with a per-photo focal point — most of these cups sit
          low in frame and were being cut in half by a landscape box. */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          style={{ objectPosition: item.focus ?? "center 60%" }}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/20 to-transparent" />

        {item.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.125rem] text-espresso-950">
            {item.badge}
          </span>
        )}

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
            "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300",
            isFavorite
              ? "border-gold-400 bg-gold-400/20 text-gold-300"
              : "border-white/20 bg-black/30 text-white/70 hover:border-gold-400 hover:text-gold-300"
          )}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl leading-tight text-white">
              {item.name}
            </h3>

            <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.1875rem] text-gold-400/80">
              {item.origin}
            </p>
          </div>

          <p className="shrink-0 font-serif text-2xl text-gold-400">
            {formatPrice(item.price)}
          </p>
        </div>

        <Rating value={item.rating} className="mt-4" />

        <p className="mt-4 leading-7 text-white/50">{item.description}</p>

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.125rem] text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default MenuCard;
