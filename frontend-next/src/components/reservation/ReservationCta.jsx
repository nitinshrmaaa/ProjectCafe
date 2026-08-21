"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import Container from "../ui/Container";
import useOpeningStatus from "../../hooks/useOpeningStatus";
import { CONTACT } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import { fadeUp, viewportOnce } from "../../utils/animations";
import backdrop from "../../assets/images/hero/hero7.jpg";

/**
 * The booking prompt between the menu and the gallery.
 *
 * One card, centred, and nothing outside it.
 *
 * The version this replaces was two columns: a text column ranged left against
 * a booking panel on the right. The panel worked — it asks the party size here
 * and carries the answer into the form, which is the whole idea and it stays.
 * The other column was the problem. It had lost its heading, so it opened on a
 * paragraph; under that came a live status line, then a schedule of the day,
 * then a row of three figures. Four blocks of unrelated shape stacked down one
 * side, each added to fill the space the last one failed to fill. Nothing in it
 * was wrong on its own, and the whole was a column of leftovers.
 *
 * So the band asks one question now and gives one way to answer it. Everything
 * that survived is inside a single card in the middle: the line about weekends
 * that explains why booking matters at all, the live state of the room, the
 * question, the six numbers, and the two ways out for anyone the six do not
 * cover. The sections either side of this one are wide and full of things; this
 * is a held breath between the menu and the gallery, and it should be the
 * quietest thing on the page rather than the busiest.
 *
 * Centring is also the honest answer to what the two-column version kept
 * getting wrong. A column ranged left beside a panel centred on itself has to
 * argue about where every line starts, and that argument was most of the last
 * ten changes. One card on the middle axis has no such argument to lose: the
 * photograph is symmetric behind it, the washes are symmetric across it, and
 * every line inside it hangs from the same centre.
 */

/* One through six covers almost every booking; the rest go through the form,
   which offers up to twelve. */
const QUICK_SIZES = [1, 2, 3, 4, 5, 6];

/* Hover and keyboard-focus resolve to the same filled state — the old focus
   style was a border colour change on a chip whose hover fills it gold, so a
   keyboard user got a hint where a mouse user got an answer. Both variants are
   carried down to the number and the label as well: fill the chip gold and
   leave the text gold and there is nothing left to read. */
const CHIP =
  "group/chip flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.04] py-6 3xl:py-7 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-400/20 focus-visible:border-gold-400 focus-visible:bg-gold-400 active:translate-y-0 active:bg-gold-300 active:duration-75";

