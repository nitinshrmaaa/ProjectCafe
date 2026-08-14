import About from "@/components/about/About";
import Process from "@/components/about/Process";
import Values from "@/components/about/Values";
import Team from "@/components/about/Team";
import Testimonials from "@/components/testimonials/Testimonials";
import ReservationCta from "@/components/reservation/ReservationCta";
import PageHeader from "@/components/ui/PageHeader";
import header from "@/assets/images/hero/hero8.jpg";

export const metadata = {
  title: "Our Story",
  description:
    "Brew Haven has roasted its own coffee in San Francisco since 2012 — six farms, one drum roaster, and a team trained in-house.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        name="About"
        eyebrow="About Us"
        title="Twelve years of"
        highlight="one small roastery"
        description="How a second-hand roaster and six farms turned into the café you are standing in."
        image={header}
      />

      <About />
      <Process />
      <Values />
      <Team />
      <Testimonials />
      <ReservationCta />
    </>
  );
}
