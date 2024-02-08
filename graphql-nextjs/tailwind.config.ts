import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "!./node_modules"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
