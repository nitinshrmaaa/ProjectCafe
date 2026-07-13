import GalleryHeader from "./GalleryHeader";
import GalleryGrid from "./GalleryGrid";

function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-[#111111] via-[#0b0b0b] to-black py-32"
    >
      <GalleryHeader />

      <div className="mt-20 w-full px-6 lg:px-10 xl:px-16">
        <GalleryGrid />
      </div>
    </section>
  );
}

export default Gallery;
