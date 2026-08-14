"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { FAQS } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import { EASE } from "../../utils/animations";

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-espresso-950 py-20 lg:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Good To Know"
          title="Questions we are"
          highlight="asked most often"
        />

        <div className="mt-14 divide-y divide-white/8 border-y border-white/8">
          {FAQS.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "font-serif text-xl transition-colors duration-300 sm:text-2xl",
                        isOpen ? "text-gold-400" : "text-white"
                      )}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-gold-400 bg-gold-400 text-espresso-950"
                          : "border-white/15 text-white/60"
                      )}
                    >
                      <FaPlus />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-14 leading-8 text-white/50">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Faq;
