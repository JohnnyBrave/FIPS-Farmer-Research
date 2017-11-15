import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, LoadingController, Slides } from 'ionic-angular';
import { DatabaseProvider, NotificationsProvider } from '../../../../providers/providers'
import surveyMeta from './surveyMeta'

@IonicPage()
@Component({
  selector: 'page-survey-grow-plus1',
  templateUrl: 'survey-grow-plus1.html',
})

export class SurveyGrowPlus1Page {
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
  editKey: string;
  @ViewChild('surveySlides') surveySlides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public databasePrvdr: DatabaseProvider,
    public notificationsPrvdr: NotificationsProvider,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef

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
      "Have you used GrowPlus before?": [this.responses.usedBefore, Validators.required],
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
      "Bought": ['', Validators.required]
    })

  }
  ionViewDidEnter() {
    if (this.navParams.data.existing) {
      this.editKey = this.navParams.data.existing._farmerKey
      console.log('editing submission', this.editKey)
      this.preloadData(this.navParams.data.existing)
    }
  }

  preloadData(data) {
    // use this.formgroup.setValue to update all form fields. Useful if in editing mode
    for (let part in this.formGroups) {
      if (this.formGroups.hasOwnProperty(part)) {
        let group = this.formGroups[part]
        let values = group.value
        let update = values
        for (let key in values) {
          if (data.hasOwnProperty(key)) {
            update[key] = data[key]
          }
        }
        this.formGroups[part].setValue(update)
      }
      // update detection reference for dev error (changed after checked)
      this.cdr.detectChanges()
    }
    // extra method for crops selected
   
    console.log('formgroups', this.formGroups)
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
    let baseQuestions = {
      "Germination and early growth": '',
      "Vegetative growth": '',
      "Vegetative harvest cowpeas": '',
      "Flowering time": '',
      "Podding cobbing time": '',
      "Harvest": '',
    }
    for (let crop of this.responses.cropsSelected) {
      subGroup[crop] = this.fb.group(baseQuestions)
    }
    // get saved values
    let saved={}
    if(this.editKey){saved = this.formGroups.part3.value}
    // init base (always)
    this.formGroups.part3 = this.fb.group({
      "Differences observed": this.fb.group(subGroup)
    })
    // set saved values, iterate over json in case new crops added
    let update ={}
    console.log('saved',saved)
    console.log('formgroup',this.formGroups.part3)
    for(let crop in this.formGroups.part3.value["Differences observed"]){
      update[crop]=this.formGroups.part3.value["Differences observed"][crop]
      if(saved["Differences observed"][crop]){update[crop]=saved["Differences observed"][crop]}
    }
    console.log('update',update)
    this.formGroups.part3.setValue({"Differences observed":update})
    
    // add binding so template wont render before creation
    this.formGenerated.crops = true;
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
          experiment: "ebTsqw4C5Wq9mn8xK1mT",
          farmerKey: this.farmer._key
        }
      }
    ])
  }
  goHome() {
    this.navCtrl.popToRoot()
  }

  _setOptions() {
    // set predefined options for select box questions
    this.questionMeta = surveyMeta

  }
  showQuestion(difference, crop) {
    // used to hide questions for specific crops
    if (!difference.condition) { return true }
    else {
      if (difference.condition.crop == crop) { return true }
      else { return false }
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