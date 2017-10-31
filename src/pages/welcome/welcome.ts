import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { User } from '../../providers/user/user'

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  user:any={displayName:''}

  constructor(public navCtrl: NavController, public userPrdr:User, public events:Events) { 
    this.events.subscribe('user:signedIn',user=>this.user=user)
  }
 
  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  collectData(){
    /* tries to push collect data page, currently nav guard returns response
    only if rejected so no need for catch (assume api might change in futuer)*/
    this.navCtrl.push('FarmerSelectPage')
    .then(res=>{
      if(res==false){this.navCtrl.push('LoginPage')}
    })
    .catch(()=> {})
  }
  viewResults(){
    this.navCtrl.push('ResultsOverviewPage')
  }
  openSettings(){
    this.navCtrl.push('SettingsPage')
  }

}
