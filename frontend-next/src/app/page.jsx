import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Menu from "@/components/menu/Menu";
import ReservationCta from "@/components/reservation/ReservationCta";
import Gallery from "@/components/gallery/Gallery";
import Testimonials from "@/components/testimonials/Testimonials";
import Contact from "@/components/contact/Contact";
import Image from "next/image";
import { SITE } from "@/utils/constants";
import backdrop from "@/assets/images/hero/hero4.jpg";

export const metadata = {
  title: "Artisan Coffee House & Roastery",
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/*
       * A single photograph behind both screens. The wrapper is roughly two
       * viewports tall and the image covers all of it, so the hero frames the
       * top of the picture and the story the bottom — one background, one
       * colour tone by construction, but a different view on each screen.
       * Neither section carries a picture of its own; both only wash over this
       * one, which is why no boundary can appear between them.
       *
       * It is softened slightly so the type and the collage sit forward of it.
       * The scale is what makes the blur usable: a blur samples past the edges
       * of its own box, so at 1:1 the picture would feather into nothing down
       * all four sides — 105% pushes those soft edges outside the frame, and
       * the wrapper clips them.
       */}
      <div className="relative overflow-hidden">
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="scale-105 object-cover blur-[4px]"
          aria-hidden="true"
        />

        <Hero />
        <About compact />
      </div>
      <Menu />
      <ReservationCta />
      <Gallery compact />
      <Testimonials />
      <Contact compact />
    </>
  );
}
