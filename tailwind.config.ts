import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {



      fontFamily: {
        B_Traffic: ['var(--B_Traffic)'],
        B_Traffic_Bold: ['var(--B_Traffic_Bold)'],
        B_Yekan: ['var(--B_Yekan)'],

      }
    },
  },
  plugins: [nextui()],
};
export default config;
