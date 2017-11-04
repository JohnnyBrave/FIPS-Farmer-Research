import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { DatabaseProvider, NotificationsProvider } from '../../../../providers/providers'

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
  responses: any = { usedBefore: 'yes' }
  surveyValid: boolean = true;
  questionMeta: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public databasePrvdr: DatabaseProvider,
    public notificationsPrvdr: NotificationsProvider,
    private fb: FormBuilder
  ) {
    this._setOptions()
    this.formGroups.part1 = this.fb.group({
      "Have you used GrowPlus before?": [this.responses.usedBefore, Validators.required],
    });
    // fg2 dependent on yes answered to fg1
    this.formGroups.part2 = this.fb.group({
      "Used with": ['', Validators.required],
      "Differences observed": this.fb.group({
        "Germination and early growth":'',
        "Vegetative growth":'',
        "Vegetative harvest cowpeas":'',
        "Flowering time":'',
        "Podding cobbing time":'',
        "Harvest":'',
      }),
      "Bought": ['', Validators.required],
    });

  }

  preloadData() {
    // use this.formgroup.setValue to update all form fields. Useful if in editing mode
  }
  continue(form){
    console.log('form',this.formGroups[form].value)
  }

  _setOptions() {
    // set predefined options for select box questions
    this.questionMeta["Used with"] = {
      options: [
        { value: 'maize', label: 'Maize' },
        { value: 'beans', label: 'Beans' },
        { value: 'cowpeas', label: 'Cowpeas' },
        { value: 'greengrams', label: 'Greengrams' },
        { value: 'pigeon pea', label: 'Pigeon Pea' },
        { value: 'other legumes', label: 'Other Legumes' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'other non-legumes crops', label: 'Other Non-Legume Crops' },
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
          value: 'Vegetative harvest cowpeas', label: 'Vegetative harvest if cowpeas', subOptions: [
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
