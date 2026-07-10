import { useEffect, useState } from "react";

import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";
import hero5 from "../../assets/images/hero/hero5.jpg";
import hero6 from "../../assets/images/hero/hero6.jpg";
import hero7 from "../../assets/images/hero/hero7.jpg";
import hero8 from "../../assets/images/hero/hero8.jpg";

const images = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">

      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === current
              ? "opacity-100 scale-105"
              : "opacity-0 scale-100"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>

    </div>
  );
}

export default HeroSlider;
