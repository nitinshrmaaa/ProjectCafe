function GalleryCard({ item }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-3xl">

      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
style={
    item.id === 9
      ? { objectPosition: "center 44%" }
      : {}
  }

 />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-serif text-3xl text-white">
          {item.title}
        </h3>
      </div>

    </div>
  );
}

export default GalleryCard;
