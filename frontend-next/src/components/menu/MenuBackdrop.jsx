"use client";

import Image from "next/image";
import backdrop from "../../assets/images/hero/hero5.jpg";

/**
 * The menu screen's background: one photograph, held still.
 *
 * Built the way the hero and the story are built, so this screen joins the two
 * above it instead of arriving as a slab of flat colour — a picture, scaled
 * slightly past its frame and softened, under a dark espresso wash.
 *
 * It cycled through three for a while, first on a timer and then tied to the
 * scroll. Neither belonged here: the screen already has the carousel moving in
 * it, and a background that changes as well leaves nothing on the page holding
 * still. A background's job is to be the thing everything else is read
 * against.
 *
 * hero5 rather than hero4, which the two screens above already show top and
 * bottom — but the same light. Measured across the folder, hero5 is the
 * closest match to hero4's warmth once the wash is over it.
 *
 * The scale is what makes the blur usable: a blur samples past the edges of
 * its own box, so at 1:1 the picture would feather into nothing down all four
 * sides. 105% pushes those soft edges out where the section clips them.
 */
function MenuBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src={backdrop}
        alt=""
        fill
        // Softened by 4px under an 80% wash, so a full-quality full-width
        // source would be spending bandwidth on detail the blur removes.
        sizes="(max-width: 1024px) 100vw, 1600px"
        quality={55}
        placeholder="blur"
        className="scale-105 object-cover blur-[4px]"
      />

      {/* Opens and closes on solid espresso-900. The story above finishes on
          exactly that colour and the reservation prompt below starts from it,
          so neither join can show a seam — the picture surfaces in the middle
          of the screen and is gone again by both edges. It stays deep through
          that middle because the cards and the headline have to read over it;
          the hero can afford 48% because it carries nothing but type. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-950/80 to-espresso-900"
        aria-hidden="true"
      />
    </div>
  );
}

export default MenuBackdrop;
