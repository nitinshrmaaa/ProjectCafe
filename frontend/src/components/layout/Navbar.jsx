import { useEffect, useState } from "react";
import { FaCoffee, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState("home");

useEffect(() => {
  const handleScroll = () => {
    const sections = ["home", "menu", "gallery", "about", "contact"];

    let current = "home";

    sections.forEach((section) => {
      const element = document.getElementById(section);

      if (element) {
        const top = element.offsetTop - 120;

        if (window.scrollY >= top) {
          current = section;
        }
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const navLinks = [
  { id: "home", name: "Home", href: "#home" },
  { id: "menu", name: "Menu", href: "#menu" },
  { id: "gallery", name: "Gallery", href: "#gallery" },
  { id: "about", name: "About", href: "#about" },
  { id: "contact", name: "Contact", href: "#contact" },
];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto grid h-24 max-w-7xl grid-cols-3 items-center px-8">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <FaCoffee className="text-4xl text-amber-400" />

            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-[2px] text-white">
                Brew Haven
              </h1>

              <p className="text-[11px] uppercase tracking-[8px] text-amber-300">
                Coffee House
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden justify-center gap-14 md:flex">
            {navLinks.map((link, index) => (
              <li key={link.name} className="group relative">
                <a
                  href={link.href}
                  className={`text-[17px] font-medium transition duration-300 ${
  activeSection === link.id
    ? "text-amber-400"
    : "text-white hover:text-amber-400"
}`}
                >
                  {link.name}
                </a>

                <span
                  className={`absolute -bottom-3 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-amber-400 transition-all duration-300 ${
                   activeSection === link.id
  ? "w-8"
  : "w-0 group-hover:w-8"
                  }`}
                ></span>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex justify-end">
            <button
              className="text-3xl text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mx-auto mt-3 flex w-[92%] max-w-7xl flex-col rounded-3xl border border-white/10 bg-black/90 p-6 backdrop-blur-xl md:hidden">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl py-3 text-center text-lg font-medium text-white transition hover:bg-amber-400 hover:text-black"
            >
              {link.name}
            </a>
          ))}

        </div>
      )}
    </header>
  );
}

export default Navbar;
