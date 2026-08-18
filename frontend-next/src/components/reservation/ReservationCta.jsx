"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { CONTACT } from "../../utils/constants";
import { fadeUp, viewportOnce } from "../../utils/animations";
import backdrop from "../../assets/images/hero/hero6.jpg";

/** Full-width booking prompt used between sections on the home page. */
function ReservationCta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={backdrop}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />

      <div
        className="absolute inset-0 bg-espresso-950/85"
        aria-hidden="true"
      />

      <Container className="relative py-24 text-center lg:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.375rem] text-gold-400">
            Reservations
          </span>

          <h2 className="mt-6 font-serif text-4xl leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            Save a seat by the
            <span className="gold-text italic"> window</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-8 text-white/60">
            Weekday mornings are usually calm. Weekend brunch books out by
            Thursday — reserve online in under a minute.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/reserve" size="lg" className="w-full sm:w-auto">
              Reserve a table
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              href={CONTACT.phoneHref}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <FaPhoneAlt className="text-sm" />
              {CONTACT.phone}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default ReservationCta;
