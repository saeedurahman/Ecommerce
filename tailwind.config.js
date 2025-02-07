/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#1E1E1E",
        customDarkBlue: "#19202E",
        customWhite: "#FFFFFF",
        customGray: "#535F79",
        customBlackGray: "#21293B",
        customLightGray: "#333E56",
        customGreen: "#22A081",
      },
    },
  },
  plugins: [],
};
