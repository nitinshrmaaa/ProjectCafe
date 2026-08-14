"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { FaCube, FaImages } from "react-icons/fa";
import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";
import CanvasBoundary from "../three/CanvasBoundary";
import useWindowSize from "../../hooks/useWindowSize";
import useReducedMotion from "../../hooks/useReducedMotion";
import { supportsWebGL } from "../../utils/helpers";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

function Hero() {
  const { isDesktop } = useWindowSize();
  const reducedMotion = useReducedMotion();

  // WebGL is only probed in the browser, after mount.
  const [canRender3D, setCanRender3D] = useState(false);
  const [prefer3D, setPrefer3D] = useState(true);

  useEffect(() => setCanRender3D(supportsWebGL()), []);

  const show3D = canRender3D && isDesktop && !reducedMotion && prefer3D;
  const canToggle = canRender3D && isDesktop && !reducedMotion;

  return (
    <section
      id="home"
      className="noise relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Background: WebGL centrepiece on capable devices, photography elsewhere */}
      {show3D ? (
        <CanvasBoundary fallback={<HeroSlider />}>
          <Suspense fallback={<HeroSlider />}>
            <Hero3DScene />
          </Suspense>
        </CanvasBoundary>
      ) : (
        <HeroSlider />
      )}

      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-espresso-950/85 via-espresso-950/45 to-espresso-900"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-espresso-900 to-transparent"
        aria-hidden="true"
      />

      {/* Headline block — padded clear of the fixed header */}
      <div className="relative z-20 flex flex-1 items-center pb-16 pt-36 sm:pt-40 lg:pb-10 lg:pt-44">
        <HeroContent />
      </div>

      {/* Bottom rail: scroll cue · stats · view toggle. Laid out in a row so
          nothing can collide the way absolutely-placed pieces did. */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-end justify-center gap-6 px-8 pb-8 lg:justify-between">
        <ScrollIndicator targetId="story" />

        <HeroStats />

        {canToggle ? (
          <button
            type="button"
            onClick={() => setPrefer3D((value) => !value)}
            className="hidden shrink-0 items-center gap-2.5 rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-[11px] uppercase tracking-[3px] text-white/70 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-300 lg:flex"
          >
            {prefer3D ? <FaImages /> : <FaCube />}
            {prefer3D ? "Photos" : "3D view"}
          </button>
        ) : (
          <span className="hidden w-40 lg:block" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

export default Hero;
