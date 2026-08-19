"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Rating from "../ui/Rating";
import { TESTIMONIALS } from "../../utils/constants";
import { EASE } from "../../utils/animations";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn } from "../../utils/helpers";

const INTERVAL = 7000;

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const step = useCallback((delta) => {
    setIndex(
      (current) =>
        (current + delta + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = setInterval(() => step(1), INTERVAL);

    return () => clearInterval(timer);
  }, [paused, reducedMotion, step]);

  const testimonial = TESTIMONIALS[index];

  return (
    <Section
      space="tall"
      glow="right"
      divider
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="relative">
        <SectionHeading
          eyebrow="Kind Words"
          title="What our regulars"
          highlight="say about us"
        />

        <div className="relative mx-auto mt-16 max-w-3xl 3xl:mt-20 3xl:max-w-5xl">
          <FaQuoteLeft
            className="mx-auto mb-8 text-4xl text-gold-400/30"
            aria-hidden="true"
          />

          <div className="min-h-64 sm:min-h-56">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center"
              >
                <p className="font-serif text-2xl leading-[1.6] text-white/85 sm:text-3xl sm:leading-[1.55]">
                  “{testimonial.quote}”
                </p>

                <footer className="mt-9">
                  <Rating value={testimonial.rating} className="justify-center" />

                  <p className="mt-4 font-serif text-xl text-gold-400">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.1875rem] text-white/40">
                    {testimonial.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-gold-400 hover:text-gold-400"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((entry, dot) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => setIndex(dot)}
                  aria-label={`Show testimonial ${dot + 1}`}
                  aria-current={dot === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    dot === index
                      ? "w-8 bg-gold-400"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-gold-400 hover:text-gold-400"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Testimonials;
