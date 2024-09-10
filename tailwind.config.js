import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["ArialMT", "sans-serif"],
        brandon: ["BrandonGrotesque", "sans-serif"],
        droid: ["DroidSerif", "sans-serif"],
        neustra: ["NeutrafaceText", "sans-serif"],
        opensans: ["OpenSans", "sans-serif"],
      },
    },
  },
  plugins: [react()],
}

