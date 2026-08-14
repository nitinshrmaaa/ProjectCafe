import americano from "../../assets/images/menu/americano.jpg";
import cappuccino from "../../assets/images/menu/cappuccino.jpg";
import cheesecake from "../../assets/images/menu/cheesecake.jpg";
import coldbrew from "../../assets/images/menu/coldbrew.jpg";
import croissant from "../../assets/images/menu/croissant.jpg";
import espresso from "../../assets/images/menu/espresso.jpg";
import latte from "../../assets/images/menu/latte.jpg";
import mocha from "../../assets/images/menu/mocha.jpg";
import muffin from "../../assets/images/menu/muffin.jpg";

export const CATEGORIES = ["All", "Espresso", "Filter", "Cold", "Pastry"];

/**
 * The full menu. `featured` items are the six shown on the home page.
 * `cup` describes how the drink is rendered in the 3D spotlight.
 */
export const menuItems = [
  {
    id: 1,
    name: "Espresso",
    category: "Espresso",
    price: 3.5,
    image: espresso,
    origin: "Brazil · Cerrado",
    focus: "center 62%",
    description:
      "A 25-second shot with a dense hazelnut crema. Chocolate, toasted almond and a clean finish.",
    tags: ["Signature", "Hot"],
    rating: 5,
    badge: "House favourite",
    featured: true,
    cup: { liquidColor: "#3a1c0a", liquidLevel: 0.35, foamLevel: 0.35, cupColor: "#f4ede2" },
  },
  {
    id: 2,
    name: "Cortado",
    category: "Espresso",
    price: 4.2,
    image: cappuccino,
    origin: "Colombia · Huila",
    focus: "center 62%",
    description:
      "Equal parts espresso and steamed milk, poured just warm enough to keep the sweetness intact.",
    tags: ["Hot"],
    rating: 5,
    featured: false,
    cup: { liquidColor: "#6b4327", liquidLevel: 0.6, foamLevel: 0.3, cupColor: "#efe6d8" },
  },
  {
    id: 3,
    name: "Flat White",
    category: "Espresso",
    price: 4.6,
    image: latte,
    origin: "Colombia · Huila",
    focus: "center 60%",
    description:
      "Double ristretto under a thin veil of silky microfoam. The barista's own morning order.",
    tags: ["Hot"],
    rating: 5,
    featured: true,
    cup: { liquidColor: "#8a5c37", liquidLevel: 0.72, foamLevel: 0.2, cupColor: "#f6f1e7" },
  },
  {
    id: 4,
    name: "Cappuccino",
    category: "Espresso",
    price: 4.8,
    image: cappuccino,
    origin: "Ethiopia · Yirgacheffe",
    focus: "center 62%",
    description:
      "Traditional proportions — a third espresso, a third milk, a third foam, dusted with cocoa.",
    tags: ["Hot", "Classic"],
    rating: 5,
    featured: true,
    cup: { liquidColor: "#7a4c2b", liquidLevel: 0.6, foamLevel: 0.7, cupColor: "#f4ede2" },
  },
  {
    id: 5,
    name: "Café Mocha",
    category: "Espresso",
    price: 5.4,
    image: mocha,
    origin: "Guatemala · Antigua",
    focus: "center 65%",
    description:
      "Single-origin espresso stirred through 70% dark chocolate, finished with whipped cream.",
    tags: ["Hot", "Sweet"],
    rating: 4,
    featured: true,
    cup: { liquidColor: "#41210f", liquidLevel: 0.7, foamLevel: 0.45, cupColor: "#e9dcc8" },
  },
  {
    id: 6,
    name: "Americano",
    category: "Filter",
    price: 3.9,
    image: americano,
    origin: "Brazil · Cerrado",
    focus: "center 55%",
    description:
      "Two shots lengthened with hot water, poured coffee-last so the crema survives the journey.",
    tags: ["Hot"],
    rating: 4,
    featured: false,
    cup: { liquidColor: "#2c1607", liquidLevel: 0.82, foamLevel: 0.12, cupColor: "#f2ebe0" },
  },
  {
    id: 7,
    name: "Pour Over",
    category: "Filter",
    price: 5.2,
    image: americano,
    origin: "Ethiopia · Guji",
    focus: "center 55%",
    description:
      "Hand-poured in four stages over four minutes. Apricot, jasmine and a tea-like body.",
    tags: ["Hot", "Single origin"],
    rating: 5,
    badge: "Brewed to order",
    featured: false,
    cup: { liquidColor: "#5a2f12", liquidLevel: 0.78, foamLevel: 0, cupColor: "#f6f1e7" },
  },
  {
    id: 8,
    name: "Cold Brew",
    category: "Cold",
    price: 5.0,
    image: coldbrew,
    origin: "Sumatra · Lintong",
    focus: "center 68%",
    description:
      "Steeped for eighteen hours at cellar temperature. Deep, round and almost no acidity.",
    tags: ["Iced", "Signature"],
    rating: 5,
    badge: "18-hour steep",
    featured: true,
    cup: { liquidColor: "#20100a", liquidLevel: 0.85, foamLevel: 0, hasIce: true, cupColor: "#e8e2d6" },
  },
  {
    id: 9,
    name: "Iced Americano",
    category: "Cold",
    price: 5.2,
    image: coldbrew,
    origin: "Brazil · Cerrado",
    focus: "center 68%",
    description:
      "Two shots over ice and cold water, poured long so it stays bright to the bottom of the glass.",
    tags: ["Iced"],
    rating: 4,
    featured: false,
    cup: { liquidColor: "#a9784f", liquidLevel: 0.88, foamLevel: 0, hasIce: true, cupColor: "#eee7db" },
  },
  {
    id: 10,
    name: "Affogato",
    category: "Cold",
    price: 6.0,
    image: mocha,
    origin: "Brazil · Cerrado",
    focus: "center 65%",
    description:
      "A scoop of vanilla bean gelato drowned in a fresh double shot, served the moment it is made.",
    tags: ["Iced", "Sweet"],
    rating: 5,
    featured: false,
    cup: { liquidColor: "#4a2a13", liquidLevel: 0.55, foamLevel: 0.6, cupColor: "#f6f1e7" },
  },
  {
    id: 11,
    name: "Butter Croissant",
    category: "Pastry",
    price: 3.8,
    image: croissant,
    origin: "Baked in-house",
    focus: "center 50%",
    description:
      "Laminated over three days with cultured French butter. Shatters properly when you tear it.",
    tags: ["Baked daily"],
    rating: 5,
    featured: true,
    cup: null,
    model: "croissant",
  },
  {
    id: 12,
    name: "Caramel Biscuit Cheesecake",
    category: "Pastry",
    price: 5.5,
    image: cheesecake,
    origin: "Baked in-house",
    focus: "center 52%",
    description:
      "Set on a spiced caramel-biscuit base, torched on top and finished with a biscuit shard.",
    tags: ["Baked daily", "Sweet"],
    rating: 5,
    badge: "Sells out",
    featured: false,
    cup: null,
    model: "cheesecake",
  },
  {
    id: 13,
    name: "Double Chocolate Muffin",
    category: "Pastry",
    price: 3.4,
    image: muffin,
    origin: "Baked in-house",
    focus: "center 60%",
    description:
      "Dark cocoa crumb studded with chocolate chunks, baked in trays of twelve each morning.",
    tags: ["Baked daily"],
    rating: 4,
    featured: false,
    cup: null,
  },
  {
    id: 14,
    name: "Beans To Take Home",
    category: "Filter",
    price: 18.0,
    image: espresso,
    origin: "Rotating single origin",
    focus: "center 62%",
    description:
      "250g of whatever we are most excited about that week, roasted within the last five days.",
    tags: ["Retail"],
    rating: 5,
    featured: false,
    cup: null,
  },
];

export const featuredItems = menuItems.filter((item) => item.featured);

/** Items the 3D spotlight on the menu page can render. */
export const spotlightItems = menuItems.filter(
  (item) => item.cup || item.model
);
