/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#141414",
        },
        gold: {
          DEFAULT: "#D4A574",
          light: "#E8C9A0",
          deep: "#B8894F",
        },
        bone: "#F5F1EA",
        mint: "#4FB286",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        script: ["'Modern Negra'", "'Playfair Display'", "'Great Vibes'", "cursive"],
        modern: ["'Modern Negra'", "'Playfair Display'", "Georgia", "serif"],
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "bounce-slow": "bounce 2.5s infinite",
      },
    },
  },
  plugins: [],
};
