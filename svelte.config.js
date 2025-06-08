import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const isProd = process.env.NODE_ENV === "production";

/** @type {import("@sveltejs/kit".Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: isProd ? "/website" : "",
		},
	}
};

export default config;
