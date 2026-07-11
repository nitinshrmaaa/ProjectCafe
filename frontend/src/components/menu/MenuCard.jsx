import { FaArrowRight, FaStar } from "react-icons/fa";

function MenuCard({ item }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151515] transition-all duration-500 hover:-translate-y-4 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20">

      <div className="overflow-hidden">

        <img
          src={item.image}
          alt={item.name}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      <div className="flex flex-1 flex-col p-7">

        <h3 className="font-serif text-3xl text-white">
  {item.name}
</h3>

<div className="mt-3 flex gap-1 text-amber-400">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
</div>

<p className="mt-4 leading-8 text-gray-400">
  {item.description}
</p>

{/* 👇 PRICE GOES HERE */}
<div className="mt-6 text-3xl font-bold text-amber-400">
  {item.price}
</div>

{/* 👇 BUTTON COMES AFTER PRICE */}
<button className="mt-auto flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber-300">
  Order Now
  <FaArrowRight />
</button>

      </div>

    </div>
  );
}

export default MenuCard;

