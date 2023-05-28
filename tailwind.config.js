/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "470px"
      },
      boxShadow: {
        bar: "0px 1px 3px rgba(0, 0, 0, 0.3)"
      },
      textShadow: {
        sm: "0 1px 1px rgba(0, 0, 0, 0.2)",
        default: "0 1px 2px rgba(0, 0, 0, 0.2)",
        md: "0 2px 4px rgba(0, 0, 0, 0.2)"
      },
      boxShadow: {
        "card": "0 0 10px rgba(0, 0, 0, 0.1)"
      },
      colors: {
        "primary-color": "#496bbe",
        "primary-color-dark": "#2a4b8c",
        "secondary-color": "#f5f5f5",
        "highlight-color": "#87cefa",
        "text-color": "#333333",
        "text-color-light": "#666666"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse, #87cefa 20%, #fff 70%)",
        "translate-gradient":
          "radial-gradient(circle at top right, #87cefa 15rem, #d9c0f3 40rem, #fff 50rem);"
      },
      height: {
        "slide-image-height": "calc(100vh - 2rem)"
      },
      fontFamily: {
        times: ["Times New Roman", "serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    function({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("last-child", "&>*:last-child");
    }
  ]
};
