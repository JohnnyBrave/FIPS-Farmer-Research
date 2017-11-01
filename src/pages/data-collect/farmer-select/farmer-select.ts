import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { DataTableResource } from 'angular-4-data-table';
// dev
import farmers from '../../../mocks/datasets/farmers'

@IonicPage()
@Component({
  selector: 'page-farmer-select',
  templateUrl: 'farmer-select.html',
})
export class FarmerSelectPage {
  user: any={displayName:''};
  farmers: any;
  farmersTable = new DataTableResource(farmers);
  items = [];
  itemCount = 0;

  constructor(public navCtrl: NavController, public userPrvdr: UserProvider, public events: Events) {
    this.user=this.userPrvdr.user ? this.userPrvdr.user : {displayName:''}
    this.events.subscribe('user:signedIn', user => this.user=user)
    this.farmers = farmers
  }

  // uncomment for production

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

  selectFarmer(farmer){
    console.log('farmer selected',farmer)
    this.navCtrl.push('DataCollectPage',farmer)
  }

  reloadItems(e){
    // needed for datatable, see demos
  }

}
