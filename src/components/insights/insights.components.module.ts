import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { CollatedResultsTableComponent } from './collated-results-table/collated-results-table';

@NgModule({
	declarations: [
		CollatedResultsTableComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		CollatedResultsTableComponent,
	]
})
export class InsightsComponentsModule { }
