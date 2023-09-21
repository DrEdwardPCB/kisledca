import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-category-selector',
	templateUrl: './category-selector.component.html',
	styleUrls: ['./category-selector.component.css'],
})
export class CategorySelectorComponent<T extends { name: string; value: string | number; selected: boolean }> {
	@Input() options!: T[];
	@Output() onSelect = new EventEmitter<string>();
	onClickCategory(name: string) {
		this.onSelect.emit(name);
	}
}
