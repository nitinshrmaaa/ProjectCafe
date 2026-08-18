"use client";

import { cn } from "../../utils/helpers";

/** Small inline spinner — a rotating coffee-gold ring. */
export function Spinner({ className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent",
        className
      )}
    />
  );
}

/** Full-viewport fallback shown while a lazily-loaded route arrives. */
function Loader({ label = "Brewing…" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-espresso-900">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-gold-400/60" />
        <Spinner className="h-10 w-10 text-gold-400" />
      </div>

      <p className="text-xs uppercase tracking-[0.5rem] text-gold-300/80">
        {label}
      </p>
    </div>
  );
}

export default Loader;
