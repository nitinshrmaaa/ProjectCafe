"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaMugHot } from "react-icons/fa";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { NAV_LINKS } from "../../utils/constants";
import { EASE } from "../../utils/animations";

function NotFoundContent() {
  return (
    <section className="flex min-h-screen items-center bg-espresso-900 py-32">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-3xl text-gold-400">
            <FaMugHot />
          </span>

          <p className="mt-10 font-serif text-[100px] leading-none text-white/10 sm:text-[160px]">
            404
          </p>

          <h1 className="-mt-6 font-serif text-4xl text-white sm:text-5xl">
            This one is off
            <span className="gold-text italic"> the menu</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md leading-8 text-white/50">
            The page you were looking for has been moved, renamed, or never
            made it past the tasting notes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/" size="lg">
              Back to the café
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button href="/menu" variant="outline" size="lg">
              See the menu
            </Button>
          </div>

          <nav className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/40">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className="transition-colors hover:text-gold-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </Container>
    </section>
  );
}

export default NotFoundContent;
