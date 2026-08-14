"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import CategoryTabs from "./CategoryTabs";
import MenuListRow from "./MenuListRow";
import MenuCard from "./MenuCard";
import { CATEGORIES, menuItems } from "./menuData";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import useFavorites from "../../hooks/useFavorites";
import { fadeUp, stagger, viewportOnce } from "../../utils/animations";

/** A line of context under each course heading. */
const BLURBS = {
  Espresso: "Pulled on the lever machine and dialled in twice a day.",
  Filter: "Brewed by hand, one cup at a time, while you wait.",
  Cold: "Steeped slow and served over slow-melting ice.",
  Pastry: "Baked on site each morning. When they are gone, they are gone.",
};

const COURSES = CATEGORIES.filter((name) => name !== "All");

/** The signature items get a photographic feature above the list. */
const SIGNATURES = menuItems.filter((item) => item.badge).slice(0, 3);

const FOOTNOTES = [
  "Oat, almond and soy at no extra charge",
  "Decaf on every espresso drink",
  "Beans ground to your brewer, free",
  "Allergen information at the counter",
];

function MenuBoard() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { isFavorite, toggle } = useFavorites();

  const counts = useMemo(
    () =>
      CATEGORIES.reduce((accumulator, name) => {
        accumulator[name] =
          name === "All"
            ? menuItems.length
            : menuItems.filter((item) => item.category === name).length;

        return accumulator;
      }, {}),
    []
  );

  const search = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const matches = menuItems.filter((item) => {
      const inCategory = category === "All" || item.category === category;

      const inSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.origin.toLowerCase().includes(search) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search));

      return inCategory && inSearch;
    });

    return COURSES.map((name) => ({
      name,
      blurb: BLURBS[name],
      items: matches.filter((item) => item.category === name),
    })).filter((group) => group.items.length > 0);
  }, [category, search]);

  const showSignatures = category === "All" && !search;
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="board" className="relative bg-espresso-900 pb-24 lg:pb-32">
      {/* Controls stay in reach while the board scrolls */}
      <div className="sticky top-[72px] z-30 border-b border-white/[0.07] bg-espresso-950/92 backdrop-blur-xl">
        <Container className="flex flex-col gap-1 py-1.5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <CategoryTabs
            categories={CATEGORIES}
            active={category}
            onChange={setCategory}
            counts={counts}
          />

          {/* Search reads as a ruled line on a page, not a form control */}
          <div className="group relative w-full pb-3 lg:w-64 lg:pb-0">
            <label htmlFor="board-search" className="sr-only">
              Search the menu
            </label>

            <FaSearch className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[11px] text-white/30 transition-colors group-focus-within:text-gold-400" />

            <input
              id="board-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search drink, origin or flavour"
              className="w-full border-b border-white/12 bg-transparent py-2.5 pl-6 pr-7 text-sm text-cream transition-colors placeholder:text-white/25 focus:border-gold-400 focus:outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] text-white/35 transition-colors hover:text-gold-300"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container>
        {/* Signatures */}
        <AnimatePresence initial={false}>
          {showSignatures && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-20">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4">
                    <span className="hairline h-px w-12" />

                    <span className="text-[11px] font-semibold uppercase tracking-[6px] text-gold-400">
                      Signatures
                    </span>

                    <span className="hairline h-px w-12" />
                  </div>

                  <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
                    What we are
                    <span className="gold-text italic font-normal">
                      {" "}
                      known for
                    </span>
                  </h2>

                  <p className="mx-auto mt-6 max-w-xl leading-8 text-white/45">
                    Three things we would put in front of you if you asked us
                    to choose.
                  </p>
                </div>

                <motion.div
                  variants={stagger(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="mt-12 grid gap-6 md:grid-cols-3"
                >
                  {SIGNATURES.map((item) => (
                    <motion.div key={item.id} variants={fadeUp}>
                      <MenuCard
                        item={item}
                        isFavorite={isFavorite(item.id)}
                        onToggleFavorite={toggle}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The board itself, set on a card like a printed menu */}
        {total === 0 ? (
          <div className="py-28 text-center">
            <p className="font-serif text-3xl text-white">
              Nothing matches “{query}”
            </p>

            <p className="mt-4 text-white/45">
              Try an origin like <em>Ethiopia</em>, or a flavour like{" "}
              <em>chocolate</em>.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-8 text-sm uppercase tracking-[3px] text-gold-400 transition-colors hover:text-gold-300"
            >
              Show the whole menu
            </button>
          </div>
        ) : (
          <div className="mt-20 rounded-[2.5rem] border border-white/[0.07] bg-espresso-950/50 px-5 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <div className="space-y-16 lg:space-y-24">
              {groups.map((group) => (
                <Reveal
                  key={group.name}
                  as="section"
                  id={`course-${group.name.toLowerCase()}`}
                  className="scroll-mt-40"
                >
                  {/* Course heading, centred between two rules */}
                  <header className="text-center">
                    <div className="flex items-center justify-center gap-5">
                      <span className="h-px w-10 bg-gradient-to-l from-gold-400/40 to-transparent sm:w-20" />

                      <h2 className="font-serif text-3xl text-white sm:text-[34px]">
                        {group.name}
                      </h2>

                      <span className="h-px w-10 bg-gradient-to-r from-gold-400/40 to-transparent sm:w-20" />
                    </div>

                    <p className="mx-auto mt-3 max-w-md font-serif text-[15px] italic text-white/35">
                      {group.blurb}
                    </p>
                  </header>

                  {/* Two columns, split by a hairline like a folded menu */}
                  <div className="relative mt-10 grid gap-x-14 xl:grid-cols-2 xl:gap-x-20">
                    <span
                      className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px bg-white/[0.06] xl:block"
                      aria-hidden="true"
                    />

                    <AnimatePresence mode="popLayout">
                      {group.items.map((item) => (
                        <MenuListRow
                          key={item.id}
                          item={item}
                          isFavorite={isFavorite(item.id)}
                          onToggleFavorite={toggle}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Footnotes, the way a real menu carries them */}
            <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-8 text-center text-xs uppercase tracking-[2px] text-white/30">
              {FOOTNOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

export default MenuBoard;
