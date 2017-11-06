import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperimentResultsPage } from './experiment-results';

@NgModule({
  declarations: [
    ExperimentResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperimentResultsPage),
  ],
})
export class ExperimentResultsPageModule {}
