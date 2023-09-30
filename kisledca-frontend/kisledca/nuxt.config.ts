// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	routeRules: {
		"/calculator/**": { ssr: false },
	},
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
	modules: ["@kevinmarrec/nuxt-pwa"],
	pwa: {
		workbox: {
			enabled: true,
		},
	},
});
