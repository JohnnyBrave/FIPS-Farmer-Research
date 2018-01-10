import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import {SurveyBuilderProvider} from '../../../../providers/providers'
import surveyQuestions from './survey-meta'


@IonicPage()
@Component({
  selector: 'page-survey-grow-plus-context',
  templateUrl: 'survey-grow-plus-context.html',
})
export class SurveyGrowPlusContextPage {
  formGroup:any;
  surveyQuestions:any=[];
  @ViewChild('surveySlides') surveySlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sbp:SurveyBuilderProvider, private events:Events) {
    this.sbp.generateQuestionForm(surveyQuestions)
    this.formGroup=this.sbp.formGroup
    this.surveyQuestions=surveyQuestions
    console.log('surveyQuestions',this.surveyQuestions)
    this._addListeners()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyGrowPlusContextPage');
  }
  nextSlide() {
    this.surveySlides.slideNext();
  }
  _addListeners(){
    this.events.subscribe('slides:next',()=>this.nextSlide())
  }
  saveDraft(){
    // when slides changed function called to save a draft
    // only applicable if prior submission not submitted to prevent overwrite
    // if(!this.editKey){
    //   let submission = Object.assign({}, this.formGroups.meta.value, this.formGroups.part1.value, this.formGroups.part2.value, this.formGroups.part3.value, this.formGroups.part4.value);    
    //   this.databasePrvdr.saveSurveyDraft(this.farmer._key,this.survey._key,submission)
    // }
  }

}
