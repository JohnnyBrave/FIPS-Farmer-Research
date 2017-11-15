import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider, DatabaseProvider } from '../../../providers/providers';
// import { DataTableResource } from 'angular-4-data-table';
// dev
// import farmers from '../../../mocks/datasets/farmers'

@IonicPage()
@Component({
  selector: 'page-farmer-select',
  templateUrl: 'farmer-select.html',
})
export class FarmerSelectPage {
  user: any = { displayName: '' };
  allFarmers: any;
  filteredFarmers: any;
  // farmersTable = new DataTableResource(this.farmers);
  items = [];
  itemCount = 0;
  sortField: string = "householdCode";
  searchText: string;

  constructor(public navCtrl: NavController, public userPrvdr: UserProvider, public events: Events, public databasePrvdr: DatabaseProvider) {
    this.user = this.userPrvdr.user ? this.userPrvdr.user : { displayName: '' }
    this.events.subscribe('user:signedIn', user => this.user = user)
  }

  ionViewDidLoad() {
    // subscribe to farmers collection doc as observable
    // note, no need to subscribe as automatically handled by ngFor async pipe
    this.databasePrvdr.getFarmers()
      .subscribe(f => {
        this.allFarmers = f;
        this.filteredFarmers = f;
      })
  }

  // uncomment for production
  ionViewCanEnter(): boolean {
    if (this.userPrvdr.user) {
      this.user = this.userPrvdr.user
      return true;
    } else {
      console.log('access denied')
      return false;
    }
  }

  selectFarmer(farmer) {
    console.log('farmer selected', farmer)
    this.navCtrl.push('DataCollectPage', farmer)
  }
  addFarmer() {
    console.log('adding farmer')
    this.navCtrl.push('NewFarmerRegistrationPage')
  }
  sort(field) {
    this.sortField = field
  }

  reloadItems(e) {
    // needed for datatable, see demos
  }

  searchInput(e) {
    let searchText = this.searchText
    if (searchText.length > 2) {
      this._filterFarmers(searchText)
    }
    else { this.filteredFarmers = this.allFarmers }
  }
  _filterFarmers(text) {
    let searchText=text.toLowerCase()
    let filtered = this.allFarmers.filter(f => {
      if (f.displayName && f.displayName.toLowerCase().indexOf(searchText) > -1) {return true}
      else if (f.householdCode && f.householdCode.toLowerCase().indexOf(searchText) > -1) {return true}
      else if (f.network && f.network.toLowerCase().indexOf(searchText) > -1) {return true}
      else {return false}
    })
    this.filteredFarmers = filtered
  }
  searchCancel(e) {
    console.log('search cancel', e)
  }

}
