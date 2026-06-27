import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "forge-red": "#D85A30",
        gold: "#C9952A",
        "iron-black": "#1A1A18",
        "iron-dark": "#111110",
        "iron-mid": "#2A2A27",
        "iron-light": "#3A3A36",
        "iron-border": "#404040",
        ash: "#8A8A82",
        smoke: "#C4C4BC",
        "off-white": "#F0F0EC",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
