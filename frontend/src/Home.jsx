import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Menu from "../components/menu/Menu";

function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="menu">
        <Menu />
      </section>
    </>
  );
}

export default Home;
