function CategoryTabs() {
  const tabs = [
    "All",
    "Coffee",
    "Cold Brew",
    "Dessert",
  ];

  return (
    <div className="mb-20 flex flex-wrap justify-center gap-5">

      {tabs.map((tab, index) => (

        <button
          key={tab}
          className={`rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 ${
            index === 0
              ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
              : "border border-white/20 bg-white/5 text-white hover:border-amber-400 hover:bg-amber-400 hover:text-black"
          }`}
        >
          {tab}
        </button>

      ))}

    </div>
  );
}

export default CategoryTabs;
