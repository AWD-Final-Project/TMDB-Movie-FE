/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        today: {
          "0%": { transform: "translateX(100px)" },
          "100%": { transform: "translateX(0px)" },
        },
        thisweek: {
          "0%": { transform: "translateX(-75px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        today: "today 0.3s ease-in-out",
        thisweek: "thisweek 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
  important: true,
};
