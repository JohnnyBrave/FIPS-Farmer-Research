import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerSelectPage } from './farmer-select';
// import {DataTableModule} from 'angular-4-data-table/dist/index'

@NgModule({
  declarations: [
    FarmerSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerSelectPage),
    // DataTableModule
  ],
})
export class FarmerSelectPageModule {}
