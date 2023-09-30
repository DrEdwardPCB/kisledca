import { createStore } from "vuex";
import { CalculatorModule } from "./store/calculator";
import VuexPersistence from "vuex-persist";

const vuexPersist = new VuexPersistence<any, any>({
	storage: localStorage,
});

const store = createStore({
	modules: {
		calculator: CalculatorModule,
	},
	plugins: [vuexPersist.plugin],
});

export default defineNuxtPlugin(() => {
	return {
		provide: {
			store: store,
		},
	};
	// Install the store instance as a plugin
});
