import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SurveyQuestionComponent } from './survey/question/survey-question';
import { SurveyFormComponent } from './survey/form/survey-form';

@NgModule({
	declarations: [
		SurveyQuestionComponent,
		SurveyFormComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		SurveyQuestionComponent,
		SurveyFormComponent,
	]
})
export class ComponentsModule {}
