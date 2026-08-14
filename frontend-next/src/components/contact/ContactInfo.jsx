"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import useOpeningStatus from "../../hooks/useOpeningStatus";
import { CONTACT, HOURS } from "../../utils/constants";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";

const CARDS = [
  {
    icon: FaMapMarkerAlt,
    label: "Find us",
    lines: [CONTACT.address.line1, CONTACT.address.line2],
  },
  {
    icon: FaPhoneAlt,
    label: "Call us",
    lines: [CONTACT.phone],
    href: CONTACT.phoneHref,
  },
  {
    icon: FaEnvelope,
    label: "Email us",
    lines: [CONTACT.email],
    href: CONTACT.emailHref,
  },
];

function ContactInfo() {
  const status = useOpeningStatus();

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-5"
    >
      {CARDS.map((card) => {
        const Icon = card.icon;

        const content = (
          <>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-400">
              <Icon />
            </span>

            <span>
              <span className="block text-[11px] uppercase tracking-[3px] text-white/40">
                {card.label}
              </span>

              {card.lines.map((line) => (
                <span key={line} className="mt-1.5 block text-white/80">
                  {line}
                </span>
              ))}
            </span>
          </>
        );

        return (
          <motion.div key={card.label} variants={fadeUp}>
            {card.href ? (
              <a
                href={card.href}
                className="card-surface flex items-start gap-5 rounded-3xl p-6 transition-colors duration-300 hover:border-gold-400/50"
              >
                {content}
              </a>
            ) : (
              <div className="card-surface flex items-start gap-5 rounded-3xl p-6">
                {content}
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Opening hours */}
      <motion.div variants={fadeUp} className="card-surface rounded-3xl p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-400">
              <FaRegClock />
            </span>

            <span className="text-[11px] uppercase tracking-[3px] text-white/40">
              Opening hours
            </span>
          </span>

          {status && (
            <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[2px] text-white/60">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status.open ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
              {status.open ? "Open" : "Closed"}
            </span>
          )}
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          {HOURS.map((entry) => (
            <div key={entry.days} className="flex justify-between gap-4">
              <dt className="text-white/45">{entry.days}</dt>
              <dd className="text-white/80">{entry.time}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </motion.div>
  );
}

export default ContactInfo;
