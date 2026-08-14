"use client";

import { FaStar } from "react-icons/fa";
import { cn } from "../../utils/helpers";

/** Accessible five-star rating display. */
function Rating({ value = 5, max = 5, className, size = "text-sm" }) {
  return (
    <div
      className={cn("flex items-center gap-1 text-gold-400", size, className)}
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, index) => (
        <FaStar
          key={index}
          className={index < Math.round(value) ? "" : "text-white/15"}
        />
      ))}
    </div>
  );
}

export default Rating;
