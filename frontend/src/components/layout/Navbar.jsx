import { useState } from "react";
import { FaCoffee, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">

      <nav className="flex h-24 w-full items-center border-b border-white/10 bg-black/30 px-16 backdrop-blur-xl">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <FaCoffee className="text-3xl text-amber-400" />

          <div>

            <h1 className="text-4xl font-serif tracking-[3px] text-white">
              Brew Haven
            </h1>

            <p className="text-[10px] uppercase tracking-[8px] text-amber-300">
              Coffee House
            </p>

          </div>

        </div>

        {/* Desktop Menu */}
        <ul className="mx-auto hidden items-center gap-16 text-lg text-white md:flex">

          <li className="relative cursor-pointer text-amber-400">

            Home

            <span className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-amber-400"></span>

          </li>

          <li className="cursor-pointer transition hover:text-amber-400">
            Menu
          </li>

          <li className="cursor-pointer transition hover:text-amber-400">
            Gallery
          </li>

          <li className="cursor-pointer transition hover:text-amber-400">
            About
          </li>

          <li className="cursor-pointer transition hover:text-amber-400">
            Contact
          </li>

        </ul>

        {/* Mobile Button */}
        <button
          className="ml-auto text-3xl text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="mx-auto mt-3 flex w-[92%] max-w-7xl flex-col rounded-3xl border border-white/10 bg-black/80 p-6 text-white backdrop-blur-xl md:hidden">

          <a className="py-3">Home</a>
          <a className="py-3">Menu</a>
          <a className="py-3">Gallery</a>
          <a className="py-3">About</a>
          <a className="py-3">Contact</a>

        </div>

      )}

    </header>
  );
}

export default Navbar;
