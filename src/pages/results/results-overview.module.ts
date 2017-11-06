import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsOverviewPage } from './results-overview';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    ResultsOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsOverviewPage),
    SuperTabsModule
  ],
})
export class ResultsOverviewPageModule {}
