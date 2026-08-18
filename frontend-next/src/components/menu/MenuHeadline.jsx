"use client";

import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn } from "../../utils/helpers";
import { EASE, fadeUp, stagger, viewportRepeat } from "../../utils/animations";

/**
 * Three ways of saying what this screen is showing.
 *
 * The headline itself never moves — a heading is the one thing on a screen a
 * reader expects to stay put, and rewriting it under them is what made the
 * earlier version read as a gimmick. What turns over is the standfirst beneath
 * it: same length, same shape, a different fact each time.
 */
const LINES = [
  {
    claim: "The drinks our regulars order without looking at the board.",
    note: "Everything is roasted in-house and pulled to order.",
  },
  {
    claim: "Green in the drum by seven, in your cup before the week is out.",
    note: "Six farms, bought direct, and never more than we can drink.",
  },
  {
    claim: "From the first flat white to the last cold brew of the afternoon.",
    note: "Baked on site each morning, and gone once they are gone.",
  },
];

/**
 * All three sit in the same grid cell, so the block is exactly as tall as the
 * longest of them and never a pixel more — and cannot change height as they
 * turn over, which would shunt the carousel below up and down the screen.
 */
const STACKED = "col-start-1 row-start-1";

const TURN = { duration: 0.5, ease: EASE };

/**
 * The menu screen's headline and its turning standfirst.
 *
 * `beat` is the carousel's page counter, passed down: the words change on
 * exactly the beat the cards do, whether that was an arrow, a rule, a swipe or
 * the track advancing itself. That is the whole point of doing it this way
 * rather than on a clock of its own — two timers running side by side drift
 * apart and read as two unrelated things twitching, and a visitor who has just
 * moved the carousel sees the sentence answer them.
 *
 * The headline is set here rather than through SectionHeading so this screen
 * can have one of its own without moving the other sections. Four things
 * separate it from the shared one, all about how display type is set rather
 * than how big it is: normal weight instead of semibold, because a bold serif
 * at this size reads as a heavy web heading rather than set type; leading
 * closed to 1.02 and the tracking pulled in, so the two lines lock together as
 * one block; one size step up at each breakpoint, which the lighter weight can
 * carry; and the light moving slowly through the gold line.
 */
function MenuHeadline({ beat = 0 }) {
  const reducedMotion = useReducedMotion();
  const index = beat % LINES.length;

  // The change is the visitor's own doing, so it still happens under reduced
  // motion — what goes is the travel and the fade, leaving a straight swap.
  const turn = reducedMotion ? { duration: 0 } : TURN;

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      // Replays on every visit rather than only the first, like the story's
      // collage one screen up: scroll away and back and the screen opens
      // again instead of already being there.
      viewport={viewportRepeat}
      className="text-center"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-4"
      >
        <span className="hairline h-px w-12 sm:w-20" aria-hidden="true" />

        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400 sm:text-xs sm:tracking-[0.5rem]">
          Our Menu
        </span>

        <span className="hairline h-px w-12 sm:w-20" aria-hidden="true" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="mt-6 font-serif text-[2.75rem] font-normal leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
      >
        Six Things We
        <span className="gold-text-shine block italic">Pour Most Often</span>
      </motion.h2>

      {/* The claim in a light serif italic, the plain fact under it small and
          quiet, a hairline between them. `text-balance` is what makes the
          centring work — it evens the line lengths instead of leaving a long
          line over a short one, which is what makes centred paragraphs look
          accidental. */}
      <motion.div variants={fadeUp} className="mx-auto mt-6 grid max-w-2xl">
        {LINES.map((line, position) => {
          const active = position === index;

          return (
            <motion.div
              key={line.claim}
              aria-hidden={!active}
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                y: active || reducedMotion ? 0 : 14,
              }}
              transition={turn}
              className={cn(STACKED, !active && "pointer-events-none")}
            >
              <p className="text-balance font-serif text-xl font-light italic leading-snug text-cream/85 sm:text-2xl sm:leading-snug">
                {line.claim}
              </p>

              <span
                className="hairline mx-auto mt-4 block h-px w-16"
                aria-hidden="true"
              />

              <p className="mx-auto mt-4 max-w-md text-balance text-[0.9375rem] leading-7 text-white/45">
                {line.note}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default MenuHeadline;
