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
        "forge-red":          "#D85A30",
        gold:                 "#C9952A",
        copper:               "#B87333",
        "copper-light":       "#D4956A",
        "copper-dark":        "#7A4A1E",
        "iron-black":         "#0A0A09",
        "iron-dark":          "#0D0D0C",
        "iron-mid":           "#161614",
        "iron-light":         "#252522",
        "iron-border":        "#2E2E2B",
        "iron-border-light":  "#444440",
        ash:                  "#6A6A62",
        smoke:                "#B0B0A8",
        "off-white":          "#F0F0EC",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        pulse:      "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in":  "fadeIn 0.6s ease forwards",
        "fade-up":  "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        marquee:    "marquee 40s linear infinite",
        glow:       "glow 4s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.3" },
          "50%":       { opacity: "0.8" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(184,115,51,0.2)" },
          "50%":       { borderColor: "rgba(184,115,51,0.7)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
