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
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Hero ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[5000] ease-linear ${
            index === current
              ? "opacity-100 scale-110 brightness-90"
              : "opacity-0 scale-100"
          }`}
        />
      ))}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80"></div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              current === index
                ? "h-3 w-8 rounded-full bg-amber-400"
                : "h-3 w-3 rounded-full bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
