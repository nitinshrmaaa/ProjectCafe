"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import useScroll from "../../hooks/useScroll";
import { CONTACT, NAV_LINKS } from "../../utils/constants";
import { cn, isOpenNow, todayHours } from "../../utils/helpers";

const STRIP_SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, progress } = useScroll(30);
  const pathname = usePathname();

  /** "/" only matches exactly; every other route matches its subtree. */
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const open = isOpenNow();
  const hours = todayHours();

  // The hero sits behind a transparent bar; every other route needs a solid one.
  const solid = scrolled || pathname !== "/";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-6 focus:py-3 focus:font-medium focus:text-espresso-950"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility strip — retracts as soon as the page moves */}
        <div
          aria-hidden={scrolled}
          className={cn(
            "hidden overflow-hidden border-b border-white/[0.06] bg-espresso-950/70 backdrop-blur-md transition-all duration-500 lg:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-[11px] uppercase tracking-[2px] text-white/55">
            <p className="flex items-center gap-2.5">
              <FaRegClock className="text-gold-400/80" />

              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    open ? "bg-emerald-400" : "bg-red-400"
                  )}
                />
                {open ? "Open today" : "Closed now"}
              </span>

              <span className="text-white/20">·</span>

              <span className="text-white/60">{hours.label}</span>
            </p>

            <div className="flex items-center gap-7">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-gold-300"
              >
                <FaPhoneAlt className="text-[10px] text-gold-400/80" />
                {CONTACT.phone}
              </a>

              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2.5 transition-colors hover:text-gold-300"
              >
                <FaEnvelope className="text-[10px] text-gold-400/80" />
                {CONTACT.email}
              </a>

              <span className="h-3 w-px bg-white/10" />

              <ul className="flex items-center gap-4">
                {STRIP_SOCIALS.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={name}
                      className="text-white/45 transition-colors hover:text-gold-300"
                    >
                      <Icon className="text-xs" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <nav
          aria-label="Main"
          className={cn(
            "transition-all duration-500",
            solid
              ? "border-b border-white/[0.08] bg-espresso-950/90 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-b border-white/[0.06] bg-gradient-to-b from-espresso-950/70 to-transparent backdrop-blur-sm"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 transition-all duration-500 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]",
              solid ? "h-[72px]" : "h-[86px]"
            )}
          >
            <Logo
              size={scrolled ? "sm" : "md"}
              className="justify-self-start"
            />

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-9 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.to);

                return (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block py-2 text-[12px] font-medium uppercase tracking-[2.5px] transition-colors duration-300",
                        active
                          ? "text-gold-400"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {link.name}

                      {/* Hairline that grows from the centre */}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold-400 transition-all duration-300",
                          active ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-self-end sm:gap-4">
              <a
                href={CONTACT.phoneHref}
                aria-label={`Call ${CONTACT.phone}`}
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/12 text-sm text-white/70 transition-all duration-300 hover:border-gold-400 hover:text-gold-400 xl:flex"
              >
                <FaPhoneAlt />
              </a>

              <Button href="/reserve" size="sm" className="hidden sm:inline-flex">
                Reserve a Table
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-300 hover:border-gold-400 hover:text-gold-400 lg:hidden"
              >
                <FaBars />
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <div
            className="h-px origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 transition-transform duration-150"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden="true"
          />
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
