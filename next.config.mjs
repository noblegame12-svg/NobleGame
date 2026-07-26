/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- Tambahkan baris ini
  images: {
    unoptimized: true, // <-- Sangat disarankan untuk static export
  }
};

export default nextConfig;

