"use client";

import Image from "next/image";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Rating from "../ui/Rating";
import CanvasBoundary from "../three/CanvasBoundary";
import { spotlightItems } from "./menuData";
import useWindowSize from "../../hooks/useWindowSize";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn, formatPrice, supportsWebGL } from "../../utils/helpers";
import { EASE, fadeUp, viewportOnce } from "../../utils/animations";

const MenuSpotlight3D = lazy(() => import("./MenuSpotlight3D"));

/** Warm studio backdrop painted behind the canvas, not inside it. */
const STAGE_BACKDROP = {
  backgroundImage:
    "radial-gradient(120% 85% at 50% 12%, #2b201700 0%, #1a1513 45%, #0a0908 100%)",
};

const STAGE_POOL = {
  backgroundImage:
    "radial-gradient(60% 100% at 50% 100%, rgba(212,167,98,0.22), transparent 72%)",
};

/**
 * Showpiece on the menu page: pick a drink and it is built in front of you
 * in 3D. Falls back to photography where WebGL is unavailable or unwelcome.
 */
function MenuSpotlight() {
  const [activeId, setActiveId] = useState(spotlightItems[0].id);
  const [canRender3D, setCanRender3D] = useState(false);
  const { isDesktop } = useWindowSize();
  const reducedMotion = useReducedMotion();

  useEffect(() => setCanRender3D(supportsWebGL()), []);

  const item =
    spotlightItems.find((entry) => entry.id === activeId) ?? spotlightItems[0];

  const show3D = canRender3D && isDesktop && !reducedMotion;

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-espresso-950 py-20 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-gold-500/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
        >
          {/* Detail */}
          <div className="order-2 lg:order-1">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400">
              The Pour
            </span>

            <motion.h2
              key={`${item.id}-title`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl"
            >
              {item.name}
            </motion.h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="text-xs uppercase tracking-[0.25rem] text-gold-400/80">
                {item.origin}
              </p>

              <Rating value={item.rating} />
            </div>

            <motion.p
              key={`${item.id}-copy`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-8 text-white/55"
            >
              {item.description}
            </motion.p>

            <div className="mt-7 flex items-center gap-5">
              <p className="font-serif text-3xl text-gold-400">
                {formatPrice(item.price)}
              </p>

              <span className="h-6 w-px bg-white/10" />

              <p className="text-sm text-white/40">{item.category}</p>
            </div>

            {/* Drink switcher */}
            <div className="mt-10">
              <p className="mb-4 text-[0.6875rem] uppercase tracking-[0.1875rem] text-white/35">
                Choose a drink
              </p>

              <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
                {spotlightItems.map((drink) => {
                  const isActive = drink.id === item.id;

                  return (
                    <li key={drink.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveId(drink.id)}
                        aria-pressed={isActive}
                        title={drink.name}
                        className={cn(
                          "group flex w-24 flex-col items-center gap-2.5 rounded-2xl border p-2.5 transition-all duration-300",
                          isActive
                            ? "border-gold-400 bg-gold-400/10"
                            : "border-white/10 bg-white/[0.03] hover:border-gold-400/50"
                        )}
                      >
                        <span className="h-16 w-full overflow-hidden rounded-xl">
                          <Image
                            src={drink.image}
                            alt=""
                            fill
                            sizes="96px"
                            className={cn(
                              "object-cover transition-transform duration-500 group-hover:scale-110",
                              isActive ? "" : "opacity-60 grayscale-[0.35]"
                            )}
                          />
                        </span>

                        <span
                          className={cn(
                            "text-[0.625rem] uppercase tracking-[0.0625rem] leading-tight",
                            isActive ? "text-gold-300" : "text-white/45"
                          )}
                        >
                          {drink.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button href="/reserve" className="mt-9">
              Taste it at the counter
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stage */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[clamp(20rem,58vh,36rem)] w-full overflow-hidden rounded-[2.5rem] border border-white/10">
              <div
                className="absolute inset-0"
                style={STAGE_BACKDROP}
                aria-hidden="true"
              />

              <div
                className="absolute inset-x-8 bottom-0 h-1/2"
                style={STAGE_POOL}
                aria-hidden="true"
              />

              {show3D ? (
                <CanvasBoundary
                  fallback={
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  }
                >
                  <Suspense
                    fallback={
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover opacity-40"
                      />
                    }
                  >
                    <div className="absolute inset-0">
                      <MenuSpotlight3D item={item} />
                    </div>
                  </Suspense>
                </CanvasBoundary>
              ) : (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  className="object-cover"
                />
              )}

              <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[0.625rem] uppercase tracking-[0.1875rem] text-white/50 backdrop-blur-md">
                {show3D ? "Drag to turn" : item.name}
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default MenuSpotlight;
