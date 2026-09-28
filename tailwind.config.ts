import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ECF0F1",
        panel: "#FFFFFF",
        panel2: "#ECF0F1",
        border: "#BDC3C7",
        ink: "#2C3E50",
        muted: "#5F6E7C",
        accent: "#2C3E50",
        accent2: "#34495E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;