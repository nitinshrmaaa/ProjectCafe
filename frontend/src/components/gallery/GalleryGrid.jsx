import { galleryImages } from "./galleryData";
import GalleryCard from "./GalleryCard";

function GalleryGrid() {
  return (
    <div className="grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">

      {/* Interior */}
      <div className="md:col-span-4 lg:col-span-6 lg:row-span-2">
        <GalleryCard item={galleryImages[0]} />
      </div>

      {/* Coffee Making */}
      <div className="md:col-span-2 lg:col-span-3">
        <GalleryCard item={galleryImages[2]} />
      </div>

      {/* Aesthetic */}
      <div className="md:col-span-2 lg:col-span-3">
        <GalleryCard item={galleryImages[1]} />
      </div>

      {/* Lights */}
      <div className="md:col-span-4 lg:col-span-6">
        <GalleryCard item={galleryImages[3]} />
      </div>

      {/* People */}
      <div className="md:col-span-2 lg:col-span-4">
        <GalleryCard item={galleryImages[4]} />
      </div>

      {/* Coffee */}
      <div className="md:col-span-2 lg:col-span-4">
        <GalleryCard item={galleryImages[6]} />
      </div>

      {/* Wall */}
      <div className="md:col-span-2 lg:col-span-4">
        <GalleryCard item={galleryImages[5]} />
      </div>

      {/* Dark Mood */}
      <div className="md:col-span-6 lg:col-span-12 h-[450px]">
        <GalleryCard item={galleryImages[7]} />
      </div>

    </div>
  );
}

export default GalleryGrid;
