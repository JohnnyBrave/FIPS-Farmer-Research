import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { DatabaseProvider, NotificationsProvider } from '../../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-new-farmer-registration',
  templateUrl: 'new-farmer-registration.html',
})



export class NewFarmerRegistrationPage {
  formgroup: FormGroup;
  editKey:string=null
  responses:any={network:null};
  networks:any=[]


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public events: Events,
    public loadingCtrl: LoadingController,
    public databasePrvdr: DatabaseProvider,
    public notificationsPrvdr: NotificationsProvider,
  ) {
    this.formgroup = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: '',
      householdCode: ['', Validators.required],
      network: ['', Validators.required]
    });

  }
  ionViewDidLoad() {
    this._loadNetworks();
    if (this.navParams.data.existing) {
      this.editKey=this.navParams.data.existing._key
      this.preloadData(this.navParams.data.existing)
    }
  }

  _loadNetworks(){
    // get list of network options from database
    // this.networks = this.databasePrvdr.getCollection('Networks')
    this.databasePrvdr.getCollection('Networks')
    .subscribe(n=>this.networks=n)
  }

  preloadData(data) {
    console.log('preloading data',data)
    // use this.formgroup.setValue to update all form fields. Useful if in editing mode
    for (let key in this.formgroup.value) {
      if (data.hasOwnProperty(key)) {
        let patch = {}
        patch[key] = data[key]
        this.formgroup.patchValue(patch)
      }
    }
  }

  register() {
    this.formgroup.patchValue({
      displayName: this.formgroup.value.firstName + " " + this.formgroup.value.lastName
    })
    if(this.editKey){this.databasePrvdr.addFarmer(this.formgroup.value,this.editKey)}
    else{this.databasePrvdr.addFarmer(this.formgroup.value)}
    
    this.navCtrl.pop()

    
    // let loading = this.loadingCtrl.create({
    //   content: 'Registering farmer...'
    // });
    // loading.present().then(_ => {
    
    // .then(_=>{
    //   loading.dismiss();
    //   this.notificationsPrvdr.showToast('Farmer added successfully')
    //   this.navCtrl.pop();
    // })
    // .catch(err=>{
    //   console.log('err',err)
    //   loading.dismiss();
    // })
    
    // })
  }

}
