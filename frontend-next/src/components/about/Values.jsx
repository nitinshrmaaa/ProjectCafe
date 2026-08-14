"use client";

import { motion } from "framer-motion";
import { FaFire, FaLeaf, FaMugHot, FaSeedling } from "react-icons/fa";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { VALUES } from "../../utils/constants";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";

const ICONS = {
  bean: FaSeedling,
  fire: FaFire,
  mug: FaMugHot,
  leaf: FaLeaf,
};

function Values() {
  return (
    <section className="bg-espresso-950 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Stand For"
          title="Four things we refuse"
          highlight="to compromise on"
          description="None of this is a marketing position. It is simply how the café has been run since the first bag of green coffee arrived."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((value) => {
            const Icon = ICONS[value.icon] ?? FaMugHot;

            return (
              <motion.article
                key={value.title}
                variants={fadeUp}
                className="card-surface group rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-xl text-gold-400 transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-espresso-950">
                  <Icon />
                </span>

                <h3 className="mt-7 font-serif text-2xl text-white">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default Values;
