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
      className="hidden divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl lg:flex"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="px-7 py-4 text-center xl:px-9">
          <p className="font-serif text-2xl text-gold-400 xl:text-3xl">
            <StatCounter value={stat.value} suffix={stat.suffix} />
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[3px] text-white/50">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default HeroStats;
