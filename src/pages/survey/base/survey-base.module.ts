import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyBasePage } from './survey-base';
import { SurveyComponentsModule} from '../../../components/survey/survey-components.module'

@NgModule({
  declarations: [
    SurveyBasePage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyBasePage),
    SurveyComponentsModule
  ],
})
export class SurveyBasePageModule {}
