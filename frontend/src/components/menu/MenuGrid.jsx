import { menuItems } from "./menuData";
import MenuCard from "./MenuCard";

function MenuGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3">

      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
        />
      ))}

    </div>
  );
}

export default MenuGrid;
