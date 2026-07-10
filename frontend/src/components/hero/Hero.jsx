import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <HeroSlider />

      <HeroContent />

      <HeroStats />

      <ScrollIndicator />

    </section>
  );
}

export default Hero;
