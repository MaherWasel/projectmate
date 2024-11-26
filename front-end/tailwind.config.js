/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#222831",
        lightGray: "#31363F",
        lightBlue: "#76ABAE",
        lightBlueHover: "#4FA8AD", // Hover color for default state
        redError: "#BB2124",
        redErrorHover: "#9B2023", // Hover color for error state
        // Focus colors
        lightBlueFocus: "#76c7c9", // Focus border for default state
        redErrorFocus: "#d64548", // Focus border for error state
        brighterGray: "#40454F",
      },
    },
  },
  plugins: [],
};
