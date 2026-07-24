import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";

function Menu() {
  return (
    <section
      id="menu"
      className="relative bg-gradient-to-b from-[#0d0d0d] via-black to-[#111111] pt-24 pb-32"
    >
      {/* Header */}
      <MenuHeader />

      {/* Cards */}
      <div className="mx-auto mt-20 w-full max-w-screen-3xl px-8">
        <MenuGrid />
      </div>
    </section>
  );
}

export default Menu;
