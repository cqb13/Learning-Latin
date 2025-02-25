/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "470px",
        mdLg: "800px",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out",
        slideOut: "slideOut 0.5s ease-in-out",
      },
      textShadow: {
        sm: "0 1px 1px rgba(0, 0, 0, 0.2)",
        default: "0 1px 2px rgba(0, 0, 0, 0.2)",
        md: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
      boxShadow: {
        card: "0 0 10px rgba(0, 0, 0, 0.1)",
        bar: "0px 1px 3px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "primary-color": "#496bbe",
        "primary-color-dark": "#2a4b8c",
        "secondary-color": "#f5f5f5",
        "highlight-color": "#87cefa",
        "text-color": "#333333",
        "text-color-light": "#666666",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse, #87cefa 20%, #fff 70%)",
        "translate-gradient":
          "radial-gradient(circle at top right, #87cefa 15%, #d9c0f3 40%, #fff 100%)",
        "practice-gradient":
          "linear-gradient(232deg, rgba(255,255,255,1) 23%, rgba(135,206,250,1) 37%, rgba(217,192,243,1) 53%, rgba(255,255,255,1) 69%)",
        "practice-nav-gradient":
          "radial-gradient(circle, rgba(148,187,233,0.8) 5%, rgba(148,187,233,0.5) 34%, rgba(255,255,255,1) 100%)",
        "textbook-gradient":
          "linear-gradient(99deg, rgba(255,255,255,0.4) 3%, rgba(135,206,250,0.5) 36%, rgba(217,192,243,0.4) 59%, rgba(255,255,255,1) 68%)",
        "game-nav-gradient":
          "linear-gradient(40deg, rgba(217,192,243,1) 6%, rgba(217,192,243,0.4) 56%, rgba(255,255,255,1) 68%)",
        "hangman-gradient":
          "linear-gradient(110deg, #dbf0ff 0%, #c2d1f0 40%, #dcd3ff 80%)",
        "wordle-gradient":
          "linear-gradient(95deg, #ffffff 0%, #a3d8f4 50%, #beb2f8 100%)",
        "not-set-3":
          "linear-gradient(135deg, #e6f9ff 0%, #c9d6ff 50%, #e2e2e2 100%)",
        "not-set-4":
          "linear-gradient(190deg, rgba(255,255,255,1) 15%, rgba(135,206,250,0.6) 50%, rgba(217,192,243,0.4) 85%)",
        "not-set-5":
          "radial-gradient(circle at bottom left, #ffffff 20%, #87cefa 50%, #d9c0f3 80%)",
        "not-set-6":
          "linear-gradient(120deg, rgba(255,255,255,0.3) 10%, rgba(135,206,250,0.7) 45%, rgba(217,192,243,0.5) 80%)",
      },
      height: {
        "slide-image-height": "calc(100vh - 2rem)",
      },
      fontFamily: {
        times: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("last-child", "&>*:last-child");
    },
  ],
};
