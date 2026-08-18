"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { CONTACT } from "../../utils/constants";

const query = encodeURIComponent(CONTACT.mapQuery);

/**
 * Lazily-loaded map. The iframe only fetches once it scrolls into view,
 * so it never blocks the first paint.
 */
function MapEmbed() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
      <iframe
        title={`Map showing ${CONTACT.address.line1}`}
        src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[26.25rem] w-full grayscale-[0.6] contrast-125"
      />

      <a
        href={`https://maps.google.com/maps?q=${query}`}
        target="_blank"
        rel="noreferrer noopener"
        className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-espresso-950/90 px-5 py-4 backdrop-blur-md transition-colors hover:border-gold-400/60"
      >
        <FaMapMarkerAlt className="text-gold-400" />

        <span>
          <span className="block text-white">{CONTACT.address.line1}</span>

          <span className="block text-sm text-white/45">
            {CONTACT.address.line2}
          </span>
        </span>
      </a>
    </div>
  );
}

export default MapEmbed;
