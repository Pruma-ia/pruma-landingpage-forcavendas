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
        pruma: {
          navy:         "#0D1B4B",
          "navy-mid":   "#162460",
          "navy-deep":  "#1E3080",
          cyan:         "#00AEEF",
          "cyan-light": "#5CCFF5",
          "cyan-pale":  "#E0F6FE",
          white:        "#FFFFFF",
          "off-white":  "#FAFAFA",
          "gray-soft":  "#F4F6F9",
          "gray-text":  "#5B6B85",
          red:          "#DC2626",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)",     "system-ui",    "sans-serif"],
        serif: ["var(--font-fraunces)",  "Georgia",      "serif"],
        mono:  ["var(--font-mono)",      "ui-monospace", "monospace"],
      },
      boxShadow: {
        "pruma-sm":   "0 1px 3px rgba(13, 27, 75, 0.06)",
        "pruma-md":   "0 8px 32px rgba(13, 27, 75, 0.08)",
        "pruma-cyan": "0 4px 12px rgba(0, 174, 239, 0.18)",
      },
      borderRadius: {
        "pruma-sm": "8px",
        "pruma-md": "12px",
        "pruma-lg": "16px",
      },
      letterSpacing: {
        eyebrow: "0.12em",
      },
      spacing: {
        "eyebrow-line":      "32px",
        "section-y-mobile":  "96px",
        "section-y-desktop": "128px",
      },
      transitionTimingFunction: {
        "pruma-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
