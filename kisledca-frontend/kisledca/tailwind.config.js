/** @type {import('tailwindcss').Config} */
export default {
	prefix: "tw-",
	important: true,
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		theme: ["night"],
	},
};
