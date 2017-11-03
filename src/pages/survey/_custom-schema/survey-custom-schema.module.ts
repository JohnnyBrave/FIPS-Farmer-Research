import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyCustomSchemaPage } from './survey-custom-schema';
import {ComponentsModule} from '../../../components/components.module'

@NgModule({
  declarations: [
    SurveyCustomSchemaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SurveyCustomSchemaPage),
  ],
})
export class SurveyCustomSchemaPageModule {}
