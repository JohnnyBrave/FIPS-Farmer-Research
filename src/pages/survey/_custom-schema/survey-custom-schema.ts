import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuestionProvider} from '../../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-survey-custom-schema',
  templateUrl: 'survey-custom-schema.html',
})
export class SurveyCustomSchemaPage {
  survey:any;
  questions:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, questionPrvdr:QuestionProvider) {
    console.log('survey',this.survey)
    //this.questions=questionPrvdr.getQuestions()
    console.log('questions',this.questions)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

}
