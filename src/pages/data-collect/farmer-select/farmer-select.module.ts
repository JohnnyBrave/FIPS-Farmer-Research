import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerSelectPage } from './farmer-select';
// import {DataTableModule} from 'angular-4-data-table/dist/index'
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    FarmerSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerSelectPage),
    OrderModule
    // DataTableModule
  ],
})
export class FarmerSelectPageModule {}
