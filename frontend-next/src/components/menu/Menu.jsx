"use client";

import { useCallback, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import MenuBackdrop from "./MenuBackdrop";
import MenuCarousel from "./MenuCarousel";
import MenuHeadline from "./MenuHeadline";
import { featuredItems, menuItems } from "./menuData";
import Section from "../ui/Section";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

/**
 * Home-page taste of the menu — six featured drinks and a way through to the
 * full board. The menu route renders MenuBoard instead.
 *
 * The third screen of the page, and it holds one the way the hero and the
 * story above it do:
 *
 * - Everything comes down the middle, like every other section on the site.
 *   Ranged left, this screen sat hard against the page's left edge while the
 *   rest of the page was centred, and a screen that breaks the pattern reads
 *   as the mistake even when it is the only deliberate one.
 * - The container is wider than the site's 80rem default. A centred 80rem left
 *   bare gutters down both sides of a wide display, which is what made this the
 *   narrow screen of the three.
 * - The six sit on a carousel rather than stacked in a grid. Three rows of
 *   cards ran the section onto a second screen on a laptop; three on a track
 *   fit one, and the other three are a swipe away instead of a scroll.
 *
 * The carousel is the only thing on this screen that moves, which is the point
 * — the background holds still and the headline holds still, so there is one
 * piece of movement and the visitor is the one asking for it.
 */
function Menu() {
  // The carousel counts its own pages; this only counts that something
  // changed, which is all the standfirst above it needs in order to turn over
  // on the same beat. Kept here because it is the one thing the two of them
  // share — neither owns the other.
  const [beat, setBeat] = useState(0);
  const advance = useCallback(() => setBeat((previous) => previous + 1), []);

  return (
    <Section
      id="menu"
      // No surface of its own: the photograph below is the background now, and
      // an opaque tone would sit on top of it.
      tone="none"
      // No divider either. Section paints it before its children, so the
      // backdrop covered it — and the hero and the story do not carry one:
      // where a photograph ends is the join.
      // Head pulled in from the section's normal py-20/py-28, matching the
      // story's foot above: the two together were leaving a bare band of
      // espresso about a fifth of a screen deep at the join.
      className="pt-10 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pt-12"
    >
      <MenuBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-5 sm:px-8">
        <MenuHeadline beat={beat} />

        <div className="mt-10 lg:mt-12">
          <MenuCarousel onAdvance={advance} />
        </div>

        {/* The link is the end of the screen, so it is set as an ending: the
            button held between two hairlines that run out towards the margins,
            the same rule the eyebrow at the top of the section opens with. It
            closes the screen with the device it opened with, and it gives the
            button a line to sit on instead of leaving it floating in the space
            under the carousel.

            The count beneath is the reason to press it. "See the full menu"
            asks a visitor to take it on trust that there is more; naming how
            much more is left over turns the link into an offer. Counted from
            the data, so it can never contradict the board. */}
        <Reveal className="mt-12">
          <div className="flex items-center justify-center gap-5 sm:gap-8">
            <span className="hairline h-px w-8 flex-1 sm:max-w-[10rem]" aria-hidden="true" />

            <Button href="/menu" variant="outline" size="lg" className="shrink-0">
              See the full menu
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <span className="hairline h-px w-8 flex-1 sm:max-w-[10rem]" aria-hidden="true" />
          </div>

          <p className="mt-6 text-center text-[11px] uppercase tracking-[3px] text-white/30">
            {menuItems.length - featuredItems.length} more on the board
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export default Menu;
