import { Component } from '@angular/core';

const RE = /^(\d+\.\d+|\d+|\d+\.|\.\d+|\.)$/;
@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
	display = '';
	numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
	operators = ['C', '<'];
	miscs = ['.'];
	taxs = [
		{ value: 0, name: '(0%)Zero Rate', description: 'zero rating, basic glocery are zero rated', selected: true },
		{ value: 0.05, name: '(5%) BC GST', description: 'GST of british columbia', selected: false },
		{ value: 0.12, name: '(5%+7%) BC GST+PST', description: 'GST and PST of british columbia', selected: false },
		{ value: 0.13, name: '(13%) Ontario HST', description: 'HST of ontario', selected: false },
	];
	tips = [
		{ value: 0, name: '(0%) Zero Rate', selected: true },
		{ value: 0.12, name: '(12%) satisfactory', description: '', selected: false },
		{ value: 0.15, name: '(15%) good', description: '', selected: false },
		{ value: 0.18, name: '(18%) very good', description: '', selected: false },
		{ value: 0.2, name: '(20%) excellent', description: '', selected: false },
	];
	currencies = [
		{ name: 'HKD', value: 5.81, selected: true },
		{ name: 'USD', value: 0.74, selected: false },
		{ name: 'TWD', value: 23.79, selected: false },
		{ name: 'RMB', value: 5.41, selected: false },
	];

	get rawPrice() {
		if (!Number.isNaN(Number(this.display))) {
			return Number(this.display);
		}
		if (/^\.$/.test(this.display)) {
			return 0;
		} else if (/^\d+\.$/.test(this.display)) {
			return Number(`${this.display}0`);
		} else {
			return Number(`0${this.display}`);
		}
	}
	get rawPriceCurrency() {
		const selectedCurrency = this.currencies.find((e) => e.selected)!.value;
		return selectedCurrency * this.rawPrice;
	}
	get Tax() {
		const selectedTaxRate = this.taxs.find((e) => e.selected)!.value;
		return selectedTaxRate * this.rawPrice;
	}
	get Tips() {
		const selectedTipsRate = this.tips.find((e) => e.selected)!.value;
		return selectedTipsRate * this.rawPrice;
	}

	get TaxCurrency() {
		const selectedCurrency = this.currencies.find((e) => e.selected)!.value;
		return selectedCurrency * this.Tax;
	}
	get TipsCurrency() {
		const selectedCurrency = this.currencies.find((e) => e.selected)!.value;
		return selectedCurrency * this.Tips;
	}

	get subTotal() {
		return this.Tax + this.Tips + this.rawPrice;
	}
	get subTotalCurrency() {
		return this.TaxCurrency + this.TipsCurrency + this.rawPriceCurrency;
	}
	get selectedCurrency() {
		return this.currencies.find((e) => e.selected)!.name;
	}

	numMiscClick(val: string) {
		const appended = `${this.display}${val.toString()}`;
		console.log(RE.test(appended), appended);
		if (RE.test(appended)) {
			this.display = appended;
		}
	}

	operatorClick(val: string) {
		switch (val) {
			case 'C':
				this.display = '';
				break;
			case '<':
				this.display = this.display.slice(0, -1);
				break;
		}
	}
	onSelectTaxs(name: string) {
		this.taxs = this.taxs.map((e) => {
			if (e.name === name) {
				return { ...e, selected: true };
			}
			return { ...e, selected: false };
		});
	}
	onSelectTips(name: string) {
		this.tips = this.tips.map((e) => {
			if (e.name === name) {
				return { ...e, selected: true };
			}
			return { ...e, selected: false };
		});
	}
	onSelectCurrency(name: string) {
		this.currencies = this.currencies.map((e) => {
			if (e.name === name) {
				return { ...e, selected: true };
			}
			return { ...e, selected: false };
		});
	}
}
