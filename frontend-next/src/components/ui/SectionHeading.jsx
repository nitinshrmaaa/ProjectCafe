"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";
import { cn } from "../../utils/helpers";

/**
 * The eyebrow + two-line headline + lede used at the top of every section.
 */
function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}) {
  const centered = align === "center";

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "w-full",
        centered ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          className={cn(
            "mb-6 flex items-center gap-4",
            centered && "justify-center"
          )}
        >
          <span className="hairline h-px w-12 sm:w-20" />

          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400 sm:text-xs sm:tracking-[0.5rem]">
            {eyebrow}
          </span>

          <span className="hairline h-px w-12 sm:w-20" />
        </motion.div>
      )}

      <motion.h2
        variants={fadeUp}
        className="font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl"
      >
        {title}

        {highlight && (
          <>
            <br />
            <span className="gold-text font-serif italic font-normal">
              {highlight}
            </span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg sm:leading-9",
            centered && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
