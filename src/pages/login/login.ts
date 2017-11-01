import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Slides, NavController, ToastController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  showRegisterNew: Boolean
  showSignInExisting: Boolean
  errorMsg: string;
  form = { email: "", password: "", first: "", last: "" }
  @ViewChild(Slides) slides: Slides;
  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public userPrvdr: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  _showRegisterNew() {
    this.showRegisterNew = true
    this.showSignInExisting = false
    this.slides.slideNext()
  }
  _showSignInExisting() {
    this.showRegisterNew = false;
    this.showSignInExisting = true;
    this.slides.slideNext()
  }
  doRegisterNew() {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    })
    loading.present().then(_ => {
      this.userPrvdr.register(this.form)
        .then(user => {
          console.log('user created', user)
          loading.dismiss();
          this.navCtrl.pop()
        })
        .catch(err => {
          console.log('there was an error', err)
          this.errorMsg = err.message
          loading.dismiss()
        })
    })
  }


  // Attempt to login in through our User service
  doLogin() {
    console.log('logging in')
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    })
    loading.present().then(_ => {
      this.userPrvdr.login(this.form)
        .then(user => {
          console.log('signed in', user)
          loading.dismiss();
          this.navCtrl.pop()
        })
        .catch(err => {
          console.log('there was an error', err)
          this.errorMsg = err.message
          loading.dismiss()
        })
    })

  }
}
