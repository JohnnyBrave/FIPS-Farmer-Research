import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ToastController} from 'ionic-angular'
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public toastCtrl:ToastController) {
    console.log('Hello NotificationsProvider Provider');
  }

  showToast(message, position?){
    if(!position){position='top'}
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });
    toast.present()
  }

}
