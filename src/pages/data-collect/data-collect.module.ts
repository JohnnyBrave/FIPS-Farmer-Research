import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataCollectPage } from './data-collect';

@NgModule({
  declarations: [
    DataCollectPage,
  ],
  imports: [
    IonicPageModule.forChild(DataCollectPage),
  ],
})
export class DataCollectPageModule {}
