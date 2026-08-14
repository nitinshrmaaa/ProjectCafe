"use client";

import Link from "next/link";
import { SITE } from "../../utils/constants";
import { cn } from "../../utils/helpers";

const SIZES = {
  sm: { mark: "h-9 w-9", word: "text-xl", sub: "text-[8px] tracking-[4px]" },
  md: { mark: "h-11 w-11", word: "text-[26px]", sub: "text-[9px] tracking-[4.5px]" },
  lg: { mark: "h-14 w-14", word: "text-4xl", sub: "text-[10px] tracking-[6px]" },
};

/** Hand-drawn coffee bean inside a hairline ring — the house mark. */
function BeanMark({ className }) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        className
      )}
    >
      {/* Ring */}
      <span className="absolute inset-0 rounded-full border border-gold-400/35" />

      {/* Soft inner glow so the mark reads on photography */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400/15 to-transparent" />

      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="relative h-[58%] w-[58%] text-gold-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <g transform="rotate(-32 20 20)">
          <ellipse cx="20" cy="20" rx="10" ry="15" />
          <path d="M20 5.5c-4.4 4.8-4.4 9.7 0 14.5s4.4 9.7 0 14.5" />
        </g>
      </svg>
    </span>
  );
}

/**
 * Brand lockup used in the header, drawer, footer and auth screens.
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
      className={cn("group flex items-center gap-3.5", className)}
    >
      <BeanMark
        className={cn(
          scale.mark,
          "transition-transform duration-500 group-hover:rotate-12"
        )}
      />

      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "font-serif font-semibold leading-none tracking-tight text-white",
            scale.word
          )}
        >
          Brew{" "}
          <span className="italic font-normal text-gold-400">Haven</span>
        </span>

        {withTagline && (
          <span
            className={cn(
              "mt-2 flex items-center gap-2 uppercase text-white/40",
              scale.sub
            )}
          >
            {SITE.tagline}
            <span className="h-px w-4 bg-gold-400/40" />
            Est. {SITE.founded}
          </span>
        )}
      </span>
    </Wrapper>
  );
}

export default Logo;
