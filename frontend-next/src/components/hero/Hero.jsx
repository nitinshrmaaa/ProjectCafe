"use client";

import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

function Hero() {
  return (
    <section
      id="home"
      className="noise relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* No picture here: page.jsx spans one photograph behind this section
          and the story below it. The hero only washes over it.

          It washes lighter than the story does, on purpose. hero4 is dark at
          the top and bright around the machine at the bottom, and this section
          frames the top — matching the two washes numerically made this screen
          look much the darker of the pair. Only the base value is shared (70%,
          what the story picks up), so the join still carries across. */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-espresso-950/78 via-espresso-950/48 to-espresso-950/70"
        aria-hidden="true"
      />

      {/* Headline block — padded clear of the fixed header */}
      <div className="relative z-20 flex flex-1 items-center pb-16 pt-32 sm:pt-36 lg:pb-10 lg:pt-36">
        <HeroContent />
      </div>

      {/* Bottom rail: scroll cue · stats. Laid out in a row so nothing can
          collide the way absolutely-placed pieces did. The trailing spacer
          balances the scroll cue so the stats stay centred on desktop. */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-end justify-center gap-6 px-8 pb-8 lg:justify-between 3xl:max-w-[110rem] 3xl:px-12 3xl:pb-12 4xl:max-w-[132rem]">
        <ScrollIndicator targetId="story" />

        <HeroStats />

        {/* Matched to the scroll cue's real width (~96px), not the 160px it
            used to reserve — the extra was what pushed the stats strip past
            the container edge at 1024px. */}
        <span className="hidden w-24 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

export default Hero;
