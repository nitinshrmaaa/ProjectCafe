function HeroStats() {
  return (
    <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 gap-8 rounded-3xl border border-white/10 bg-white/10 px-10 py-6 backdrop-blur-xl lg:flex">

      <div className="text-center text-white">
        <h2 className="text-3xl font-bold text-amber-400">4.9★</h2>
        <p>Customer Rating</p>
      </div>

      <div className="text-center text-white">
        <h2 className="text-3xl font-bold text-amber-400">2500+</h2>
        <p>Happy Guests</p>
      </div>

      <div className="text-center text-white">
        <h2 className="text-3xl font-bold text-amber-400">15+</h2>
        <p>Coffee Blends</p>
      </div>

    </div>
  );
}

export default HeroStats;
