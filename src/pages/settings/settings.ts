import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider, NotificationsProvider } from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any;
  oldPassword:string;
  newPassword:string;
  newPassword2:string;
  showPasswordForm:boolean=false;
  errMsg:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userPrvdr: UserProvider,
    public events: Events,
    public notificationsPrvder:NotificationsProvider
  ) {
    this.user = this.userPrvdr.user
    console.log('user', this.user)
    this.events.subscribe('user:signedIn', user => this.user = user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  signOut() {
    console.log('signing out')
    this.userPrvdr.logout()
      .then(_ => this.user = null)
  }
  signIn(){
    this.navCtrl.push('LoginPage')
  }
  toggleChangePassword(){
    this.showPasswordForm=!this.showPasswordForm
  }
  changePassword(){
    this.showPasswordForm=false
    console.log('changing password')
    if(this.oldPassword && this.newPassword && this.newPassword2){
      if(this.newPassword==this.newPassword2){
        this.userPrvdr.changePassword(this.oldPassword,this.newPassword)
        .then(res=>{
          console.log('res',res)
          this.notificationsPrvder.showToast('password changed','bottom')
        })
        .catch(err=>{console.log('error',err);this.errMsg=err.message})
      }
      else{this.errMsg="Passwords don't match"}
      
    }
    else{this.errMsg="Please enter both old and new passwords"}
    
  }

}
