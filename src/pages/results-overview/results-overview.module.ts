import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsOverviewPage } from './results-overview';

@NgModule({
  declarations: [
    ResultsOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsOverviewPage),
  ],
})
export class ResultsOverviewPageModule {}
