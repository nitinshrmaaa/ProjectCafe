"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { menuItems } from "./menuData";
import useReducedMotion from "../../hooks/useReducedMotion";
import { formatPrice } from "../../utils/helpers";
import { EASE, fadeUp, stagger } from "../../utils/animations";
import backdrop from "../../assets/images/hero/hero3.jpg";

/** The four items the card previews — the ones we would recommend. */
const TODAYS_BOARD = menuItems.filter((item) => item.badge).slice(0, 4);

/** Small bean glyph used as a section ornament. */
function BeanGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <g transform="rotate(-32 12 12)">
        <ellipse cx="12" cy="12" rx="5.5" ry="8.5" />
        <path d="M12 3.5c-2.4 2.8-2.4 5.7 0 8.5s2.4 5.7 0 8.5" />
      </g>
    </svg>
  );
}

/** Full-height masthead for the menu route. */
function MenuHero() {
  const reducedMotion = useReducedMotion();

  /** Jump to a course, or to the top of the board when it is filtered out. */
  const goTo = (id = "board") => {
    const target =
      document.getElementById(id) ?? document.getElementById("board");

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    /* Just under a full screen, so the board's first rule shows and the page
       reads as "there is a menu below this". */
    <section className="noise relative flex min-h-[92vh] flex-col overflow-hidden">
      {/* Backdrop, drifting almost imperceptibly */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 1.02 }}
        animate={reducedMotion ? undefined : { scale: 1.12 }}
        transition={{
          duration: 26,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          className="object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-espresso-950/95 via-espresso-950/80 to-espresso-900/95"
        aria-hidden="true"
      />

      {/* Warm pool of light behind the headline */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[150px]"
        aria-hidden="true"
      />

      {/* Vertical maker's mark */}
      <span
        className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[6px] text-white/25 xl:block"
        aria-hidden="true"
      >
        Est. 2012 · San Francisco
      </span>

      <Container className="relative z-10 flex flex-1 items-center pb-14 pt-36 sm:pt-40 lg:pt-44">
        <motion.div
          variants={stagger(0.11, 0.1)}
          initial="hidden"
          animate="visible"
          className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
        >
          {/* Editorial column */}
          <div className="text-center lg:text-left">
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mb-7 flex items-center justify-center gap-3 text-xs text-white/40 lg:justify-start"
            >
              <Link href="/" className="transition-colors hover:text-gold-300">
                Home
              </Link>

              <FaChevronRight className="text-[8px]" />

              <span className="text-gold-400">Menu</span>
            </motion.nav>

            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 lg:justify-start"
            >
              <span className="h-px w-10 bg-gold-400/50" />

              <span className="text-[11px] font-semibold uppercase tracking-[6px] text-gold-400">
                Our Menu
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 font-serif text-5xl font-semibold leading-[1.04] text-white sm:text-6xl xl:text-[76px]"
            >
              Everything on
              <br />
              <span className="gold-text italic font-normal">the board</span>
            </motion.h1>

            {/* Ornament */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
              aria-hidden="true"
            >
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/50 lg:from-gold-400/50 lg:to-gold-400/50" />

              <BeanGlyph className="h-4 w-4 text-gold-400/70" />

              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/50" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-lg text-base leading-8 text-white/55 sm:text-lg sm:leading-9 lg:mx-0"
            >
              Fourteen drinks and pastries, all of them made under this roof —
              roasted in the morning, baked before that.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => goTo("board")}
                className="w-full sm:w-auto"
              >
                See the full board
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                href="/reserve"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Reserve a table
              </Button>
            </motion.div>
          </div>

          {/* Today's board — a torn-off piece of the real menu */}
          <motion.aside
            variants={fadeUp}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="relative rounded-[2rem] border border-white/12 bg-espresso-950/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-9">
              <span className="absolute -top-3.5 left-8 rounded-full border border-gold-400/40 bg-espresso-950 px-4 py-1.5 text-[10px] uppercase tracking-[3px] text-gold-300">
                Today at the counter
              </span>

              <ul className="mt-3 divide-y divide-white/[0.07]">
                {TODAYS_BOARD.map((item) => (
                  <li key={item.id} className="py-4 first:pt-2 last:pb-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-lg text-white">
                        {item.name}
                      </span>

                      <span
                        className="h-px min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-white/20"
                        aria-hidden="true"
                      />

                      <span className="font-serif text-lg text-gold-400">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[10px] uppercase tracking-[2.5px] text-white/35">
                      {item.origin}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-white/[0.07] pt-5 text-xs leading-6 text-white/35">
                Oat, almond and soy at no extra charge. Decaf on every espresso
                drink. Beans ground to your brewer, free.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      </Container>

      {/* Scroll cue. The course list lives in the sticky bar on the board
          below — repeating it here just doubled the same row twice over. */}
      <motion.button
        type="button"
        onClick={() => goTo("board")}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
        aria-label="Scroll to the menu"
        className="relative z-10 mx-auto mb-10 flex flex-col items-center gap-3 text-white/40 transition-colors hover:text-gold-300"
      >
        <span className="text-[10px] uppercase tracking-[4px]">The board</span>

        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-current"
          />
        </span>
      </motion.button>
    </section>
  );
}

export default MenuHero;
