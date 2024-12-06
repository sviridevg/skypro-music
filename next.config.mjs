/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tracks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
