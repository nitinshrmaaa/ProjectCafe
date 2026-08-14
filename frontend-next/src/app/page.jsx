import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Menu from "@/components/menu/Menu";
import ReservationCta from "@/components/reservation/ReservationCta";
import Gallery from "@/components/gallery/Gallery";
import Testimonials from "@/components/testimonials/Testimonials";
import Contact from "@/components/contact/Contact";
import { SITE } from "@/utils/constants";

export const metadata = {
  title: "Artisan Coffee House & Roastery",
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About compact />
      <Menu />
      <ReservationCta />
      <Gallery compact />
      <Testimonials />
      <Contact compact />
    </>
  );
}
