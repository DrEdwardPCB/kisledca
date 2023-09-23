import { Component } from '@angular/core';
import { Book, BookServiceService } from '../book-service.service';

@Component({
	selector: 'app-booklist',
	templateUrl: './booklist.component.html',
	styleUrls: ['./booklist.component.css'],
})
export class BooklistComponent {
	constructor(private bookService: BookServiceService) {}
	booklist: Book[] = [];
	individualBook: Book | null = null;

	requestList() {
		this.bookService.listBooks().subscribe((data) => {
			this.booklist = data;
			console.log(data);
		});
	}

	requestIndividual(id: string) {
		this.bookService.showBooks(id).subscribe((data) => {
			this.individualBook = data;
		});
	}
	clearAll() {
		this.booklist = [];
		this.individualBook = null;
	}
}
