"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaExpand } from "react-icons/fa";
import { EASE } from "../../utils/animations";
import { cn } from "../../utils/helpers";

function GalleryCard({ item, onOpen, className }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      onClick={onOpen}
      aria-label={`View ${item.title} full size`}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-3xl border border-white/8",
        className
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        placeholder="blur"
        style={item.focus ? { objectPosition: item.focus } : undefined}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <FaExpand className="text-sm" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 text-left">
        <p className="text-[0.625rem] uppercase tracking-[0.25rem] text-gold-400">
          {item.category}
        </p>

        <h3 className="mt-2 font-serif text-2xl text-white sm:text-[1.75rem]">
          {item.title}
        </h3>

        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
          {item.description}
        </p>
      </div>
    </motion.button>
  );
}

export default GalleryCard;
