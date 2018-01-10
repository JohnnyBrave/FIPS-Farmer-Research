import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
// 
import { SurveyQuestionComponent } from './question/survey-question';
import { SurveyIntroComponent } from './intro/survey-intro';

@NgModule({
	declarations: [
		SurveyQuestionComponent,
		SurveyIntroComponent
	],
	imports: [
		IonicModule,
	],
	exports: [
		SurveyQuestionComponent,
		SurveyIntroComponent
	]
})
export class SurveyComponentsModule { }
