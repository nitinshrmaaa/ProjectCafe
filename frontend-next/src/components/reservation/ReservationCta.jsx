"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import Container from "../ui/Container";
import Button from "../ui/Button";
import useOpeningStatus from "../../hooks/useOpeningStatus";
import { CONTACT } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";
import backdrop from "../../assets/images/hero/hero6.jpg";

/**
 * The booking prompt between the menu and the gallery.
 *
 * It used to be a poster: a centred stack of eyebrow, heading, paragraph and
 * two buttons, floated in the middle of a flat 85% wash. Two things were wrong
 * with it. It was the same centred column as the menu headline and the
 * testimonials, so the third one in a row stopped reading as an arrangement
 * and started reading as the only layout the page knows; and on a wide display
 * a 2xl column in the middle of a full-bleed band is mostly band.
 *
 * So it is ranged left against a panel now, and the panel does something. The
 * old version asked for a click and then asked for the party size on the next
 * page; this one asks for the party size here, and the number you press is
 * carried into the form. It is the difference between a sign pointing at the
 * booking desk and the first question the desk asks — the same click either
 * way, one fewer decision after it.
 *
 * What the panel deliberately does *not* carry is the opening-hours table.
 * This page already prints it in full in the contact section and again in the
 * footer, and a third copy in between would be the same mistake the gallery
 * had. It gets one live line instead — whether the room is open at this
 * moment, which neither of the other two can tell you.
 */

/* One through six covers almost every booking; the rest go through the form,
   which offers up to twelve. */
const QUICK_SIZES = [1, 2, 3, 4, 5, 6];

const CHIP =
  "group/chip flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/12 bg-white/[0.04] py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:bg-gold-400 focus-visible:border-gold-400";

function ReservationCta() {
  const status = useOpeningStatus();

  return (
    <section className="noise relative overflow-hidden">
      <Image
        src={backdrop}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />

      {/* Across rather than over. A flat wash hid the photograph everywhere
          equally; this one is heaviest under the type on the left and lets the
          picture come back on the right, where the panel is doing the work of
          holding its own contrast. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-espresso-950/95 via-espresso-950/88 to-espresso-950/70"
        aria-hidden="true"
      />

      {/* And a second pass down the edges, so the band opens on the espresso
          the menu closes with and lands on the espresso the gallery opens
          with. Neither join can show the picture starting. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-transparent to-espresso-950"
        aria-hidden="true"
      />

      <Container className="relative py-24 lg:py-32 3xl:py-40">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 3xl:gap-28"
        >
          {/* The invitation */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="hairline h-px w-14" aria-hidden="true" />

              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400">
                Reservations
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.015em] text-white sm:text-5xl lg:text-6xl 3xl:text-7xl"
            >
              Save a seat by the
              <span className="gold-text block italic">window</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl leading-8 text-white/60 3xl:text-lg 3xl:leading-9"
            >
              Weekday mornings are usually calm. Weekend brunch books out by
              Thursday — reserve online in under a minute.
            </motion.p>

            {/* The live line. It renders nothing until the hook has resolved
                in the browser, because the route is prerendered and a status
                baked into the HTML would be as old as the last build — so the
                row holds its height either way rather than appearing and
                pushing the buttons down after first paint. */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex h-6 items-center gap-3 text-sm"
            >
              {status && (
                <>
                  {/* Green while the room is pouring, gold when it is not. */}
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      status.open
                        ? "bg-emerald-400 shadow-[0_0_0_3px_rgb(52_211_153/0.18)]"
                        : "bg-gold-500/70"
                    )}
                    aria-hidden="true"
                  />

                  <span className="text-white/70">
                    {status.open ? "Open now" : "Closed"}
                    <span className="text-white/35">
                      {" · "}
                      {status.open ? "today until " : "today "}
                      {status.open
                        ? status.hours.close
                        : status.hours.label}
                    </span>
                  </span>
                </>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/reserve" size="lg">
                Reserve a table
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* The desk */}
          <motion.div
            variants={fadeUp}
            className="glass rounded-[2rem] p-7 sm:p-9 3xl:p-11"
          >
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.3125rem] text-gold-400">
              Start a booking
            </p>

            <p className="mt-3 font-serif text-2xl leading-snug text-white 3xl:text-3xl">
              How many are coming?
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3 3xl:grid-cols-6">
              {QUICK_SIZES.map((size) => (
                <Link
                  key={size}
                  href={`/reserve?guests=${size}`}
                  aria-label={`Reserve a table for ${size}`}
                  className={CHIP}
                >
                  <span className="font-serif text-2xl leading-none text-gold-400 transition-colors duration-300 group-hover/chip:text-espresso-950 3xl:text-3xl">
                    {size}
                  </span>

                  <span className="text-[0.5625rem] uppercase tracking-[0.125rem] text-white/40 transition-colors duration-300 group-hover/chip:text-espresso-950/70">
                    {size === 1 ? "Guest" : "Guests"}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/reserve"
              className="group/more mt-5 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-gold-300"
            >
              Seven or more, or a private hire
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover/more:translate-x-1" />
            </Link>

            <span className="mt-7 block h-px w-full bg-white/10" aria-hidden="true" />

            <a
              href={CONTACT.phoneHref}
              className="group/call mt-6 flex items-center gap-4 text-white/70 transition-colors hover:text-gold-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-xs text-gold-400 transition-colors duration-300 group-hover/call:border-gold-400/70">
                <FaPhoneAlt />
              </span>

              <span>
                <span className="block text-[0.5625rem] uppercase tracking-[0.1875rem] text-white/35">
                  Or call the room
                </span>

                <span className="mt-0.5 block text-[0.9375rem] tabular-nums">
                  {CONTACT.phone}
                </span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default ReservationCta;
