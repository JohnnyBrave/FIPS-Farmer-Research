import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
// 
import { SurveyIntroComponent } from './intro/survey-intro';
import { SurveyCompleteComponent } from './complete/survey-complete';

import { SurveyQuestionComponent } from './question/survey-question';
import { SurveyRepeatQuestionComponent } from './question/repeat-question/survey-repeat-question';
import { CustomSelectPictureComponent } from './question/select-picture/custom-select-picture';


@NgModule({
	declarations: [
		SurveyQuestionComponent,
		SurveyIntroComponent,
		SurveyCompleteComponent,
		SurveyRepeatQuestionComponent,
		CustomSelectPictureComponent
	],
	imports: [
		IonicModule,
	],
	exports: [
		SurveyQuestionComponent,
		SurveyIntroComponent,
		SurveyCompleteComponent,
		SurveyRepeatQuestionComponent,
		CustomSelectPictureComponent
	]
})
export class SurveyComponentsModule { }
