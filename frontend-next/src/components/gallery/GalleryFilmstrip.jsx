"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaExpand } from "react-icons/fa";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn } from "../../utils/helpers";
import { fadeUp, viewportRepeat } from "../../utils/animations";

/**
 * The home page's photographs, on a strip that slides.
 *
 * It replaces a mosaic that was the story screen's collage a second time —
 * both were bordered, rounded frames tiled into a grid, one screen apart, and
 * two blocks built from the same recipe read as the page repeating itself
 * rather than as two sections. So this one is the opposite of that collage on
 * every axis that matters: portrait rather than landscape, one continuous line
 * rather than a tiled block, moving rather than still, and running off both
 * edges of the screen rather than sitting inside the column everything else
 * lines up to.
 *
 * Full-bleed is also what makes it immune to the wide-screen problem the rest
 * of the page needed two breakpoints to solve. A strip has no width to fill:
 * it is as long as it needs to be and the display simply shows more of it, so
 * a 2560 monitor gets more photographs rather than wider gutters. Nothing here
 * is capped, which is the point.
 *
 * The loop is two passes of the same set translated by exactly half, so the
 * seam lands where the second pass starts and there is no jump to hide. The
 * duplicate pass is inert to assistive tech and to the keyboard — it is the
 * same eight photographs, and announcing or tabbing through them twice would
 * be a bug rather than a feature.
 */

const FRAME =
  "group relative block shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 " +
  "h-[19rem] w-[14rem] sm:h-[22rem] sm:w-[16.5rem] lg:h-[25rem] lg:w-[18.5rem] " +
  "3xl:h-[31rem] 3xl:w-[23rem] 4xl:h-[35rem] 4xl:w-[26rem]";

/* Frames enter and leave rather than being cut off at the edge of the screen. */
const EDGE_FADE =
  "[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] " +
  "[-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]";

function GalleryFilmstrip({ items, onOpen, className }) {
  const reducedMotion = useReducedMotion();

  // Under reduced motion the strip stops travelling and becomes an ordinary
  // scroller the visitor pushes themselves — one pass, since a duplicate set
  // only exists to hide the seam of a loop that is no longer running.
  const passes = reducedMotion ? [0] : [0, 1];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      className={cn("relative", className)}
    >
      <div className={EDGE_FADE}>
        <div
          className={cn(
            "flex w-max gap-5 lg:gap-7 3xl:gap-8",
            reducedMotion
              ? "w-full snap-x snap-mandatory overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "animate-marquee hover:[animation-play-state:paused]"
          )}
        >
          {passes.map((pass) =>
            items.map((item, index) => {
              const ghost = pass === 1;

              return (
                <button
                  key={`${pass}-${item.id}`}
                  type="button"
                  onClick={() => onOpen(index)}
                  aria-hidden={ghost || undefined}
                  tabIndex={ghost ? -1 : undefined}
                  aria-label={`View ${item.title} full size`}
                  className={cn(FRAME, reducedMotion && "snap-start")}
                >
                  <Image
                    src={item.image}
                    alt={ghost ? "" : item.title}
                    fill
                    sizes="(max-width: 640px) 14rem, (max-width: 1024px) 16.5rem, 23rem"
                    placeholder="blur"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />

                  {/* Deep at the foot so the caption has something to sit on,
                      clear at the top so the photograph is still the subject. */}
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/92 via-espresso-950/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                  <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <FaExpand className="text-xs" />
                  </span>

                  <span className="absolute inset-x-0 bottom-0 block p-5 text-left">
                    <span className="block text-[0.625rem] uppercase tracking-[0.25rem] text-gold-400">
                      {item.category}
                    </span>

                    <span className="mt-2 block font-serif text-xl leading-tight text-white 3xl:text-2xl">
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default GalleryFilmstrip;
