import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Landing page palette
        navy: "#0c1a3a",
        "navy-light": "#142248",
        gold: "#c9a84c",
        "gold-dark": "#b8933d",
        "warm-gray": "#f8f7f4",

        // Admin dashboard palette
        "admin-bg": "#0f172a",
        "admin-card": "#1e293b",
        "admin-border": "#334155",
        "admin-text": "#f1f5f9",
        "admin-muted": "#94a3b8",
        "admin-blue": "#3b82f6",
        "admin-green": "#22c55e",
        "admin-red": "#ef4444",
        "admin-amber": "#f59e0b",
        "admin-gold": "#c9a84c",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
