"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Container from "../ui/Container";
import Button from "../ui/Button";
import StatCounter from "../ui/StatCounter";
import { SITE, STATS } from "../../utils/constants";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  stagger,
  viewportOnce,
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
    <section
      id="story"
      className="relative overflow-hidden bg-espresso-900 py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-mocha/15 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image composition */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src={story}
                alt="The Brew Haven room, with the chalkboard menu above the counter"
                sizes="(max-width: 1024px) 100vw, 45vw"
                placeholder="blur"
                className="aspect-[4/5] w-full object-cover"
                style={{ height: "auto" }}
              />
            </div>

            <div className="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-3xl border-4 border-espresso-900 sm:block lg:-right-10 lg:w-64">
              <Image
                src={detail}
                alt="Whole beans and freshly ground coffee in two portafilters"
                sizes="(max-width: 1024px) 40vw, 16rem"
                placeholder="blur"
                className="aspect-square w-full object-cover"
                style={{ height: "auto" }}
              />
            </div>

            <div className="absolute -left-4 top-8 rounded-2xl border border-gold-400/30 bg-espresso-950/90 px-6 py-4 backdrop-blur-md lg:-left-10">
              <p className="font-serif text-3xl text-gold-400">
                <StatCounter value={String(new Date().getFullYear() - SITE.founded)} suffix=" yrs" />
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[3px] text-white/50">
                Of roasting
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
              <span className="hairline h-px w-14" />

              <span className="text-[11px] font-semibold uppercase tracking-[6px] text-gold-400">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl font-semibold leading-[1.12] text-white sm:text-5xl"
            >
              A small roastery that
              <br />
              <span className="gold-text italic font-normal">
                never got any bigger
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-7 leading-8 text-white/55"
            >
              Brew Haven opened in {SITE.founded} with one second-hand roaster and
              a stubborn idea: that a neighbourhood café could buy its coffee the
              way a restaurant buys its produce — directly, seasonally, and from
              people it knows by name.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 leading-8 text-white/55"
            >
              Twelve years later we still roast in the same room we serve in. The
              beans in your cup were green fruit fewer than ten days ago, and the
              person who pulled your shot has tasted every batch that left the
              drum this week.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-9 grid gap-4 sm:grid-cols-2">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-white/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-[10px] text-gold-400">
                    <FaCheck />
                  </span>

                  {promise}
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

        {/* Stat strip */}
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

              <p className="mt-2 text-[11px] uppercase tracking-[3px] text-white/45">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default About;
