/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
      domains: ["upcdn.io", "replicate.delivery", "lh3.googleusercontent.com"],
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