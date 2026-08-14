/** Join conditional class names — `cn("a", cond && "b")`. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** 6.5 -> "$6.50" */
export function formatPrice(value, currency = "$") {
  const amount = typeof value === "number" ? value : parseFloat(value);

  if (Number.isNaN(amount)) return String(value);

  return `${currency}${amount.toFixed(2)}`;
}

/** Today as `YYYY-MM-DD`, for the `min` attribute of date inputs. */
export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** `YYYY-MM-DD` -> "Friday, 14 August 2026" */
export function formatDate(value) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "14:30" -> "2:30 PM" */
export function formatTime(value) {
  if (!value) return "";

  const [hour, minute] = value.split(":").map(Number);

  if (Number.isNaN(hour)) return value;

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${String(minute ?? 0).padStart(2, "0")} ${suffix}`;
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}

export function isValidPhone(value) {
  const digits = String(value).replace(/[^\d]/g, "");

  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Opening hours by weekday (Sunday = 0), as [opens, closes] in 24h.
 * Mirrors the HOURS table shown to guests — keep the two in step.
 */
const OPENING_HOURS = {
  0: [8, 21],
  1: [7, 21],
  2: [7, 21],
  3: [7, 21],
  4: [7, 21],
  5: [7, 23],
  6: [8, 23],
};

/**
 * The counter is in San Francisco, so the hours are its wall clock — never the
 * visitor's and never the server's. Reading them in a fixed zone is both the
 * correct answer for a guest in another timezone and what keeps the server and
 * client renders of the open/closed badge identical.
 */
export const TIMEZONE = "America/Los_Angeles";

const ZONED = new Intl.DateTimeFormat("en-US", {
  timeZone: TIMEZONE,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** `date` as the café sees it: `{ day: 0-6, minutes: since midnight }`. */
function zonedParts(date) {
  const parts = {};

  for (const { type, value } of ZONED.formatToParts(date)) parts[type] = value;

  return {
    day: WEEKDAYS[parts.weekday],
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

/** Today's opening times, e.g. `{ label: "7:00 AM – 9:00 PM" }`. */
export function todayHours(date = new Date()) {
  const [opens, closes] = OPENING_HOURS[zonedParts(date).day];

  const open = formatTime(`${String(opens).padStart(2, "0")}:00`);
  const close = formatTime(`${String(closes).padStart(2, "0")}:00`);

  return { opens, closes, open, close, label: `${open} – ${close}` };
}

/** Are we open right now? Used by the header, footer and contact pills. */
export function isOpenNow(date = new Date()) {
  const { day, minutes } = zonedParts(date);
  const [opens, closes] = OPENING_HOURS[day];

  return minutes >= opens * 60 && minutes < closes * 60;
}

/** Short readable id — good enough for optimistic booking references. */
export function bookingReference() {
  return `BH-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

/** Can this browser actually run the WebGL scenes? */
export function supportsWebGL() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");

    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
