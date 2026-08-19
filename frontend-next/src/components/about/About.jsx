"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import StatCounter from "../ui/StatCounter";
import StoryCollage from "./StoryCollage";
import { SITE, STATS } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  stagger,
  viewportOnce,
  viewportRepeat,
} from "../../utils/animations";
import story from "../../assets/images/hero/hero1.jpg";
import detail from "../../assets/images/hero/hero2.jpg";

const PROMISES = [
  "Beans bought directly from six farms",
  "Roasted on site every morning",
  "Baristas trained for twelve weeks",
  "Everything we serve is compostable",
];

/**
 * The story block. `compact` is the home-page version; the About page
 * renders the same section and follows it with the process and the team.
 */
function About({ compact = false }) {
  return (
    <Section
      id="story"
      glow="left"
      // Transparent on home: the photograph spanning this section and the hero
      // belongs to page.jsx, and an opaque surface here would cover it.
      tone={compact ? "none" : "base"}
      // On the home page this is the first thing under the hero, so it holds a
      // screen of its own rather than ending partway down and asking for
      // another scroll. The About page keeps the normal rhythm — it has the
      // process and the team stacked below it.
      // The screen is a floor, not a stretch. This section's contents come to
      // around 68rem at lg, so `min-h-screen` was doing nothing on a laptop and
      // only bit on a tall display — where it asked for a third of a screen of
      // height the section had nothing to put in, and `items-center` split that
      // above and below the row. The half that landed at the foot, on top of
      // the menu's own leftover below, was the bare espresso band that came
      // back on a big monitor. The cap is set at the content's own height, so
      // nothing at 1080 or under moves by a pixel and the section simply stops
      // growing once the monitor is taller than the copy.
      // The foot is pulled in from the section's normal py-20/py-28 on the home
      // page only: the menu screen below closes in by the same amount, and
      // between them the two were leaving a bare band of espresso a fifth of a
      // screen deep at the join. Longhand beats the shorthand in the cascade,
      // so this wins over the rhythm Section sets.
      className={
        compact
          ? "pb-10 lg:flex lg:min-h-[min(100vh,68rem)] lg:items-center lg:pb-12"
          : undefined
      }
    >
      {/* Only a wash — the photograph behind it is the hero's, spanned across
          both screens by page.jsx, so this section frames the lower half of the
          same picture. It picks up at exactly the 70% the hero hands over at
          its base so the brightness carries across the join, deepens for the
          copy, and closes on solid espresso-900 to meet Menu's tone. */}
      {compact && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso-950/70 via-espresso-950/92 to-espresso-900"
          aria-hidden="true"
        />
      )}

      <Container className="relative">
        {/* The picture track is the wider of the two and the row is no longer
            stretched to the viewport: height follows from the frames' own
            landscape ratios, so the composition gains width rather than
            growing downward. The copy only needs a readable measure. */}
        <div
          className={cn(
            "grid items-center gap-14",
            compact
              ? "lg:grid-cols-[1.3fr_1fr] lg:gap-16 3xl:grid-cols-[1.55fr_1fr] 3xl:gap-24"
              : "lg:grid-cols-2 lg:gap-20"
          )}
        >
          {/* Image composition */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            // Home replays the entrance on every visit; the About page, where
            // this is one section among several, keeps the once-only default.
            viewport={compact ? viewportRepeat : viewportOnce}
            className={cn("relative", !compact && "mb-12 lg:mb-0")}
          >
            {compact ? (
              <StoryCollage />
            ) : (
              <>
                <div className="overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src={story}
                    alt="The café floor at Brew Haven — chalkboard menus over the espresso bar, with a fiddle-leaf fig between the tables"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    placeholder="blur"
                    className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
                  />
                </div>

                {/* The inset square hangs 32px below the frame, and both
                    floaters used to reach 40px past the column — but the
                    container only has 32px of padding at lg and the section
                    clips its overflow, so the badge lost its left edge between
                    1024px and 1344px. 16px keeps them on the page. */}
                <div className="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-3xl border-4 border-espresso-900 sm:block lg:w-64">
                  <Image
                    src={detail}
                    alt="Two portafilters held side by side, one holding whole beans and one a fresh grind"
                    sizes="(max-width: 1024px) 40vw, 16rem"
                    placeholder="blur"
                    className="aspect-square w-full object-cover"
                    style={{ height: "auto" }}
                  />
                </div>

                <div className="absolute -left-4 top-8 rounded-2xl border border-gold-400/30 bg-espresso-950/90 px-6 py-4 backdrop-blur-md">
                  <p className="font-serif text-3xl tabular-nums text-gold-400">
                    <StatCounter
                      value={String(new Date().getFullYear() - SITE.founded)}
                      suffix=" yrs"
                    />
                  </p>

                  <p className="mt-1 text-[0.625rem] uppercase tracking-[0.1875rem] text-white/50">
                    Of roasting
                  </p>
                </div>
              </>
            )}
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={compact ? viewportRepeat : viewportOnce}
            // No measure cap: the column is ~500px at the container's widest,
            // already inside a readable line length, and capping it only left
            // bare space down the right-hand edge.
            className={compact ? "lg:self-center" : undefined}
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
              <span className="hairline h-px w-14" />

              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400">
                Our Story
              </span>
            </motion.div>

            {/* Not bigger — lighter and tighter. A semibold serif at display
                size reads as a bold web heading rather than a set one; at
                normal weight with the leading closed up and a touch of
                negative tracking, the two lines lock together as a block and
                the italic gold line does the emphasis on its own. */}
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl font-normal leading-[1.05] tracking-[-0.015em] text-white sm:text-5xl 3xl:text-6xl"
            >
              A small roastery that
              {/* A block span rather than a <br>, so the second line can be
                  pushed to the far edge of the column — the two lines step
                  down and across instead of stacking flush left. */}
              {/* Runs the line out to the viewport's right edge, not just the
                  container's. Container is max-w-7xl (80rem) centred with 2rem
                  of padding, so its content edge sits 38rem from the middle of
                  the screen; the gap left to fill is therefore 50vw - 38rem,
                  floored at the 2rem padding for viewports under 1280px where
                  the container hasn't started centring yet. */}
              <span className="gold-text -me-5 block text-right italic sm:me-[calc(-1_*_max(2rem,50vw_-_38rem))] 3xl:me-[calc(-1_*_max(3rem,50vw_-_52rem))] 4xl:me-[calc(-1_*_max(3rem,50vw_-_63rem))]">
                never got any bigger
              </span>
            </motion.h2>

            {/* A serif drop cap in gold opens the story, and the leading is
                opened to ~1.85 — long-form type reads as considered when the
                lines have air between them. */}
            <motion.p
              variants={fadeUp}
              className="mt-8 text-[1.0625rem] leading-[1.85] text-white/75 3xl:text-[1.1875rem] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[3.4rem] first-letter:leading-[0.75] first-letter:text-gold-400"
            >
              Brew Haven opened in {SITE.founded} with one second-hand roaster and
              a stubborn idea: that a neighbourhood café could buy its coffee the
              way a restaurant buys its produce — directly, seasonally, and from
              people it knows by name.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[0.9375rem] leading-[1.85] text-white/50"
            >
              All these years later we still roast in the same room we serve in. The
              beans in your cup were green fruit fewer than ten days ago, and the
              person who pulled your shot has tasted every batch that left the
              drum this week.
            </motion.p>

            {/* No frames, no fills. Hairline rules and the gold diamond from
                the wordmark — the list is held together by the rhythm of the
                rules rather than by four containers. */}
            <motion.ul
              variants={fadeUp}
              // Same break-out as the heading's second line: the rules and the
              // 01–04 run past the copy column and finish at the viewport's
              // right edge, so each one is a full-length line across the page
              // instead of stopping where the column does.
              className="mt-10 -me-5 divide-y divide-white/[0.08] border-t border-white/[0.08] sm:me-[calc(-1_*_max(2rem,50vw_-_38rem))] 3xl:me-[calc(-1_*_max(3rem,50vw_-_52rem))] 4xl:me-[calc(-1_*_max(3rem,50vw_-_63rem))]"
            >
              {PROMISES.map((promise, index) => (
                <li
                  key={promise}
                  className="flex items-center justify-between gap-6 py-5 text-lg font-light leading-snug text-white/80 lg:text-[1.3rem]"
                >
                  <span className="flex items-center gap-5">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400/70"
                      aria-hidden="true"
                    />

                    {promise}
                  </span>

                  {/* Anchors the right end of every row, so each rule reads as
                      a full-width line rather than trailing off into space.
                      Same device the mobile drawer uses on its nav links. */}
                  <span className="shrink-0 font-sans text-[0.6875rem] tracking-[0.1875rem] text-white/25">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </motion.ul>

            {compact && (
              <motion.div variants={fadeUp} className="mt-10">
                <Button href="/about" variant="outline">
                  Read our full story
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Stat strip — About page only. On home the hero carries these same
            four numbers one screen up, and repeating them here was what pushed
            the section past a single viewport. */}
        {!compact && (
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-20 grid divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] sm:grid-cols-2 sm:divide-x lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-8 py-9 text-center">
                <p className="font-serif text-4xl text-gold-400">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>

                <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.1875rem] text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

export default About;
