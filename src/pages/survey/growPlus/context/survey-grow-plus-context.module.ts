import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyGrowPlusContextPage } from './survey-grow-plus-context';
import {SurveyComponentsModule} from '../../../../components/survey/survey-components.module';

@NgModule({
  declarations: [
    SurveyGrowPlusContextPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyGrowPlusContextPage),
    SurveyComponentsModule
  ],
})
export class SurveyGrowPlusContextPageModule {}
