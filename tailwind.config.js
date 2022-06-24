module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
        lora: "'Lora', serif",
        mono: "'Roboto Mono', monospace",
      },
      colors: {
        coldBlue: {
          50: "#CED2F9",
          100: "#A2AAF4",
          200: "#7480EC",
          300: "#5D6BE6",
          400: "#3140C3",
        },
        slime: {
          50: "#C8F6EB",
          100: "#9BEEDA",
          200: "#81E2CA",
          300: "#5DE6C5",
          400: "#2BC19D",
        },
      },
    },
  },
  plugins: [],
};
