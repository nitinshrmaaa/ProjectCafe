"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaPhoneAlt, FaEnvelope, FaRegClock } from "react-icons/fa";
import Logo from "./Logo";
import Button from "../ui/Button";
import SocialLinks from "./SocialLinks";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { CONTACT, NAV_LINKS } from "../../utils/constants";
import { cn, isOpenNow, todayHours } from "../../utils/helpers";
import { EASE } from "../../utils/animations";

/** Slide-in navigation drawer for small screens. */
function MobileMenu({ open, onClose }) {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useLockBodyScroll(open);

  // Close on route change and on Escape.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-espresso-900 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
              <Logo size="sm" withTagline={false} onClick={onClose} />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index + 0.1, ease: EASE }}
                  >
                    <Link
                      href={link.to}
                      onClick={onClose}
                      aria-current={isActive(link.to) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-5 py-4 font-serif text-2xl transition-colors",
                        isActive(link.to)
                          ? "bg-gold-400/10 text-gold-400"
                          : "text-white/85 hover:bg-white/5 hover:text-gold-300"
                      )}
                    >
                      {link.name}

                      <span className="text-xs tracking-[4px] text-white/25">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm text-white/60">
                <p className="flex items-center gap-3">
                  <FaRegClock className="text-gold-400" />

                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isOpenNow() ? "bg-emerald-400" : "bg-red-400"
                      )}
                    />
                    {isOpenNow() ? "Open today" : "Closed now"} ·{" "}
                    {todayHours().label}
                  </span>
                </p>

                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-gold-300"
                >
                  <FaPhoneAlt className="text-gold-400" />
                  {CONTACT.phone}
                </a>

                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-3 transition-colors hover:text-gold-300"
                >
                  <FaEnvelope className="text-gold-400" />
                  {CONTACT.email}
                </a>
              </div>
            </nav>

            <div className="space-y-6 border-t border-white/10 px-6 py-7">
              <Button href="/reserve" className="w-full" onClick={onClose}>
                Reserve a Table
              </Button>

              <SocialLinks className="justify-center" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
