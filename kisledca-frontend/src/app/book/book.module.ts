import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist/booklist.component';
import { HttpClientModule } from '@angular/common/http';
import { BookServiceService } from './book-service.service';

@NgModule({
	declarations: [BooklistComponent],
	imports: [HttpClientModule, CommonModule],
	providers: [BookServiceService],
})
export class BookModule {}
