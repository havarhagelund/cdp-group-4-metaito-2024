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
        primary: {
          default: "#2BA6B6",
          second: "#4FC4CF",
        },
        secondary: {
          default: "#E78C88",
          second: "#994FF3",
        },
        background: {
          default: "#F9FAFB",
          widget: "#F3F7FB",
        },
        text: {
          default: "#262626",
          header: "#121826",
          subheader: "#4D5562",
        },
        lines: {
          default: "#D1D5DB",
        },
        table: {
          default: "#EFF0F1",
        },
        success: {
          default: "#54B65B",
        },
        error: {
          default: "#D6424D",
          second: "#FBECED",
        },
      },
    },
  },
  plugins: [],
};
export default config;
