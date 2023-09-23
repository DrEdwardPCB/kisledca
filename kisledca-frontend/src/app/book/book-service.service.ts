import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
	id: string;
	bookName: string;
	price: number;
	category: string;
	author: string;
}

@Injectable({
	providedIn: 'root',
})
export class BookServiceService {
	private serviceUrl = 'http://localhost:5156/api/books';
	constructor(private http: HttpClient) {}

	public listBooks(): Observable<Book[]> {
		return this.http.get(this.serviceUrl) as Observable<Book[]>;
	}
	public showBooks(id: string): Observable<Book> {
		return this.http.get(`${this.serviceUrl}/${id}`) as Observable<Book>;
	}
}
