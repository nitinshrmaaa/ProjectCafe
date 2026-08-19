"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuFeatureCard from "./MenuFeatureCard";
import { featuredItems } from "./menuData";
import useFavorites from "../../hooks/useFavorites";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn } from "../../utils/helpers";
import { EASE, stagger, viewportRepeat } from "../../utils/animations";

/** How long a page holds before the track moves itself along. */
const INTERVAL = 5000;

/**
 * One card per screen on a phone, two from md, three from lg, four from 3xl —
 * set as flex bases that subtract the gaps, so the cards and the gaps between
 * them come to exactly the width of the track and a page is one clean
 * screenful rather than n cards and a sliver of another.
 *
 * The fourth is the whole point of the 3xl tier. Three cards across a 2560
 * display either leave the track short or stretch each card into a billboard;
 * a fourth uses the width the way a wider screen is supposed to be used, and
 * turns six drinks into a page and a half instead of two sparse ones.
 */
const SLIDE =
  "shrink-0 grow-0 snap-start basis-full md:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)] 3xl:basis-[calc((100%-3.75rem)/4)]";

/** The cards are landscape, so a page wants depth rather than height. */
const SLIDE_HEIGHT = "h-56 lg:h-60 2xl:h-72 3xl:h-80";

/**
 * The buttons live in a gutter the track leaves for them, so they sit beside
 * the cards rather than on top of them. Half a button laid over the first and
 * last card is the detail that makes a carousel look bolted on.
 */
const GUTTER = "relative md:px-16 lg:px-20 3xl:px-24";

const CONTROL =
  "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-espresso-950/60 text-sm text-cream/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-400/70 hover:bg-gold-400 hover:text-espresso-950 hover:shadow-glow focus-visible:border-gold-400 active:scale-95 md:flex";

/** 1 -> "01" */
const pad = (value) => String(value).padStart(2, "0");

/**
 * The six featured drinks, on a track.
 *
 * Built on native scroll snapping rather than a transform slider, which is
 * what makes it feel like the rest of the web instead of a widget: a phone
 * swipes it with its own momentum, a trackpad flicks it sideways, a keyboard
 * can tab to it and use the arrow keys, and the browser does the easing. The
 * buttons, the rules and the count below all drive and read that same scroll,
 * so every way in agrees with every other one — the indicator cannot claim
 * page two while the track sits between pages.
 *
 * Pages are counted from the track's own measurements rather than assumed from
 * the breakpoint, so the count follows whatever the layout actually did.
 *
 * It advances itself every five seconds and stops the moment a pointer is over
 * it, anything inside it takes focus, or the visitor has asked for reduced
 * motion — the controls are always there either way, so nothing here depends
 * on waiting.
 *
 * `onAdvance` fires on every change of page, however it was caused. The
 * headline above listens for it and turns its words over on the same beat, so
 * the two read as one thing moving rather than two things moving separately.
 */
