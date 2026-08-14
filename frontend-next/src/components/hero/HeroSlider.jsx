"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";
import hero7 from "../../assets/images/hero/hero7.jpg";
import useReducedMotion from "../../hooks/useReducedMotion";

const SLIDES = [
  {
    image: hero1,
    alt: "The Brew Haven room: chalkboard menu, plants and tables in morning light",
  },
  {
    image: hero7,
    alt: "A barista working behind the counter beside the espresso machine",
  },
  {
    image: hero2,
    alt: "Two portafilters held side by side, one full of beans and one of fresh grounds",
  },
  {
    image: hero4,
    alt: "The espresso machine and hand-written menu board above the counter",
  },
  {
    image: hero3,
    alt: "A latte and a croissant on a wooden table in late afternoon light",
  },
];

const INTERVAL = 6000;

/**
 * Photographic hero background.
 * Stands in for the WebGL scene on phones, low-power devices and whenever
 * the visitor prefers reduced motion.
 */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % SLIDES.length),
      INTERVAL
    );

    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((slide, index) => (
        <Image
          key={slide.image.src}
          src={slide.image}
          alt={index === current ? slide.alt : ""}
          fill
          sizes="100vw"
          priority={index === 0}
          placeholder="blur"
          aria-hidden={index !== current}
          className={`object-cover transition-all duration-[2000ms] ease-out ${
            index === current ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
        />
      ))}

      {/* Slide markers — stacked on the right edge, clear of the hero rail */}
      <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:right-8">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image.src}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === current}
            className={`w-1 rounded-full transition-all duration-500 ${
              index === current
                ? "h-8 bg-gold-400"
                : "h-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
