"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Container from "./Container";
import { EASE } from "../../utils/animations";

/**
 * Masthead for the inner routes: title, lede and a breadcrumb.
 * `name` is the short route label for the breadcrumb — `title` is usually
 * the first line of a headline and reads badly as a crumb on its own.
 */
function PageHeader({ name, eyebrow, title, highlight, description, image }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
            placeholder="blur"
            className="object-cover"
          />

          <div
            className="absolute inset-0 bg-gradient-to-b from-espresso-950/90 via-espresso-950/80 to-espresso-900"
            aria-hidden="true"
          />
        </>
      )}

      <Container className="relative text-center">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center gap-3 text-xs text-white/40"
        >
          <Link href="/" className="transition-colors hover:text-gold-300">
            Home
          </Link>

          <FaChevronRight className="text-[0.5rem]" />

          <span className="text-gold-400">{name ?? eyebrow ?? title}</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mt-6 font-serif text-5xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
        >
          {title}

          {highlight && (
            <>
              <br />
              <span className="gold-text italic font-normal">{highlight}</span>
            </>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg sm:leading-9"
          >
            {description}
          </motion.p>
        )}
      </Container>
    </header>
  );
}

export default PageHeader;