function MenuCarousel({ onAdvance }) {
  const { isFavorite, toggle } = useFavorites();
  const reducedMotion = useReducedMotion();
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const element = track.current;

    if (!element || !element.clientWidth) return;

    setPages(Math.max(1, Math.round(element.scrollWidth / element.clientWidth)));
    setPage(Math.round(element.scrollLeft / element.clientWidth));
  }, []);

  useEffect(() => {
    const element = track.current;

    if (!element) return;

    measure();

    const onScroll = () =>
      setPage(Math.round(element.scrollLeft / element.clientWidth));

    element.addEventListener("scroll", onScroll, { passive: true });

    // The page count is a function of the track's width, so it has to be taken
    // again whenever the track is resized — a breakpoint listener would miss
    // the window being dragged wider on a desktop browser.
    const observer = new ResizeObserver(measure);

    observer.observe(element);

    return () => {
      element.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [measure]);

  // Announce every change of page, but not the first render's settle.
  const settled = useRef(false);

  useEffect(() => {
    if (!settled.current) {
      settled.current = true;

      return;
    }

    onAdvance?.();
  }, [page, onAdvance]);

  const goTo = useCallback(
    (target) => {
      const element = track.current;

      if (!element) return;

      const next = (target + pages) % pages;

      element.scrollTo({
        left: next * element.clientWidth,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [pages, reducedMotion]
  );

  useEffect(() => {
    if (paused || reducedMotion || pages < 2) return;

    const timer = setInterval(() => goTo(page + 1), INTERVAL);

    return () => clearInterval(timer);
  }, [goTo, page, pages, paused, reducedMotion]);

  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  return (
    <div
      className={GUTTER}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={release}
      onTouchStart={hold}
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        aria-label="Previous drinks"
        className={cn(CONTROL, "left-0")}
      >
        <FaChevronLeft />
      </button>

      {/* The cards present themselves one after another whenever the section
          comes into view — the same entrance the story's collage makes one
          screen up, down to the 0.16s between them and the `viewportRepeat`
          that replays it on every visit rather than only the first. Scroll
          away and back and the six open again instead of sitting there
          already arrived.

          The cards were already asking for this: each one carries the
          `scaleIn` variant, but building the carousel dropped the parent that
          releases them, so they were being drawn with no entrance at all.
          Framer passes the state down through context, so the plain slide
          wrappers in between do not break the chain.

          `tabIndex` so the track is reachable by keyboard: once it has focus
          the arrow keys scroll it, which is the browser's own behaviour and
          better than anything re-implemented on top. The scrollbar is hidden
          because the rules below say the same thing in the page's own
          language — the scrolling itself is untouched. */}
      <motion.div
        ref={track}
        variants={stagger(0.16)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured drinks"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth rounded-3xl [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {featuredItems.map((item) => (
          <div key={item.id} className={cn(SLIDE, SLIDE_HEIGHT)}>
            <MenuFeatureCard
              item={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggle}
            />
          </div>
        ))}
      </motion.div>

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        aria-label="More drinks"
        className={cn(CONTROL, "right-0")}
      >
        <FaChevronRight />
      </button>

      {/* The count set like a plate number — the page you are on large in gold
          serif, the total small and quiet behind a hairline slash — beside one
          continuous rule with a gold length travelling along it.

          Separate rules with gaps between them were a row of controls; one
          rule with a marker moving down it is a measure of how far through you
          are, which is the thing actually worth saying. The click targets are
          still one per page, laid over the rule and invisible, so nothing is
          lost by it reading as a single line.

          The row keeps its height whether or not there is anything in it — how
          many pages there are is only known once the track has been measured
          in the browser, and rendering it conditionally would drop it in after
          first paint and shove the link below it down the page. */}
      <div className="mt-8 flex h-8 items-center justify-center gap-6">
        {pages > 1 && (
          <>
            <span className="flex items-baseline gap-2 font-serif tabular-nums">
              <span className="text-2xl leading-none text-gold-400">
                {pad(page + 1)}
              </span>

              <span className="text-white/20" aria-hidden="true">
                /
              </span>

              <span className="text-sm leading-none text-white/35">
                {pad(pages)}
              </span>
            </span>

            <span className="relative h-px w-32 bg-white/15 sm:w-44">
              <motion.span
                // Two pixels tall over a one-pixel rule, pulled up a pixel so
                // it sits centred on the line rather than under it.
                className="absolute -top-px block h-0.5 rounded-full bg-gold-400"
                animate={{
                  left: `${(page * 100) / pages}%`,
                  width: `${100 / pages}%`,
                }}
                transition={
                  reducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }
                }
                aria-hidden="true"
              />

              {Array.from({ length: pages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show drinks ${index + 1} of ${pages}`}
                  aria-current={index === page}
                  style={{ left: `${(index * 100) / pages}%`, width: `${100 / pages}%` }}
                  className="absolute -top-3 h-6"
                />
              ))}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuCarousel;
