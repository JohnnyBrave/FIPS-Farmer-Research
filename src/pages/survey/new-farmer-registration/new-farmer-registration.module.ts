import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFarmerRegistrationPage } from './new-farmer-registration';

@NgModule({
  declarations: [
    NewFarmerRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFarmerRegistrationPage),
  ],
})
export class NewFarmerRegistrationPageModule {}
