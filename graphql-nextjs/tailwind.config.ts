import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "!./node_modules"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
