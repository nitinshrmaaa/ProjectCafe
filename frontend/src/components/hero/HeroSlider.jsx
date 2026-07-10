import hero1 from "../../assets/images/hero/hero1.jpg";

function HeroSlider() {
  return (
    <>
      <img
        src={hero1}
        alt="Coffee"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80"></div>
    </>
  );
}

export default HeroSlider;
