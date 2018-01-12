import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
// 
import { SurveyQuestionComponent } from './question/survey-question';
import { SurveyIntroComponent } from './intro/survey-intro';
import { SurveyRepeatQuestionComponent } from './repeat-question/survey-repeat-question';

@NgModule({
	declarations: [
		SurveyQuestionComponent,
		SurveyIntroComponent,
		SurveyRepeatQuestionComponent
	],
	imports: [
		IonicModule,
	],
	exports: [
		SurveyQuestionComponent,
		SurveyIntroComponent,
		SurveyRepeatQuestionComponent
	]
})
export class SurveyComponentsModule { }
