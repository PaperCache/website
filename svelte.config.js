import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const isProd = process.env.NODE_ENV === "production";

/** @type {import("@sveltejs/kit".Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: "index.html",
			pages: "build",
			assets: "build",
		}),

		paths: {
			base: isProd ? "/website" : "",
		},

		prerender: {
			entries: [],
		}
	}
};

export default config;
