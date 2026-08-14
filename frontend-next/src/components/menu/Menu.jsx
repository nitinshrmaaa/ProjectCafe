"use client";

import { FaArrowRight } from "react-icons/fa";
import MenuGrid from "./MenuGrid";
import { featuredItems } from "./menuData";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

/**
 * Home-page taste of the menu — six featured items and a way through to
 * the full board. The menu route renders MenuBoard instead.
 */
function Menu() {
  return (
    <section
      id="menu"
      className="relative bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900 py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Our Menu"
          title="Six Things We"
          highlight="Pour Most Often"
          description="The drinks our regulars order without looking at the board. Everything is roasted in-house and pulled to order."
        />

        <div className="mt-14">
          <MenuGrid items={featuredItems} />
        </div>

        <Reveal className="mt-14 text-center">
          <Button href="/menu" variant="outline" size="lg">
            See the full menu
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

export default Menu;
