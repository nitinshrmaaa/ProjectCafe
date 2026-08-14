import { Playfair_Display, Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { CONTACT, SITE } from "@/utils/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://brewhaven.example.com"),
  title: {
    default: `${SITE.name} — Artisan Coffee House & Roastery`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: `${SITE.name} Coffee House` }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Artisan Coffee House & Roastery`,
    description: SITE.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#0a0908",
};

/** Structured data so search results carry the hours and address. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: SITE.name,
  description: SITE.description,
  servesCuisine: "Coffee",
  priceRange: "$$",
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.line1,
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94107",
    addressCountry: "US",
  },
  openingHours: ["Mo-Fr 07:00-21:00", "Sa-Su 08:00-23:00"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` for in-page anchors. Since
      // Next 16 the router only suspends that during a route transition when
      // this attribute is present — without it, "Home" from a scrolled /menu
      // tries to *animate* back to the top and lands wherever it gets to.
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <BackToTop />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
