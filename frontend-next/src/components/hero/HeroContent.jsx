"use client";

import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import { fadeUp, stagger } from "../../utils/animations";
import Container from "../ui/Container";

function HeroContent() {
  return (
    <Container className="relative text-center">
      <motion.div
        variants={stagger(0.14, 0.15)}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold-400/40 bg-black/25 px-5 py-2 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />

          <span className="text-[10px] uppercase tracking-[5px] text-gold-200 sm:text-xs sm:tracking-[6px]">
            Artisan Coffee House
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-[42px] font-medium leading-[1.05] text-white sm:text-6xl lg:text-[92px]"
        >
          Crafted Coffee
          <br />
          <span className="gold-text italic font-normal">Crafted Memories</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9"
        >
          Single-origin beans roasted in-house every morning, pulled by
          baristas who have spent years learning the difference a few seconds
          makes.
        </motion.p>

        <motion.div variants={fadeUp}>
          <HeroButtons />
        </motion.div>
      </motion.div>
    </Container>
  );
}

export default HeroContent;
