import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkResultsPage } from './network-results';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    NetworkResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkResultsPage),
    ChartModule
  ],
})
export class NetworkResultsPageModule {}
