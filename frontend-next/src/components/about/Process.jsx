"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";

const STEPS = [
  {
    step: "01",
    title: "Sourced",
    detail:
      "We taste through the harvest with six farms each season and buy the lots we would happily drink black.",
  },
  {
    step: "02",
    title: "Roasted",
    detail:
      "Small 12kg batches, profiled by hand. Nothing is roasted dark enough to hide what the farmer worked for.",
  },
  {
    step: "03",
    title: "Rested",
    detail:
      "Beans sit for four to seven days so the carbon dioxide settles and the sweetness comes forward.",
  },
  {
    step: "04",
    title: "Poured",
    detail:
      "Dialled in twice a day against a refractometer, then served the moment it hits the cup.",
  },
];

/** From green coffee to the cup, in four steps. */
function Process() {
  return (
    <section className="relative overflow-hidden bg-espresso-900 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Bean To Cup"
          title="How your coffee"
          highlight="actually gets made"
          description="Four stages, all of them under this roof, none of them rushed."
        />

        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid gap-10 lg:grid-cols-4"
        >
          {/* Connecting rule on desktop */}
          <span
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent lg:block"
            aria-hidden="true"
          />

          {STEPS.map((item) => (
            <motion.li key={item.step} variants={fadeUp} className="relative">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-espresso-900 font-serif text-lg text-gold-400">
                {item.step}
              </span>

              <h3 className="mt-6 font-serif text-2xl text-white">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-white/50">{item.detail}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}

export default Process;
