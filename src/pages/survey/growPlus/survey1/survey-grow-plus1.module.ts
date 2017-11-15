import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyGrowPlus1Page } from './survey-grow-plus1';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    SurveyGrowPlus1Page,
  ],
  imports: [
    IonicPageModule.forChild(SurveyGrowPlus1Page),
    IonicImageViewerModule
  ],
})
export class SurveyGrowPlus1PageModule {}
