"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "../layout/Logo";
import { EASE } from "../../utils/animations";

/** Split-screen shell shared by the sign-in and sign-up routes. */
function AuthLayout({ image, title, subtitle, quote, children }) {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Visual half */}
      <div className="relative hidden lg:block">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="50vw"
          priority
          placeholder="blur"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/60 to-espresso-950/30" />

        <div className="absolute inset-x-0 bottom-0 p-14">
          <Logo size="lg" />

          <p className="mt-8 max-w-md font-serif text-2xl italic leading-relaxed text-white/80">
            “{quote}”
          </p>
        </div>
      </div>

      {/* Form half */}
      <div className="flex items-center justify-center px-5 py-32 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md"
        >
          <h1 className="font-serif text-4xl text-white sm:text-5xl">{title}</h1>

          <p className="mt-4 leading-8 text-white/50">{subtitle}</p>

          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default AuthLayout;
