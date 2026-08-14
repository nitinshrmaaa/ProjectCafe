"use client";

import Link from "next/link";
import { cn } from "../../utils/helpers";

const BASE =
  "group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS = {
  primary:
    "bg-gold-400 text-espresso-950 shadow-lg shadow-gold-400/20 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-glow",
  outline:
    "border border-white/25 bg-white/5 text-cream backdrop-blur-md hover:-translate-y-0.5 hover:border-gold-400 hover:bg-white hover:text-espresso-950",
  ghost: "text-gold-300 hover:text-gold-200",
  dark: "bg-espresso-800 text-cream border border-white/10 hover:border-gold-400/60 hover:bg-espresso-700",
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base sm:text-lg",
};

/**
 * One button for the whole site.
 * An internal `href` routes through next/link; anything else (tel:, mailto:,
 * an external site) renders a plain anchor. With no href it is a button.
 */
function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size],
    className
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
