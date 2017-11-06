import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperimentResultsPage } from './experiment-results';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    ExperimentResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperimentResultsPage),
    OrderModule
  ],
})
export class ExperimentResultsPageModule {}
