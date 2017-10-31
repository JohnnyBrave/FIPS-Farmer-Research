import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../../providers/user/user'
// dev
import farmers from '../../../mocks/datasets/farmers'

@IonicPage()
@Component({
  selector: 'page-farmer-select',
  templateUrl: 'farmer-select.html',
})
export class FarmerSelectPage {
  user:any={displayName:''}

  constructor(public navCtrl: NavController, public userPrvdr:User, public events:Events) {
    this.events.subscribe('user:signedIn',user=>this.user=user)
  }

  // dev only
  ionViewDidEnter(){
    this.user=this.userPrvdr.user
  }

  // ionViewCanEnter(): boolean{
  //   console.log('user?',this.userPrvdr.user)
  //   if(this.userPrvdr.user){
  //     this.user=this.userPrvdr.user
  //      return true;
  //    } else {
  //      console.log('denied')
  //      return false;
  //    }    
  // }

}
