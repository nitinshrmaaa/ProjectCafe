"use client";

import Link from "next/link";
import { SITE } from "../../utils/constants";
import { cn } from "../../utils/helpers";

/**
 * Letter-spacing pads the right of the final glyph too, so each word carries a
 * matching negative margin-end. Without it the gap either side of the diamond
 * is lopsided and the lockup hangs past its own right edge.
 */
const SIZES = {
  sm: {
    word: "text-[15px]",
    track: "tracking-[0.26em] -me-[0.26em]",
    gap: "gap-2",
    diamond: "h-[3px] w-[3px]",
    sub: "mt-2.5 text-[8px] tracking-[3.5px]",
  },
  md: {
    word: "text-[19px]",
    track: "tracking-[0.28em] -me-[0.28em]",
    gap: "gap-2.5",
    diamond: "h-1 w-1",
    sub: "mt-3 text-[9px] tracking-[4px]",
  },
  lg: {
    word: "text-[27px] sm:text-[31px]",
    track: "tracking-[0.3em] -me-[0.3em]",
    gap: "gap-4",
    diamond: "h-1.5 w-1.5",
    sub: "mt-4 text-[10px] tracking-[5px]",
  },
};

/**
 * Brand lockup used in the header, drawer, footer and auth screens.
 * A pure wordmark — serif caps split by a gold diamond, no icon.
 * Renders as a link to the home page unless `as="span"`.
 */
function Logo({ size = "md", withTagline = true, onClick, className, as }) {
  const scale = SIZES[size] ?? SIZES.md;
  const Wrapper = as === "span" ? "span" : Link;
  const wrapperProps = as === "span" ? {} : { href: "/", onClick };

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={`${SITE.name} — home`}
      className={cn("group inline-flex flex-col items-start", className)}
    >
      <span
        className={cn(
          "flex items-center font-serif font-medium uppercase leading-none text-white transition-colors duration-500 group-hover:text-gold-100",
          scale.word,
          scale.gap
        )}
      >
        <span className={scale.track}>Brew</span>

        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rotate-45 bg-gold-400 transition-colors duration-500 group-hover:bg-gold-200",
            scale.diamond
          )}
        />

        <span className={scale.track}>Haven</span>
      </span>

      {withTagline && (
        <span
          className={cn(
            "flex items-center gap-2 uppercase text-white/40",
            scale.sub
          )}
        >
          {SITE.tagline}
          <span className="h-px w-4 bg-gold-400/40" />
          Est. {SITE.founded}
        </span>
      )}
    </Wrapper>
  );
}

export default Logo;
