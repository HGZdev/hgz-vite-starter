import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    fontFamily: {
      sans: ["Dosis", "sans-serif"],
    },
  },
  daisyui: {
    // base: false, // applies background color and foreground color for root element by default
    themes: [
      {
        main: {
          "base-100": "#fff", // Base color of page, used for blank backgrounds + "FOCUS" bg-color
          // "base-content": "yellow", // Foreground content color to use on base color	optional + "FOCUS" color

          // neutral: "#000", // "ACTIVE" bg-color
          // "neutral-content": "#000", // "Click" "ACTIVE" color

          primary: "#4573bc",
          secondary: "#7E4FC8",
          accent: "#69b281",
          info: "#006cd5",
          success: "#00c000",
          warning: "#ff7f00",
          error: "#e12154",

          ".btn-sm": {
            height: "2rem",
            "min-height": "2rem",
          },
          ".btn-md": {
            height: "2.5rem",
            minHeight: "2.5rem",
          },
          ".btn-lg": {
            height: "3rem",
            minHeight: "3rem",
          },
        },
        navbar: {
          "base-content": "#fff", // "FOCUS" color
          "neutral-content": "#fff", // "Click" "ACTIVE" color
        },
        form: {},
      },
      "dark",
    ],
  },
};
