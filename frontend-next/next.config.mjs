/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The photography is imported statically from src/assets, so no remote
    // patterns are needed. AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],

    // Next 16 narrowed this to [75] by default and coerces anything else to
    // the nearest allowed value — so a `quality` prop that is not listed here
    // is silently ignored rather than honoured. 55 is for the blurred
    // backdrops, where the detail a higher setting buys is removed by the blur
    // anyway; everything else stays on the 75 default.
    qualities: [55, 75],
  },

  // The café site is fully static apart from the forms, which talk to the
  // Express API from the browser.
  reactStrictMode: true,
};

export default nextConfig;
