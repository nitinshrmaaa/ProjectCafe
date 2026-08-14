import MenuHero from "@/components/menu/MenuHero";
import MenuBoard from "@/components/menu/MenuBoard";
import MenuSpotlight from "@/components/menu/MenuSpotlight";
import ReservationCta from "@/components/reservation/ReservationCta";

export const metadata = {
  title: "Menu",
  description:
    "Espresso, filter, cold brew and pastries baked in-house every morning at Brew Haven.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuBoard />
      <MenuSpotlight />
      <ReservationCta />
    </>
  );
}
