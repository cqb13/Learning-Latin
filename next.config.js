/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "upcdn.io" },
        { protocol: "https", hostname: "replicate.delivery" },
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
      ],
    },
    async redirects() {
      return [
        {
          source: "/github",
          destination: "https://github.com/cqb13/learning-latin",
          permanent: false,
        },
      ];
    },
  };