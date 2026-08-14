/**
 * Single source of truth for the café's public details.
 * Every section reads from here so a change to the phone number,
 * opening hours or socials only has to be made once.
 */

export const SITE = {
  name: "Brew Haven",
  tagline: "Coffee House",
  founded: 2012,
  description:
    "An artisan coffee house and micro-roastery pouring single-origin espresso, slow-steeped cold brew and fresh-baked pastries.",
};

export const CONTACT = {
  phone: "+1 (415) 555-0142",
  phoneHref: "tel:+14155550142",
  email: "hello@brewhaven.coffee",
  emailHref: "mailto:hello@brewhaven.coffee",
  address: {
    line1: "24 Roasters Lane",
    line2: "San Francisco, CA 94107",
  },
  mapQuery: "24 Roasters Lane, San Francisco, CA",
};

export const HOURS = [
  { days: "Monday – Thursday", time: "7:00 AM – 9:00 PM" },
  { days: "Friday", time: "7:00 AM – 11:00 PM" },
  { days: "Saturday", time: "8:00 AM – 11:00 PM" },
  { days: "Sunday", time: "8:00 AM – 9:00 PM" },
];

export const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Menu", to: "/menu" },
  { name: "Gallery", to: "/gallery" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "X", href: "https://x.com", icon: "twitter" },
  { name: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
];

export const STATS = [
  { value: "4.9", suffix: "★", label: "Guest Rating" },
  { value: "2500", suffix: "+", label: "Happy Guests" },
  { value: "15", suffix: "+", label: "Coffee Blends" },
  { value: "12", suffix: "yrs", label: "Of Roasting" },
];

export const VALUES = [
  {
    title: "Single-Origin Beans",
    description:
      "We buy directly from a handful of farms in Ethiopia, Colombia and Sumatra, paying above fair-trade rates for every harvest.",
    icon: "bean",
  },
  {
    title: "Roasted In-House",
    description:
      "Our drum roaster runs every morning, so the beans in your cup were almost certainly green fruit fewer than ten days ago.",
    icon: "fire",
  },
  {
    title: "Trained Baristas",
    description:
      "Every barista completes a twelve-week apprenticeship before they are allowed to pull a shot for a guest.",
    icon: "mug",
  },
  {
    title: "Zero-Waste Kitchen",
    description:
      "Spent grounds go to a community garden, pastries are baked to order, and every cup we serve is fully compostable.",
    icon: "leaf",
  },
];

export const TEAM = [
  {
    name: "Amara Osei",
    role: "Founder & Head Roaster",
    since: 2012,
    bio: "Twelve years behind the drum roaster and still tasting every batch before it leaves the building.",
  },
  {
    name: "Luca Ferrari",
    role: "Head Barista",
    since: 2016,
    bio: "Three-time regional latte-art finalist. Runs our barista apprenticeship programme.",
  },
  {
    name: "Priya Raman",
    role: "Pastry Chef",
    since: 2018,
    bio: "Bakes everything on site each morning, from the laminated croissants to the burnt basque cheesecake.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sofia Marchetti",
    role: "Regular since 2019",
    rating: 5,
    quote:
      "The only place in the city where the espresso is as thoughtful at 4pm as it is at 7am. The cortado is perfect, every single time.",
  },
  {
    name: "Daniel Whitfield",
    role: "Food writer",
    rating: 5,
    quote:
      "Brew Haven roasts with real restraint — nothing is scorched to hide a flaw. Their Ethiopian pour-over tastes like ripe apricot.",
  },
  {
    name: "Mei Lin Chen",
    role: "Works from the corner table",
    rating: 5,
    quote:
      "Fast wifi, quiet mornings, and staff who remember your order. I have written two dissertations from that window seat.",
  },
  {
    name: "Jonah Ekstrom",
    role: "Weekend visitor",
    rating: 5,
    quote:
      "We booked the back room for a birthday brunch. The team handled twenty guests without a single order going astray.",
  },
];

export const FAQS = [
  {
    question: "Do you take reservations?",
    answer:
      "Yes. Tables can be booked online up to 30 days ahead. Walk-ins are always welcome, but weekend brunch fills quickly.",
  },
  {
    question: "Is there space to work during the day?",
    answer:
      "Absolutely. We have power at every table, fibre wifi, and a quiet mezzanine. We only ask that laptops are packed away after 6pm on Fridays and Saturdays.",
  },
  {
    question: "Can I buy your beans to brew at home?",
    answer:
      "Every blend we pour is sold as whole beans at the counter, roasted within the last week. We will grind them to your brewer for free.",
  },
  {
    question: "Do you cater for dietary requirements?",
    answer:
      "Oat, almond and soy milks are always stocked at no extra charge, and there are gluten-free and vegan options in the pastry case daily.",
  },
];

/** Reservation form options. */
export const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

export const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const OCCASIONS = [
  "Just coffee",
  "Birthday",
  "Anniversary",
  "Business meeting",
  "Study session",
];
