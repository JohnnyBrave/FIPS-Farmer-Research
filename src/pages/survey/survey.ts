import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuestionProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  survey:any;
  questions:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, questionPrvdr:QuestionProvider) {
    // this.survey=navParams.data
    console.log('survey',this.survey)
    this.questions=questionPrvdr.getQuestions()
    console.log('questions',this.questions)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

}
