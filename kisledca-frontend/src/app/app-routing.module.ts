import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { BooklistComponent } from './book/booklist/booklist.component';

const routes: Routes = [
	{ path: 'calculator', component: CalculatorComponent },
	{ path: 'book', component: BooklistComponent },

	{ path: '', redirectTo: '/calculator', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
