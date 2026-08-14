"use client";

import { FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";

function HeroButtons() {
  return (
    <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button href="/reserve" size="lg" className="w-full sm:w-56">
        Reserve a Table
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Button>

      <Button href="/menu" variant="outline" size="lg" className="w-full sm:w-56">
        Explore the Menu
      </Button>
    </div>
  );
}

export default HeroButtons;
