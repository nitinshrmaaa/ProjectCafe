"use client";

import { cn } from "../../utils/helpers";

/** Surface tone. Alternating these stops the page reading as one flat slab. */
const TONES = {
  base: "bg-espresso-900",
  deep: "bg-espresso-950",
  raised: "bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900",
  // No surface of its own — for sections that sit over a backdrop shared with
  // whatever is above them, and supply their own wash instead.
  none: "bg-transparent",
};

/** Vertical rhythm. Not every section deserves the same breathing room. */
const SPACES = {
  tight: "py-16 lg:py-24 3xl:py-32",
  normal: "py-20 lg:py-28 3xl:py-40",
  tall: "py-24 lg:py-36 3xl:py-48",
};

/**
 * Where the warm bloom sits, varied per section so the light moves down the
 * page. Sized in rem against a viewport that can now be twice as wide, so the
 * blooms grow with the screen — a 32rem glow on a 2560 display is a spot,
 * not the wash of light it is on a laptop.
 */
const GLOWS = {
  top: "left-1/2 top-[-16rem] h-[30rem] w-[46rem] -translate-x-1/2 bg-gold-500/[0.07] 3xl:h-[42rem] 3xl:w-[64rem]",
  left: "left-[-14rem] top-[18%] h-[32rem] w-[32rem] bg-mocha/15 3xl:h-[46rem] 3xl:w-[46rem]",
  right: "right-[-14rem] bottom-[8%] h-[32rem] w-[32rem] bg-gold-500/[0.09] 3xl:h-[46rem] 3xl:w-[46rem]",
};

/**
 * Shared shell for the long-scroll sections.
 *
 * Carries the three things that were being repeated by hand and kept drifting:
 * the surface tone, the vertical rhythm, and a blurred warm bloom. Grain sits
 * over the whole thing — large flat darks band badly without it.
 */
function Section({
  id,
  tone = "base",
  space = "normal",
  glow,
  divider = false,
  className,
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={cn(
        "noise relative overflow-hidden",
        TONES[tone] ?? TONES.base,
        SPACES[space] ?? SPACES.normal,
        className
      )}
      {...rest}
    >
      {/* Hairline and diamond, echoing the wordmark's separator. */}
      {divider && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex items-center px-8"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="mx-5 h-1.5 w-1.5 rotate-45 bg-gold-400/60" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      )}

      {glow && GLOWS[glow] && (
        <div
          className={cn(
            "pointer-events-none absolute rounded-full blur-[140px]",
            GLOWS[glow]
          )}
          aria-hidden="true"
        />
      )}

      {children}
    </section>
  );
}

export default Section;
