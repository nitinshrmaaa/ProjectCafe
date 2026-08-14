import Gallery from "@/components/gallery/Gallery";
import ReservationCta from "@/components/reservation/ReservationCta";
import PageHeader from "@/components/ui/PageHeader";
import header from "@/assets/images/gallery/gallery3.jpg";

export const metadata = {
  title: "Gallery",
  description:
    "Inside Brew Haven — the room, the roaster and the people, photographed over a week of ordinary service.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        name="Gallery"
        eyebrow="Gallery"
        title="A week inside"
        highlight="Brew Haven"
        description="No stylists, no props. Just the café as it looks on a Tuesday morning and a Saturday night."
        image={header}
      />

      <Gallery withHeading={false} />
      <ReservationCta />
    </>
  );
}
