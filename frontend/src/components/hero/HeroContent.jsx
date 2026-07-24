import HeroButtons from "./HeroButtons";

function HeroContent() {
  return (
    <div className="relative z-20 flex h-full items-center justify-center px-6 -translate-y-12">

      <div className="max-w-5xl text-center">

        {/* Premium Badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-400/50 bg-black/20 px-6 py-2 backdrop-blur-md">

          <span className="text-xl">☕</span>

          <span className="text-xs uppercase tracking-[6px] text-amber-300">
            Premium Coffee House
          </span>

        </div>

        {/* Heading */}
        <h1 className="font-serif text-6xl font-medium leading-none text-white md:text-8xl lg:text-[110px]">

          Crafted Coffee

          <br />

          <span className="font-serif italic font-normal text-amber-400">
            Crafted Memories
          </span>

        </h1>

        {/* Description */}
        <p className="mx-auto mt-10 max-w-3xl text-xl leading-10 text-gray-200">

          Every cup tells a story of passion, aroma and handcrafted
          perfection.

          Experience freshly roasted coffee in a warm,
          elegant and unforgettable atmosphere.

        </p>

        <HeroButtons />

      </div>

    </div>
  );
}

export default HeroContent;
