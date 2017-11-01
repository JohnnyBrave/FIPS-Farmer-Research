import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { Api } from '../api/api';
// auth
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Injectable()
export class UserProvider {
  user: any;

  constructor(public api: Api, public events: Events, private afAuth: AngularFireAuth) {
    console.log('user provider loaded')
    this._registerLoginListener()

  }

  login(form) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(form.email, form.password)
        .then(user => {
          this.user = user;
          resolve(user)
        })
        .catch(err => reject(err))
    })
  }
  register(form) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password)
        .then(user => {
          let displayName: string = form.firstName + " " + form.lastName
          this.user = user
          //this.user.displayName = displayName
          let profile = this.afAuth.auth.currentUser
          profile.updateProfile({
            displayName: displayName,
            photoURL: null
          })
            .then(res => {
              resolve(this.user)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  changePassword(oldPass, newPass) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPass
      );
      user.reauthenticateWithCredential(credential)
        .then(_ => {
          user.updatePassword(newPass)
            .then(res => {
              console.log('res', res)
              resolve('success')
            })
        })
        .catch(err => reject(err))
    })
  }


  logout() {
    this.user = null;
    return firebase.auth().signOut()
  }

  _registerLoginListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('user signed in', user)
        this.user = user
        this.events.publish('user:signedIn', user)
      }
      else {
        console.log('no user signed in')
        // User is signed out.
      }
    });
  }
}
