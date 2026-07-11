import americano from "../../assets/images/menu/americano.jpg";
import cappuccino from "../../assets/images/menu/cappuccino.jpg";
import cheesecake from "../../assets/images/menu/cheesecake.jpg";
import coldbrew from "../../assets/images/menu/coldbrew.jpg";
import croissant from "../../assets/images/menu/croissant.jpg";
import espresso from "../../assets/images/menu/espresso.jpg";
import latte from "../../assets/images/menu/latte.jpg";
import mocha from "../../assets/images/menu/mocha.jpg";
import muffin from "../../assets/images/menu/muffin.jpg";

export const menuItems = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: "$5.99",
    image: espresso,
    description: "Rich Italian espresso made from premium beans.",
  },
  {
    id: 2,
    name: "Americano",
    category: "Coffee",
    price: "$6.49",
    image: americano,
    description: "Smooth espresso blended with hot water.",
  },
  {
    id: 3,
    name: "Latte",
    category: "Coffee",
    price: "$6.99",
    image: latte,
    description: "Creamy milk with handcrafted espresso.",
  },
  {
    id: 4,
    name: "Cappuccino",
    category: "Coffee",
    price: "$7.49",
    image: cappuccino,
    description: "Perfect balance of foam and espresso.",
  },
  {
    id: 5,
    name: "Mocha",
    category: "Coffee",
    price: "$7.99",
    image: mocha,
    description: "Chocolate meets premium coffee.",
  },
  {
    id: 6,
    name: "Cold Brew",
    category: "Cold Brew",
    price: "$6.99",
    image: coldbrew,
    description: "Slow brewed for 18 hours.",
  },
  {
    id: 7,
    name: "Cheesecake",
    category: "Dessert",
    price: "$5.49",
    image: cheesecake,
    description: "Fresh baked cheesecake.",
  },
  {
    id: 8,
    name: "Croissant",
    category: "Dessert",
    price: "$4.99",
    image: croissant,
    description: "Buttery French croissant.",
  },
  {
    id: 9,
    name: "Muffin",
    category: "Dessert",
    price: "$3.99",
    image: muffin,
    description: "Fresh blueberry muffin.",
  },
];
