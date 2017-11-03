import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperimentDetailPage } from './experiment-detail';

@NgModule({
  declarations: [
    ExperimentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperimentDetailPage),
  ],
})
export class ExperimentDetailPageModule {}
