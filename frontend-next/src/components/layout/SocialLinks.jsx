"use client";

import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SOCIALS } from "../../utils/constants";
import { cn } from "../../utils/helpers";

const ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  pinterest: FaPinterestP,
};

function SocialLinks({ className }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIALS.map((social) => {
        const Icon = ICONS[social.icon] ?? FaInstagram;

        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:bg-gold-400 hover:text-espresso-950"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
