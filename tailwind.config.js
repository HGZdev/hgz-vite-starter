/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4970A2",
          secondary: "#85BFE1",
          accent: "palegreen",
          neutral: "#0a2d3e",
          "base-100": "#fff",
          info: "#006cd5",
          success: "#58a089",
          warning: "#ffb300",
          error: "#cc0000",
        },
      },
    ],
  },
};
