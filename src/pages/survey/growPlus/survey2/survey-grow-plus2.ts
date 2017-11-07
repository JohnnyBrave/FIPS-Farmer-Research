import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, LoadingController, Slides } from 'ionic-angular';
import { DatabaseProvider, NotificationsProvider } from '../../../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-survey-grow-plus2',
  templateUrl: 'survey-grow-plus2.html',
})
export class SurveyGrowPlus2Page {
  formGroups: any = {
    part1: null,
    part2: null
  }
  responses: any = { usedBefore: null, cropsSelected: [] }
  formGenerated: any = {}
  surveyValid: boolean = true;
  questionMeta: any = {};
  farmer: any;
  survey: any;
  submitted: boolean;
  @ViewChild('surveySlides') surveySlides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public databasePrvdr: DatabaseProvider,
    public notificationsPrvdr: NotificationsProvider,
    private fb: FormBuilder
  ) {
    this.farmer = navParams.data.farmer ? navParams.data.farmer : demoFarmer
    this.survey = navParams.data.survey ? navParams.data.survey : demoSurvey
    console.log('farmer', this.farmer, 'survey', this.survey)
    this._setOptions()
    this.formGroups.meta = this.fb.group({
      "_farmerKey": this.farmer._key,
      "_submissionDate": new Date()
    })
    this.formGroups.part1 = this.fb.group({
      "How easy to use": ['', Validators.required],
    });
    // fg2 dependent on yes answered to fg1
    this.formGroups.part2 = this.fb.group({
      "Used with": ['', Validators.required],
    });
    this.formGroups.part3 = this.fb.group({
      // part 3 generated dynamically
      "Differences observed": '',
    });
    
    this.formGroups.part4 = this.fb.group({
      "Bought":['',Validators.required]
    })
  }

  preloadData() {
    // use this.formgroup.setValue to update all form fields. Useful if in editing mode
  }
  continue(form) {
    console.log('form', this.formGroups[form].value)
  }
  nextSlide() {
    this.surveySlides.slideNext();
  }
  setCrops() {
    console.log('setting crops', this.responses.cropsSelected)
    // dynamically build formgroups for repeat group
    let subGroup = {}
    for (let crop of this.responses.cropsSelected) {
      subGroup[crop] = this.fb.group({
        "Germination and early growth": '',
        "Vegetative growth": '',
        "Vegetative harvest cowpeas": '',
        "Flowering time": '',
        "Podding cobbing time": '',
        "Harvest": '',
      })
    }
    this.formGroups.part3 = this.fb.group({
      "Differences observed": this.fb.group(subGroup)
      })
    // add binding so template wont render before creation
    this.formGenerated.crops = true;
    console.log('part 3', this.formGroups.part3)
    this.surveySlides.slideNext()
  }
  submit() {
    let submission = Object.assign({}, this.formGroups.meta.value, this.formGroups.part1.value, this.formGroups.part2.value, this.formGroups.part3.value, this.formGroups.part4.value);
    console.log('submission', submission)
    this.databasePrvdr.submitSurvey(this.farmer._key, this.survey._key, submission)
    this.submitted = true
  }
  viewResults() {
    this.navCtrl.setPages([
      { page: 'WelcomePage' },
      {
        page: 'ResultsOverviewPage', params: {
          survey: this.survey,
          farmer: this.farmer
        }
      }
    ])
  }
  goHome() {
    this.navCtrl.popToRoot()
  }

  _setOptions() {
    // set predefined options for select box questions
    this.questionMeta["How easy to use"] = {
      options: [
        { value: 'easy', label: 'Easy' },
        { value: 'neitherEasyNorDifficult', label: 'Neither easy nor difficult' },
        { value: 'difficult', label: 'Difficult' },
      ]
    }
    this.questionMeta["Differences observed"] = {
      options: [
        {
          value: 'Germination and early growth', label: 'Germination and early growth (in first 2 weeks)', subOptions: [
            { value: 'faster', label: 'faster' },
            { value: 'no difference', label: 'no difference' },
            { value: 'slower', label: 'slower' },
            { value: 'did not check', label: 'did not check' },
          ]
        },
        {
          value: 'Vegetative growth', label: 'Vegetative growth', subOptions: [
            { value: 'faster', label: 'faster' },
            { value: 'slower', label: 'slower' },
          ]
        },
        {
          value: 'Vegetative harvest cowpeas', label: 'Vegetative harvest (if cowpeas)', subOptions: [
            { value: 'more leaves', label: 'more leaves' },
            { value: 'fewer leaves', label: 'fewer leaves' },
          ]
        },
        {
          value: 'Flowering time', label: 'Flowering time', subOptions: [
            { value: 'earlier', label: 'earlier' },
            { value: 'later', label: 'later' },
          ]
        },
        {
          value: 'Podding cobbing time', label: 'Podding/ cobbing time', subOptions: [
            { value: 'earlier', label: 'earlier' },
            { value: 'later', label: 'later' },
          ]
        },
        {
          value: 'Harvest', label: 'Harvest', subOptions: [
            { value: 'higher', label: 'higher' },
            { value: 'lower', label: 'lower' },
          ]
        },
      ]
    }
  }


}

var demoFarmer = {
  "_key": "EZu8LTNcscrAN83kEZa3",
  "displayName": "Example Farmer 1",
  "firstName": "Example Farmer",
  "householdCode": "Code001",
  "lastName": "1"
}

var demoSurvey = {
  "_key": "8ft5LhC8t9Uo072m34px",
  "description": "survey description",
  "estimatedTime": "2017-11-03T06:30:00.000Z",
  "surveyPage": "SurveyGrowPlus1Page",
  "title": "Grow Plus Survey (part 1)"
}