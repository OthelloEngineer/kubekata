import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";

const config = {
  kit: {
    tailwindcss: {},
    autoprefixer: {},
  },
  preprocess: vitePreprocess(),
};

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
