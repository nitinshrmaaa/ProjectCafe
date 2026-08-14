"use client";

import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { TEAM } from "../../utils/constants";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";

/** Initials for the monogram, e.g. "Amara Osei" -> "AO". */
function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function Team() {
  return (
    <section className="bg-espresso-950 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The People"
          title="Who you will meet"
          highlight="behind the counter"
          description="A small team, most of whom have been here longer than the espresso machine."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {TEAM.map((person) => (
            <motion.article
              key={person.name}
              variants={fadeUp}
              className="card-surface group relative overflow-hidden rounded-3xl p-9 transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/50"
            >
              <FaQuoteRight
                className="absolute right-7 top-7 text-4xl text-white/[0.04] transition-colors duration-500 group-hover:text-gold-400/10"
                aria-hidden="true"
              />

              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 font-serif text-2xl tracking-wide text-gold-400">
                {initials(person.name)}
              </span>

              <h3 className="mt-8 font-serif text-2xl text-white">
                {person.name}
              </h3>

              <p className="mt-2 text-[11px] uppercase tracking-[3px] text-gold-400">
                {person.role}
              </p>

              <p className="mt-5 leading-7 text-white/50">{person.bio}</p>

              <p className="mt-7 border-t border-white/8 pt-5 text-xs uppercase tracking-[3px] text-white/30">
                With us since {person.since}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Team;
