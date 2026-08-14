import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import gallery5 from "../../assets/images/gallery/gallery5.jpg";
import gallery6 from "../../assets/images/gallery/gallery6.jpg";
import gallery7 from "../../assets/images/gallery/gallery7.jpg";
import gallery8 from "../../assets/images/gallery/gallery8.jpg";
import gallery9 from "../../assets/images/gallery/gallery9.jpg";

export const GALLERY_CATEGORIES = ["All", "The Room", "The Craft", "The People"];

/**
 * `span` drives the mosaic layout on large screens.
 * `focus` nudges object-position for photos whose subject sits off-centre.
 */
export const galleryImages = [
  {
    id: 1,
    image: gallery2,
    title: "The Counter",
    description:
      "Where the queue forms on a Saturday — pastry case, chalkboard and whatever we are pouring that week.",
    category: "The Room",
    span: "lg:col-span-6 lg:row-span-2",
  },
  {
    id: 2,
    image: gallery4,
    title: "The Pastry Bench",
    description:
      "Tiramisu going together by hand, one soaked ladyfinger at a time, before the doors open.",
    category: "The Craft",
    span: "lg:col-span-3",
  },
  {
    id: 3,
    image: gallery3,
    title: "The Brew Shelf",
    description:
      "Every brewer, grinder and bag on this shelf is something we use daily — and something you can take home.",
    category: "The Craft",
    span: "lg:col-span-3",
  },
  {
    id: 4,
    image: gallery5,
    title: "Evening Terrace",
    description:
      "The lights go on at seven and the outside tables are the first ones taken.",
    category: "The Room",
    span: "lg:col-span-6",
  },
  {
    id: 5,
    image: gallery6,
    title: "Regulars",
    description:
      "A Wednesday afternoon under the wall of prints, and a conversation that outlasted three cups.",
    category: "The People",
    span: "lg:col-span-4",
  },
  {
    id: 6,
    image: gallery8,
    title: "Mid-Morning",
    description:
      "A cappuccino, something warm from the oven, and absolutely no hurry.",
    category: "The People",
    span: "lg:col-span-4",
  },
  {
    id: 7,
    image: gallery7,
    title: "The Back Wall",
    description:
      "Herringbone brick, festoon lights and the quietest tables in the house.",
    category: "The Room",
    span: "lg:col-span-4",
  },
  {
    id: 8,
    image: gallery9,
    title: "Window Seats",
    description:
      "Jenga, iced coffee and the last of the afternoon light through the front windows.",
    category: "The People",
    span: "lg:col-span-12 lg:row-span-1",
    focus: "center 40%",
  },
];
