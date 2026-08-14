"use client";

import { motion } from "framer-motion";
import StatCounter from "../ui/StatCounter";
import { STATS } from "../../utils/constants";
import { EASE } from "../../utils/animations";

/** The credibility strip that sits on the hero's bottom rail. */
function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
      // A four-column grid rather than a flex row: 1fr columns all take the
      // width of the widest cell, so the dividers land on an even rhythm
      // instead of wherever "Coffee Blends" happens to end. `shrink-0` keeps
      // the rail from squeezing the strip at 1024px, where it used to compress
      // the cells until the two-word labels wrapped.
      className="hidden shrink-0 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl lg:grid lg:grid-cols-4"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="px-5 py-4 text-center xl:px-8">
          {/* Tabular figures — without them the count-up reflows the cell on
              every frame as the digits change width. */}
          <p className="font-serif text-2xl tabular-nums text-gold-400 xl:text-3xl">
            <StatCounter value={stat.value} suffix={stat.suffix} />
          </p>

          <p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[3px] text-white/50">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default HeroStats;
