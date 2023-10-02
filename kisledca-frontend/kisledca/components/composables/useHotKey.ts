import { onMounted, onUnmounted } from "vue";
export default function useHotKey(
	key: string,
	handler: (e: KeyboardEvent) => void
) {
	function keydownHandler(e: KeyboardEvent) {
		if (e.key === key) {
			handler(e);
		}
	}
	onMounted(() => {
		window.addEventListener("keydown", keydownHandler);
	});
	onUnmounted(() => {
		window.removeEventListener("keydown", keydownHandler);
	});
}
