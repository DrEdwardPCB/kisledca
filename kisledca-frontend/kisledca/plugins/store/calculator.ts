export enum ETipsCalMethod {
	BEFORE_TAX,
	AFTER_TAX,
}
export interface ITaxTips {
	rate: number;
	fee: number;
	shorthand: string;
	description: string;
	selected: boolean;
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
	tax: ITaxTips;
	tips: ITaxTips;
	tipsMode: ETipsCalMethod;
}
export const CalculatorModule = {
	namespaced: true,
	state() {
		return {
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
				},
				{
					rate: 0.05,
					fee: 0,
					shorthand: "5%",
					description: "GST",
					selected: false,
				},
				{
					rate: 0.08,
					fee: 0,
					shorthand: "8%",
					description: "House insurance tax",
					selected: false,
				},
				{
					rate: 0.12,
					fee: 0,
					shorthand: "5+7%",
					description: "BC GST+PST",
					selected: false,
				},
				{
					rate: 0.13,
					fee: 0,
					shorthand: "13%",
					description: "ON HST",
					selected: false,
				},
				{
					rate: 0.15,
					fee: 0,
					shorthand: "15%",
					description: "Non-ON HST",
					selected: false,
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
				},
				{
					rate: 0.1,
					fee: 0,
					shorthand: "10%",
					description: "Chinese Restaurant",
					selected: false,
				},
				{
					rate: 0.12,
					fee: 0,
					shorthand: "12%",
					description: "Good",
					selected: false,
				},
				{
					rate: 0.15,
					fee: 0,
					shorthand: "15%",
					description: "very good",
					selected: false,
				},
				{
					rate: 0.18,
					fee: 0,
					shorthand: "18%",
					description: "excellent",
					selected: false,
				},
				{
					rate: 0.2,
					fee: 0,
					shorthand: "20%",
					description: "Fabulous",
					selected: false,
				},
				{
					rate: 0.3,
					fee: 0,
					shorthand: "30%",
					description: "The restaurant is crazy",
					selected: false,
				},
				{
					rate: 0.3,
					fee: 0,
					shorthand: "custom",
					description: "at your choice",
					selected: false,
				},
			],
		};
	},
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
		addTips(state: ICalculatorState, newTips: ITaxTips) {
			const tip = state.tip;
			tax.push(newTip);
		},
		addTax(state: ICalculatorState, newTax: ITaxTips) {
			const tax = state.tax;
			tax.push(newTax);
		},
		selectTax(state: ICalculatorState, shorthand: string) {
			const tax = state.tax;
			state.tax = tax.map((e) => {
				if (e.shorthand === shorthand) {
					return { ...e, selected: true };
				} else {
					return { ...e, selected: false };
				}
			});
		},
		selectTips(state: ICalculatorState, shorthand: string) {
			const tips = state.tips;
			state.tips = tips.map((e) => {
				if (e.shorthand === shorthand) {
					return { ...e, selected: true };
				} else {
					return { ...e, selected: false };
				}
			});
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
	},
};
