import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/*/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101317",
        flamingo: "#f06472",
        coral: "#ff8a65",
        mint: "#7dd3c7",
        paper: "#fbfaf8"
      },
      boxShadow: {
        soft: "0 20px 80px rgba(16,19,23,0.10)"
      }
    }
  },
  plugins: []
};

export default config;
