/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The photography is imported statically from src/assets, so no remote
    // patterns are needed. AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
  },

  // The café site is fully static apart from the forms, which talk to the
  // Express API from the browser.
  reactStrictMode: true,
};

export default nextConfig;
