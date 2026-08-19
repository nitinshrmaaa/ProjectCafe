"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight, FaBars } from "react-icons/fa";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import useOpeningStatus from "../../hooks/useOpeningStatus";
import { useScrolledPast } from "../../hooks/useScroll";
import ReadingProgress from "./ReadingProgress";
import { NAV_LINKS } from "../../utils/constants";
import { cn } from "../../utils/helpers";

/**
 * A single slim row: wordmark and opening status left, tracked caps right.
 * Phone and social links live in the footer and on the contact page — the
 * header stays out of the way of the photography behind it.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(30);
  const pathname = usePathname();
  const status = useOpeningStatus();

  /** "/" only matches exactly; every other route matches its subtree. */
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
        <nav
          aria-label="Main"
          className={cn(
            "transition-all duration-500",
            solid
              ? "border-b border-white/[0.07] bg-espresso-950/85 backdrop-blur-xl"
              : // Nothing at all over the hero. The bar used to carry its own
                // dark wash, which read as a black band ruled across the top of
                // the photograph — and it was never needed: Hero.jsx already
                // lays espresso-950/85 over exactly this area, so the links
                // keep their contrast without the header adding a second one.
                "border-b border-transparent bg-transparent"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 transition-all duration-500 sm:px-8",
              solid ? "h-[4.25rem]" : "h-20 sm:h-[5.5rem]"
            )}
          >
            <div className="flex items-center gap-5 xl:gap-7">
              <Logo size={scrolled ? "sm" : "md"} withTagline={false} />

              {/* Resolves after mount — see useOpeningStatus. The hours only
                  join it on the widest screens so the row never crowds. */}
              {status && (
                <span className="hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.625rem] uppercase tracking-[0.125rem] text-white/55 backdrop-blur-md lg:flex">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      status.open ? "bg-emerald-400" : "bg-red-400"
                    )}
                  />

                  {status.open ? "Open" : "Closed"}

                  <span className="hidden items-center gap-2.5 xl:flex">
                    <span className="text-white/20">·</span>
                    <span className="text-white/70">{status.hours.label}</span>
                  </span>
                </span>
              )}
            </div>

            {/* Desktop navigation */}
            <div className="hidden items-center lg:flex">
              <ul className="flex items-center gap-8 xl:gap-9">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.to);

                  return (
                    <li key={link.to}>
                      <Link
                        href={link.to}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative block py-2 text-[0.71875rem] uppercase tracking-[0.15625rem] transition-colors duration-300",
                          active
                            ? "text-gold-400"
                            : "text-white/60 hover:text-white"
                        )}
                      >
                        {link.name}

                        {/* Hairline that grows from the centre */}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold-400 transition-all duration-300",
                            active ? "w-full" : "w-0 group-hover:w-full"
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Over the hero the bar has no background of its own, so a
                  white/15 hairline disappears into the photograph and Reserve
                  reads as a sixth nav link. Solid enough to survive any frame,
                  and `shrink-0` so a crowded row can never collapse it. */}
              {/* The gap is deliberately much wider than the 32px between nav
                  links — that contrast is the whole signal that Reserve is an
                  action and not a sixth destination. It stays smaller at lg,
                  where the row has only ~100px of slack left. */}
              <span
                className="mx-16 h-4 w-px shrink-0 bg-white/30 xl:mx-20"
                aria-hidden="true"
              />

              {/* The one gold thing in the bar, so it reads as the action
                  without needing a filled button to shout it. */}
              <Link
                href="/reserve"
                className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[0.71875rem] font-medium uppercase tracking-[0.15625rem] text-gold-400 transition-colors duration-300 hover:text-gold-200"
              >
                Reserve
                <FaArrowRight className="text-[0.5625rem] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

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

          {/* Reading progress — its own component so that the one element
              that changes on scroll is the only one that re-renders. */}
          <ReadingProgress />
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
