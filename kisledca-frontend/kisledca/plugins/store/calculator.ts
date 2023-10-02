import { cloneDeep } from "lodash";
export enum ETipsCalMethod {
	BEFORE_TAX = "before",
	AFTER_TAX = "after",
}
export interface ITaxTips {
	rate: number;
	fee: number;
	shorthand: string;
	description: string;
	selected: boolean;
	shown: boolean;
}
export enum ECurrency {
	USD = "USD",
	CAD = "CAD",
	HKD = "HKD",
	TWD = "TWD",
	KRW = "KRW",
	JPY = "JPY",
	GBP = "GBP",
}
export interface ICalculatorState {
	input: string;
	srcCurrency: ECurrency;
	targetCurrency: ECurrency;
	currency: Record<string, number>;
	tax: ITaxTips[];
	tips: ITaxTips[];
	tipsMode: ETipsCalMethod;
}
const defaultCalculatorData = (): ICalculatorState => ({
	input: "",
	srcCurrency: ECurrency.CAD,
	targetCurrency: ECurrency.HKD,
	currency: {
		USDCAD: 1.35615,
		USDHKD: 7.83055,
		USDTWD: 32.234504,
		USDKRW: 1350.980384,
		USDJPY: 149.43904,
		USDGBP: 0.81941,
		USDAUD: 1.554388,
		USDUSD: 1,
	},
	tax: [
		{
			rate: 0,
			fee: 0,
			shorthand: "0%",
			description: "zero tax",
			selected: true,
			shown: true,
		},
		{
			rate: 0.05,
			fee: 0,
			shorthand: "5%",
			description: "GST",
			selected: false,
			shown: true,
		},
		{
			rate: 0.08,
			fee: 0,
			shorthand: "8%",
			description: "House insurance tax",
			selected: false,
			shown: true,
		},
		{
			rate: 0.12,
			fee: 0,
			shorthand: "5+7%",
			description: "BC GST+PST",
			selected: false,
			shown: true,
		},
		{
			rate: 0.13,
			fee: 0,
			shorthand: "13%",
			description: "ON HST",
			selected: false,
			shown: true,
		},
		{
			rate: 0.15,
			fee: 0,
			shorthand: "15%",
			description: "Non-ON HST",
			selected: false,
			shown: true,
		},
	],
	tipsMode: ETipsCalMethod.BEFORE_TAX,
	tips: [
		{
			rate: 0,
			fee: 0,
			shorthand: "0%",
			description: "take away",
			selected: true,
			shown: true,
		},
		{
			rate: 0.1,
			fee: 0,
			shorthand: "10%",
			description: "Chinese Restaurant",
			selected: false,
			shown: true,
		},
		{
			rate: 0.12,
			fee: 0,
			shorthand: "12%",
			description: "Good",
			selected: false,
			shown: true,
		},
		{
			rate: 0.15,
			fee: 0,
			shorthand: "15%",
			description: "very good",
			selected: false,
			shown: true,
		},
		{
			rate: 0.18,
			fee: 0,
			shorthand: "18%",
			description: "excellent",
			selected: false,
			shown: true,
		},
		{
			rate: 0.2,
			fee: 0,
			shorthand: "20%",
			description: "Fabulous",
			selected: false,
			shown: true,
		},
		{
			rate: 0.3,
			fee: 0,
			shorthand: "30%",
			description: "The restaurant is crazy",
			selected: false,
			shown: true,
		},
		{
			rate: 0.3,
			fee: 0,
			shorthand: "custom",
			description: "at your choice",
			selected: false,
			shown: true,
		},
	],
});
export const CalculatorModule = {
	namespaced: true,
	state: defaultCalculatorData(),
	mutations: {
		updateInput(state: ICalculatorState, input: string) {
			state.input = input;
		},
		updateCurrency(
			state: ICalculatorState,
			currency: Record<string, number>
		) {
			state.currency = currency;
		},
		updateSrcCurrency(state: ICalculatorState, currency: ECurrency) {
			state.srcCurrency = currency;
		},
		updateTargetCurrency(state: ICalculatorState, currency: ECurrency) {
			state.targetCurrency = currency;
		},
		addTips(state: ICalculatorState, newTips: ITaxTips) {
			state.tips.push(newTips);
		},
		addTax(state: ICalculatorState, newTax: ITaxTips) {
			state.tax.push(newTax);
		},
		removeTips(state: ICalculatorState, shorthand: string) {
			const index = state.tips.findIndex(
				(e) => e.shorthand === shorthand
			);
			state.tips.splice(index, 1);
		},
		removeTax(state: ICalculatorState, shorthand: string) {
			const index = state.tax.findIndex((e) => e.shorthand === shorthand);
			state.tax.splice(index, 1);
		},
		toggleShownTax(state: ICalculatorState, shorthand: string) {
			state.tax.forEach((e) => {
				if (e.shorthand === shorthand) {
					e.shown = !e.shown;
				}
			});
		},
		toggleShownTips(state: ICalculatorState, shorthand: string) {
			state.tips.forEach((e) => {
				if (e.shorthand === shorthand) {
					e.shown = !e.shown;
				}
			});
		},
		selectTax(state: ICalculatorState, shorthand: string) {
			state.tax.forEach((e) => {
				if (e.shorthand === shorthand) {
					e.selected = true;
				} else {
					e.selected = false;
				}
			});
		},
		selectTips(state: ICalculatorState, shorthand: string) {
			state.tips.forEach((e) => {
				if (e.shorthand === shorthand) {
					e.selected = true;
				} else {
					e.selected = false;
				}
			});
		},
		factoryReset(state: ICalculatorState) {
			const orgState = defaultCalculatorData();
			Object.keys(orgState).forEach((e) => {
				state[e] = cloneDeep(orgState[e]);
			});
		},
		updateTipsMode(state: ICalcuulatorState, method: ETipsCalMethod) {
			state.tipsMode = method;
		},
	},
	actions: {
		async updateCurrency({ commit }: any) {
			//TODO fetch API and update the currency
			const currency = {
				USDCAD: 1.35615,
				USDHKD: 7.83055,
				USDTWD: 32.234504,
				USDKRW: 1350.980384,
				USDJPY: 149.43904,
				USDGBP: 0.81941,
				USDAUD: 1.554388,
				USDUSD: 1,
			};
			commit("updateCurrency", currency);
		},
	},
	getters: {
		conversionRate(state: ICalculatorState) {
			let src = state.srcCurrency;
			let target = state.targetCurrency;
			if (src === ECurrency.USD && target === ECurrency.USD) {
				return 1;
			}
			if (src === ECurrency.USD) {
				return state.currency[
					Object.keys(state.currency).find((e) =>
						e.endsWith(target)
					) as NonNullable<string>
				];
			}
			if (target === ECurrency.USD) {
				return (
					1 /
					state.currency[
						Object.keys(state.currency).find((e) =>
							e.endsWith(target)
						) as NonNullable<string>
					]
				);
			}
			return (
				(1 /
					state.currency[
						Object.keys(state.currency).find((e) =>
							e.endsWith(src)
						) as NonNullable<string>
					]) *
				state.currency[
					Object.keys(state.currency).find((e) =>
						e.endsWith(target)
					) as NonNullable<string>
				]
			);
		},
		defaultState(state: ICalculatorState) {
			return defaultCalculatorData();
		},
		getNumericInput(state: ICalculatorState) {
			if (state.input.startsWith(".")) {
				return Number(`0${state.input}`);
			} else if (state.input.endsWith(".")) {
				return Number(`${state.input}0`);
			} else if (state.input === "") {
				return Number(`0`);
			} else {
				return Number(`${state.input}`);
			}
		},
		getTaxRateOrFee(state: ICalculatorState) {
			const selectedTax = state.tax.find(
				(e) => e.selected
			) as NonNullable<ITaxTips>;
			return {
				value: selectedTax.rate || selectedTax.fee,
				mode: selectedTax.rate > 0 ? "rate" : "fee",
			};
		},
		getTipsRateOrFee(state: ICalculatorState) {
			const selectedTips = state.tips.find(
				(e) => e.selected
			) as NonNullable<ITaxTips>;
			return {
				value: selectedTips.rate || selectedTips.fee,
				mode: selectedTips.rate > 0 ? "rate" : "fee",
			};
		},
	},
};
