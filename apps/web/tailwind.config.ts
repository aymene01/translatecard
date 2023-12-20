import type { Config } from "tailwindcss";
import sharedConfig from "@translatecard/config/tailwind/tailwind.config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [sharedConfig],
};

export default config;