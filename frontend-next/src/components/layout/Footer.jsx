"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "./NewsletterForm";
import Container from "../ui/Container";
import useOpeningStatus from "../../hooks/useOpeningStatus";
import { CONTACT, HOURS, NAV_LINKS, SITE } from "../../utils/constants";

const EXPLORE = [
  ...NAV_LINKS,
  { name: "Reserve a Table", to: "/reserve" },
  { name: "Sign In", to: "/login" },
];

const OFFERINGS = [
  "Single-origin espresso",
  "18-hour cold brew",
  "Pour-over flights",
  "Fresh-baked pastries",
  "Whole beans to take home",
  "Private event hire",
];

function Footer() {
  const status = useOpeningStatus();

  return (
    <footer className="noise relative overflow-hidden border-t border-white/10 bg-espresso-950">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Logo size="lg" />

            <p className="mt-6 max-w-sm leading-8 text-white/50">
              {SITE.description} Roasting in San Francisco since {SITE.founded}.
            </p>

            <NewsletterForm className="mt-8" />

            <SocialLinks className="mt-8" />
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="font-serif text-xl text-white">Explore</h3>

            <ul className="mt-6 space-y-3.5">
              {EXPLORE.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-white/50 transition-colors duration-300 hover:text-gold-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* What we serve */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white">What We Serve</h3>

            <ul className="mt-6 space-y-3.5 text-white/50">
              {OFFERINGS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white">Visit Us</h3>

            <ul className="mt-6 space-y-4 text-white/50">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gold-400" />

                <span>
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                </span>
              </li>

              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-gold-400" />

                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-gold-300"
                >
                  {CONTACT.phone}
                </a>
              </li>

              <li className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-gold-400" />

                <a
                  href={CONTACT.emailHref}
                  className="transition-colors hover:text-gold-300"
                >
                  {CONTACT.email}
                </a>
              </li>

              <li className="flex gap-3">
                <FaRegClock className="mt-1 shrink-0 text-gold-400" />

                <span>
                  {HOURS[0].days.replace(" – ", "–")}
                  <br />
                  {HOURS[0].time}
                </span>
              </li>
            </ul>

            {status && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[3px] text-white/60">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.open ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                {status.open ? "Open now" : "Closed now"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/35 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} Coffee House. All rights
            reserved.
          </p>

          <p className="flex gap-6">
            <Link href="/contact" className="transition-colors hover:text-gold-300">
              Privacy
            </Link>

            <Link href="/contact" className="transition-colors hover:text-gold-300">
              Terms
            </Link>

            <Link href="/contact" className="transition-colors hover:text-gold-300">
              Careers
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
