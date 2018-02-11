import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyGrowPlus1Page } from './survey-grow-plus1';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {SurveyComponentsModule} from '../../../../components/survey/survey-components.module'

@NgModule({
  declarations: [
    SurveyGrowPlus1Page,
  ],
  imports: [
    IonicPageModule.forChild(SurveyGrowPlus1Page),
    IonicImageViewerModule,
    SurveyComponentsModule
  ],
})
export class SurveyGrowPlus1PageModule {}
