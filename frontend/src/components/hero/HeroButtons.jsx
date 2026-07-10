import { FaArrowRight } from "react-icons/fa";

function HeroButtons() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

      <button className="group flex w-60 items-center justify-center gap-3 rounded-full bg-amber-400 px-10 py-5 text-lg font-semibold text-black shadow-xl transition hover:-translate-y-1 hover:bg-amber-300">

        Reserve Table

        <FaArrowRight className="transition group-hover:translate-x-1" />

      </button>

      <button className="flex w-60 items-center justify-center rounded-full border border-white/40 bg-white/10 px-10 py-5 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black">

        Explore Menu

      </button>

    </div>
  );
}

export default HeroButtons;
