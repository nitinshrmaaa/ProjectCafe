"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import backdrop from "../../assets/images/hero/hero4.jpg";

/**
 * The hero photograph.
 *
 * To change the picture, drop a file into `src/assets/images/hero/` and point
 * the import above at it — nothing else in the app references it. Landscape
 * and dark works best: the headline sits over the top third, and the gradients
 * in Hero.jsx assume the image can take being pushed down.
 *
 * It starts overscaled so the slow drift never exposes an edge.
 */
function HeroBackdrop() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.08 }}
        animate={reducedMotion ? undefined : { scale: 1.18 }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
      </motion.div>
    </div>
  );
}

export default HeroBackdrop;
