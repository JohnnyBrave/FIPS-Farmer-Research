import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(private afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  updateUserProfile(){
    let displayName="Chris Clarke"
    let profile = this.afAuth.auth.currentUser
    console.log('profile',profile)
    profile.updateProfile({
      displayName:displayName,
      photoURL:null
    })
    .then(res=>console.log('profile update',res))
    .catch(err=>console.log('profile update error',err))
  }

}
