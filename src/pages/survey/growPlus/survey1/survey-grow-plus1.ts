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
  formgroup: FormGroup


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public events: Events,
    public loadingCtrl: LoadingController,
    public databasePrvdr:DatabaseProvider,
    public notificationsPrvdr:NotificationsProvider
  ) {
    this.formgroup = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: '',
      householdCode: ['', Validators.required],
    });

  }

  preloadData(){
    // use this.formgroup.setValue to update all form fields. Useful if in editing mode
  }

  register(){
    this.formgroup.patchValue({
      displayName:this.formgroup.value.firstName + " " + this.formgroup.value.lastName
    })
    // let loading = this.loadingCtrl.create({
    //   content: 'Registering farmer...'
    // });
    // loading.present().then(_ => {
      this.databasePrvdr.addFarmer(this.formgroup.value)
      // .then(_=>{
      //   loading.dismiss();
      //   this.notificationsPrvdr.showToast('Farmer added successfully')
      //   this.navCtrl.pop();
      // })
      // .catch(err=>{
      //   console.log('err',err)
      //   loading.dismiss();
      // })
      this.navCtrl.pop()
    // })
  }

}
