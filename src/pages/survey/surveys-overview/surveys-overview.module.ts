import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveysOverviewPage } from './surveys-overview';


@NgModule({
  declarations: [
    SurveysOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveysOverviewPage),
    
  ],
})
export class SurveysOverviewPageModule {}
