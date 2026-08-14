"use client";

import { FaArrowRight } from "react-icons/fa";
import MenuGrid from "./MenuGrid";
import { featuredItems } from "./menuData";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

/**
 * Home-page taste of the menu — six featured items and a way through to
 * the full board. The menu route renders MenuBoard instead.
 */
function Menu() {
  return (
    <Section id="menu" tone="raised" space="tall" glow="top" divider>
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
    </Section>
  );
}

export default Menu;
