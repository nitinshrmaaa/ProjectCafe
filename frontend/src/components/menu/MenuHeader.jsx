function MenuHeader() {
  return (
    <div className="mx-auto w-full max-w-full px-6 text-center">

      {/* Small Heading */}
      <div className="mb-6 flex items-center justify-center gap-4">

        <div className="h-px w-20 bg-amber-400/40"></div>

        <span className="text-sm font-semibold uppercase tracking-[10px] text-amber-400">
          OUR MENU
        </span>

        <div className="h-px w-20 bg-amber-400/40"></div>

      </div>

      {/* Main Heading */}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-white md:text-7xl">
        Discover Our
      </h2>

      <h2 className="mt-3 font-serif text-5xl italic leading-tight text-amber-400 md:text-7xl">
        Signature Drinks
      </h2>

      {/* Description */}
    <div className="mt-8 flex w-full justify-center">
  <p className="max-w-2xl text-center text-lg leading-9 text-gray-400">
    Every cup is handcrafted with premium beans, fresh ingredients,
    and years of passion. From rich espresso to creamy lattes and
    delightful desserts, discover flavors designed to create
    unforgettable moments.
  </p>
</div>
    </div>
  );
}

export default MenuHeader;
