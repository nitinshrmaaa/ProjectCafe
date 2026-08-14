"use client";

import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaCube, FaTh } from "react-icons/fa";
import GalleryGrid from "./GalleryGrid";
import Lightbox from "./Lightbox";
import { GALLERY_CATEGORIES, galleryImages } from "./galleryData";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import CanvasBoundary from "../three/CanvasBoundary";
import useWindowSize from "../../hooks/useWindowSize";
import useReducedMotion from "../../hooks/useReducedMotion";
import { cn, supportsWebGL } from "../../utils/helpers";

const Gallery3DScene = lazy(() => import("./Gallery3DScene"));

/**
 * Gallery section.
 * `compact` trims the set for the home page; the full variant adds category
 * filtering and the walkable 3D gallery wall.
 */
function Gallery({ compact = false, withHeading = true }) {
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [view, setView] = useState("grid");
  const [canRender3D, setCanRender3D] = useState(false);

  const { isDesktop } = useWindowSize();
  const reducedMotion = useReducedMotion();

  useEffect(() => setCanRender3D(supportsWebGL()), []);

  const offer3D = canRender3D && isDesktop && !reducedMotion && !compact;

  const items = useMemo(() => {
    // The first four tile into a clean two-row block on the home page.
    if (compact) return galleryImages.slice(0, 4);

    return category === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === category);
  }, [compact, category]);

  return (
    <Section id="gallery" tone="deep" glow="right">
      <Container>
        {withHeading && (
          <SectionHeading
            eyebrow="Gallery"
            title="Experience Our"
            highlight="Coffee Moments"
            description="The room, the craft and the people who fill it. Photographed over a single week of ordinary service."
          />
        )}

        {!compact && (
          <div
            className={cn(
              "flex flex-col items-center gap-5 sm:flex-row sm:justify-between",
              withHeading && "mt-12"
            )}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {GALLERY_CATEGORIES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  aria-pressed={category === name}
                  className={cn(
                    "rounded-full px-6 py-2.5 text-sm transition-all duration-300",
                    category === name
                      ? "bg-gold-400 text-espresso-950"
                      : "border border-white/12 bg-white/[0.04] text-white/65 hover:border-gold-400/60 hover:text-gold-300"
                  )}
                >
                  {name}
                </button>
              ))}
            </div>

            {offer3D && (
              <div className="flex rounded-full border border-white/12 bg-white/[0.04] p-1">
                {[
                  { key: "grid", label: "Grid", icon: FaTh },
                  { key: "3d", label: "3D wall", icon: FaCube },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setView(key)}
                    aria-pressed={view === key}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors duration-300",
                      view === key
                        ? "bg-gold-400 text-espresso-950"
                        : "text-white/60 hover:text-gold-300"
                    )}
                  >
                    <Icon className="text-xs" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-12">
          {offer3D && view === "3d" ? (
            <div className="h-[70vh] min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10">
              <CanvasBoundary
                fallback={<GalleryGrid items={items} onOpen={setLightboxIndex} />}
              >
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-sm uppercase tracking-[4px] text-white/40">
                      Building the room…
                    </div>
                  }
                >
                  <Gallery3DScene items={galleryImages} />
                </Suspense>
              </CanvasBoundary>
            </div>
          ) : (
            <GalleryGrid items={items} onOpen={setLightboxIndex} />
          )}
        </div>

        {compact && (
          <Reveal className="mt-14 text-center">
            <Button href="/gallery" variant="outline" size="lg">
              Walk through the gallery
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Reveal>
        )}
      </Container>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </Section>
  );
}

export default Gallery;