function ReservationCta() {
  const status = useOpeningStatus();

  return (
    <section className="noise relative overflow-hidden">
      {/* hero7 is 3:2, so covering a wide band crops it top and bottom and
          leaves it near its native resolution — a portrait source gets enlarged
          past four times its own width and arrives as a grey smear. It is also
          lit the way the rest of the page is lit: amber ceiling lamps over dark
          wood. */}
      <Image
        src={backdrop}
        alt=""
        aria-hidden="true"
        fill
        // Capped the way MenuBackdrop caps it: the band is full-bleed, but a
        // 2560 monitor asking for 100vw pulls the 3840 candidate for a picture
        // that is about to be blurred by 3px and buried under two washes.
        sizes="(max-width: 1024px) 100vw, 1600px"
        // 55 because next.config lists [55, 75] and silently rounds anything
        // else to the nearer of the two; full-quality detail here would be
        // bandwidth spent on detail the blur takes straight back out.
        quality={55}
        placeholder="blur"
        // 105% because a blur samples past the edges of its own box, so at 1:1
        // the picture feathers into nothing down all four sides. Held slightly
        // above centre to keep the lamps in frame.
        className="scale-105 object-cover object-[center_42%] blur-[3px]"
      />

      {/* Symmetric now, where it used to be heaviest on the left. That ramp
          existed to bury the photograph under a column of type on one side and
          let it live on the other; with the type gathered into the middle there
          is no side to favour, and an asymmetric wash under a centred card is
          just a lopsided room. Deepest at both edges, lightest through the
          middle third — which is where the card sits, and where the picture can
          afford to come up behind it. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-espresso-950/90 via-espresso-950/62 to-espresso-950/90"
        aria-hidden="true"
      />

      {/* And a pass down the edges, so the band opens on the espresso the menu
          closes with and lands on the espresso the gallery opens with. Neither
          join can show the picture starting.

          Explicit stops rather than from/via/to: the three-stop shorthand puts
          its transparent stop at the halfway mark and ramps to fully opaque
          across the entire half above and below it, which left the photograph
          alive only along a single horizontal line through the middle. Holding
          the solid colour to the first and last sixth seals both joins just as
          completely and gives the picture the rest of the band. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-espresso-900) 0%, transparent 16%, transparent 84%, var(--color-espresso-950) 100%)",
        }}
        aria-hidden="true"
      />

      {/* A low bloom of the signature gold, centred behind the card. The washes
          are a neutral near-black and photographs read cold under them; this
          puts the warmth back, and puts it where the eye is going. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(58% 78% at 50% 48%, rgb(212 167 98 / 0.13), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-24 lg:py-32 3xl:py-40">
        {/* The card arrives as one piece rather than as six staggered ones. A
            stagger draws a line down whatever it animates, which is the last
            thing a composition built to hang off a single centre axis needs.

            The scrim under the glass is the reason the card can sit over the
            lightest part of the wash at all. `.glass` is 6% white — an additive
            surface that lightens what it is laid over rather than covering it —
            so on its own it leaves small type reading against a lit photograph,
            which measured between 2.7:1 and 3.5:1 here. `isolate` plus `-z-10`
            puts the scrim behind every child without wrapping the contents in
            another positioned div, and it lands above the element's own
            background, so the glass tint and the border survive on top of it.
            It carries the card's radius itself rather than being cut to shape
            by `overflow-hidden`, because an item that hides its overflow has an
            automatic minimum size of zero and will quietly clip its own text
            rather than hold its width open. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          /* Widths that track the band instead of ignoring it. At 3xl the
             Container runs 1664px of content and the card used to take 896 of
             it, which left it a small box with 380px of empty band down either
             side — centred, and adrift, which is not the same thing. It now
             steps up with the tiers and stops at 1280, an inset of ~190px a
             side that reads as margin rather than as a shortfall.

             Capped rather than uncapped for the chips' sake: let the card have
             the whole 1664 and each of the six is 242px wide by 88 tall, which
             is not a chip, it is a bar. */
          className="glass relative isolate mx-auto w-full max-w-3xl rounded-[2.5rem] px-6 py-12 before:absolute before:inset-0 before:-z-10 before:rounded-[2.5rem] before:bg-espresso-950/55 sm:max-w-none sm:px-10 sm:py-14 lg:max-w-5xl lg:px-14 xl:max-w-6xl 3xl:max-w-[80rem] 3xl:px-20 3xl:py-20 4xl:max-w-[88rem]"
        >
          {/* The live line, first, because it is the only thing in this band
              that is true only right now. It renders nothing until the hook has
              resolved in the browser — the route is prerendered, and a status
              baked into the HTML would be as old as the last build — so the row
              holds its height either way rather than appearing after first
              paint and pushing the card's contents down.

              The pill borrows the chips' resting surface exactly, same 12%
              border and same 4% fill, so the two are made of one material. */}
          <div className="flex h-9 items-center justify-center">
            {status && (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-3 pr-4 text-sm">
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

                <span className="text-white/75">
                  {status.open ? "Open now" : "Closed"}
                  <span className="text-white/45">
                    {" · "}
                    {status.open ? "today until " : "today "}
                    {status.open ? status.hours.close : status.hours.label}
                  </span>
                </span>
              </span>
            )}
          </div>

          {/* h2, and the only heading in the band. An h3 with nothing above it
              would sit under the hero's h1 with a rung missing. */}
          <h2 className="mt-7 text-center font-serif text-3xl leading-tight text-white sm:text-4xl 3xl:text-5xl">
            How many are coming?
          </h2>

          <p /* The card widened; this did not, past a point. A centred line of
              prose stops being readable somewhere around 70 characters however
              much room it is given, so the measure holds while the box around
              it grows — which is what makes the space inside the card read as
              deliberate rather than as a paragraph that failed to fill it. */
            className="mx-auto mt-5 max-w-lg text-center leading-8 text-white/60 3xl:mt-6 3xl:max-w-xl 3xl:text-lg 3xl:leading-9">
            Weekday mornings are usually calm. Weekend brunch books out by
            Thursday — reserve online in under a minute.
          </p>

          {/* Six answers to the question above them, each a link that carries
              its number into the form rather than a control that has to be
              submitted. Marked up as a list because that is what six sibling
              choices are: it costs nothing visually — preflight strips the
              markers — and it is the difference between hearing "link, link,
              link…" and hearing how many answers the question has. */}
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4 3xl:mt-12 3xl:gap-5">
            {QUICK_SIZES.map((size) => (
              <li key={size}>
                <Link
                  href={`/reserve?guests=${size}`}
                  aria-label={`Reserve a table for ${size}`}
                  className={CHIP}
                >
                  {/* tabular-nums so the six figures share one advance width.
                      Playfair's default figures are proportional — "1" is a
                      narrow glyph in a narrow box — so each number was being
                      centred against a different width. */}
                  <span className="font-serif text-2xl leading-none tabular-nums text-gold-400 transition-colors duration-300 group-hover/chip:text-espresso-950 group-focus-visible/chip:text-espresso-950 sm:text-3xl 3xl:text-4xl">
                    {size}
                  </span>

                  {/* leading-none because this span would otherwise inherit
                      `normal` — a 15px line box around 10px of capitals, five
                      of which are empty space below the glyphs. Centring works
                      on line boxes, not on ink, so that space pulled the pair
                      off the middle of the chip. The indent is the tracking
                      correction: letter-spacing adds its 2px after the final
                      letter too, so a centred line lands 1px left of centre. */}
                  <span className="indent-[0.0625rem] text-[0.625rem] uppercase leading-none tracking-[0.125rem] text-white/55 transition-colors duration-300 group-hover/chip:text-espresso-950/70 group-focus-visible/chip:text-espresso-950/70">
                    {size === 1 ? "Guest" : "Guests"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Centred by its wrapper rather than by turning the link into a
              full-width flex row, which would give a line of prose a hit area
              the width of the card. pl-5 is the optical correction: the arrow
              renders at 1em, so it and its gap occupy 20px to the right of the
              words, and without the same 20px padded on the left the words sit
              half an arrow left of the centre everything else uses. */}
          <div className="mt-8 text-center 3xl:mt-9">
            <Link
              href="/reserve"
              className="group/more inline-flex items-center gap-2 pl-5 text-sm text-white/65 transition-colors hover:text-gold-300"
            >
              Seven or more, or a private hire
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover/more:translate-x-1" />
            </Link>
          </div>

          <span
            className="mt-10 block h-px w-full bg-white/10 3xl:mt-12"
            aria-hidden="true"
          />

          {/* Stacked, not ranged beside the dial. Centring the icon and the
              text as one horizontal unit is the right answer in a card that is
              ranged left, and the wrong one here: the pair sits on the axis but
              nothing inside it does, so the label and the number hang to the
              right of centre while every other line in the card is centred on
              it. In a composition where the axis is the whole idea, one block
              quietly ignoring it is the thing the eye catches.

              So the dial goes above and the two lines centre under it, and the
              label carries the same trailing-letter-space correction as the
              rest — 3px of tracking is added after its final letter too, so a
              centred line lands 1.5px left of true centre without it. */}
          <a
            href={CONTACT.phoneHref}
            className="group/call mt-8 flex flex-col items-center gap-3 3xl:mt-9 text-white/70 transition-colors hover:text-gold-300"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-xs text-gold-400 transition-colors duration-300 group-hover/call:border-gold-400/70">
              <FaPhoneAlt />
            </span>

            <span className="text-center">
              <span className="block indent-[0.09375rem] text-[0.625rem] uppercase tracking-[0.1875rem] text-white/55">
                Or call the room
              </span>

              <span className="mt-1 block text-[0.9375rem] tabular-nums">
                {CONTACT.phone}
              </span>
            </span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default ReservationCta;
