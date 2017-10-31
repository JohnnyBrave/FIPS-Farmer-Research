import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerSelectPage } from './farmer-select';

@NgModule({
  declarations: [
    FarmerSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerSelectPage),
  ],
})
export class FarmerSelectPageModule {}
