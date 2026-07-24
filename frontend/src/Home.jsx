import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Menu from "../components/menu/Menu";
import Gallery from "../components/gallery/Gallery";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <Menu />

      <Gallery />

      <About />

      <Contact />

      <Footer />
    </>
  );
}

export default Home;
