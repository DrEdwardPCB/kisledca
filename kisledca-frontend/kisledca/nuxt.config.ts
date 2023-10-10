// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	typescript: {
		strict: true,
	},
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: [
		"@kevinmarrec/nuxt-pwa",
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
	],
	pwa: {
		workbox: {
			enabled: true,
		},
	},
	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
});
