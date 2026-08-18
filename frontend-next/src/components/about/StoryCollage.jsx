"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StatCounter from "../ui/StatCounter";
import { SITE } from "../../utils/constants";
import { scaleIn, stagger, viewportRepeat } from "../../utils/animations";
import bar from "../../assets/images/hero/hero7.jpg";
import sign from "../../assets/images/hero/hero6.jpg";
import terrace from "../../assets/images/hero/hero3.jpg";

const YEARS = String(new Date().getFullYear() - SITE.founded);

/**
 * The home page's story picture.
 *
 * All three are chosen to sit in the hero's register — hero4 up top is a
 * near-black wall lit warm amber, and the previous picks (hero1's white
 * ceiling, hero2's near-white backdrop) read as a bright slab under it, which
 * made the page look like it changed documents halfway down. These are dark
 * and warm: the bar runs full width where its landscape proportions fit, with
 * two details beneath it.
 *
 * Every frame is sized by aspect ratio, so the composition's height follows
 * its width instead of being stretched to fill a column. Landscape ratios
 * throughout — 16:9 over a pair of 3:2 — keep it a wide band rather than a
 * tall one.
 *
 * The three frames present themselves one after another whenever the section
 * comes into view — not just the first time — so scrolling back up and down
 * replays the entrance rather than leaving the pictures sitting there already
 * arrived.
 */
function StoryCollage() {
  return (
    <motion.div
      variants={stagger(0.16)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      className="relative grid grid-cols-2 gap-4"
    >
      <motion.figure variants={scaleIn} className="col-span-2 aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10">
        <Image
          src={bar}
          alt="The bar at Brew Haven — a barista working the espresso machine under warm ceiling lamps, pastry case alongside"
          sizes="(max-width: 1024px) 100vw, 36rem"
          placeholder="blur"
          className="h-full w-full object-cover"
        />
      </motion.figure>

      <motion.figure variants={scaleIn} className="aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/10">
        <Image
          src={terrace}
          alt="A latte poured with a rosetta and a croissant on a round wooden table, an open magazine on the stool beside it"
          sizes="(max-width: 1024px) 50vw, 18rem"
          placeholder="blur"
          className="h-full w-full object-cover"
        />
      </motion.figure>

      <motion.figure variants={scaleIn} className="aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/10">
        <Image
          src={sign}
          alt="The neon coffee sign glowing against the bare concrete by the door"
          sizes="(max-width: 1024px) 50vw, 18rem"
          placeholder="blur"
          className="h-full w-full object-cover"
        />
      </motion.figure>

      {/* Sits over the seam between the room and the two details, so it reads
          as part of the composition rather than a label stuck on a photo. */}
      <motion.div variants={scaleIn} className="absolute -left-4 top-8 rounded-2xl border border-gold-400/30 bg-espresso-950/90 px-6 py-4 backdrop-blur-md">
        <p className="font-serif text-3xl tabular-nums text-gold-400">
          <StatCounter value={YEARS} suffix=" yrs" />
        </p>

        <p className="mt-1 whitespace-nowrap text-[0.625rem] uppercase tracking-[0.1875rem] text-white/50">
          Of roasting
        </p>
      </motion.div>
    </motion.div>
  );
}

export default StoryCollage;
