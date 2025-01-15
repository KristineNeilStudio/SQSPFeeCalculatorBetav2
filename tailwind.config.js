/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: "#111827",
          dark: "#2d3a47",
          medium: "#475c73",
          light: "#c3cbd7",
          lightest: "#f0f2f5",
        },
        accent: {
          red: "#2d3a47",
          "red-light": "#c3cbd7",
          navy: "#111827",
        },
        ui: {
          white: "#ffffff",
          border: "#c3cbd7",
          "background-shade": "#f0f2f5",
          button: "#c83e2d",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        display: ["Open Sans", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        calculator:
          "0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)",
        hover: "0 8px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
