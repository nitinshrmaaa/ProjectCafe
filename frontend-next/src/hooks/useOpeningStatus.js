"use client";

import { useEffect, useState } from "react";
import { isOpenNow, todayHours } from "../utils/helpers";

function read() {
  return { open: isOpenNow(), hours: todayHours() };
}

/**
 * Live open/closed state for the header, footer and contact pills.
 *
 * Returns `null` until the component has mounted. Every route here is
 * prerendered, so any status baked into the HTML is as old as the last build
 * and would disagree with the browser the moment it hydrates. Staying empty for
 * the first render is what keeps server and client markup identical; callers
 * render the pill only once this resolves.
 *
 * The times themselves are read in the café's own timezone (see `TIMEZONE`),
 * so a guest abroad sees whether *San Francisco* is pouring, not their own
 * breakfast hour. The interval is only here so a badge painted at 6:59 flips
 * at 7:00 without a reload.
 */
function useOpeningStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Keep the old object when nothing changed — otherwise every tick
    // re-renders the whole header for a value that is identical.
    const tick = () =>
      setStatus((prev) => {
        const next = read();

        return prev &&
          prev.open === next.open &&
          prev.hours.label === next.hours.label
          ? prev
          : next;
      });

    tick();

    const id = setInterval(tick, 30_000);

    return () => clearInterval(id);
  }, []);

  return status;
}

export default useOpeningStatus;
