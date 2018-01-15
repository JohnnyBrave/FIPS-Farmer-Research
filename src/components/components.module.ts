import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey/survey';



@NgModule({
	declarations: [SurveyComponent,
    ,
		
	],
	imports: [
		IonicModule,
	],
	exports: [SurveyComponent,
    
	]
})
export class ComponentsModule { }
