import Contact from "@/components/contact/Contact";
import MapEmbed from "@/components/contact/MapEmbed";
import Faq from "@/components/contact/Faq";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import header from "@/assets/images/gallery/gallery7.jpg";

export const metadata = {
  title: "Contact",
  description:
    "Find Brew Haven at 24 Roasters Lane, San Francisco. Opening hours, directions, private hire and wholesale enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        name="Contact"
        eyebrow="Contact"
        title="Come and"
        highlight="say hello"
        description="We are two minutes from the station, and the roaster is usually running before nine."
        image={header}
      />

      <Contact withHeading={false} />

      <section className="bg-espresso-900 pb-20 lg:pb-28">
        <Container>
          <Reveal>
            <MapEmbed />
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  );
}
