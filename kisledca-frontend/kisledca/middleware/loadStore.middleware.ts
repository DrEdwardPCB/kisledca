export default defineNuxtRouteMiddleware(async (to, from) => {
	const { $store } = useNuxtApp();
	await $store.restored;
	return;
});
