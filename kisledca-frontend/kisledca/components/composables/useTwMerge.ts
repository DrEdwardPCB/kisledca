import { twMerge, ClassNameValue } from "tailwind-merge";
export default function useTwMerge(classname: string) {
	const attr = useAttrs();
	const twClass = computed(() =>
		twMerge(classname, attr.class as ClassNameValue)
	);
	return { twClass };
}
