import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { UserProvider } from '../../providers/providers'
// dev mocks
import experiments from '../../mocks/datasets/experiments'

@IonicPage()
@Component({
  selector: 'page-data-collect',
  templateUrl: 'data-collect.html',
})
export class DataCollectPage {
  @ViewChild('experimentSlider') experimentSlider: Slides;
  experiments: any;
  user: any;
  farmer: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private userPrvdr: UserProvider) {
    this.experiments = experiments
    console.log('experiments',experiments)
    this.farmer = navParams.data
    // dev
    if (!this.farmer.displayName) { this.farmer = demoFarmer }
    console.log('farmer',this.farmer)
   
  };
  // uncomment for production
  // ionViewCanEnter(): boolean {
  //   console.log('user?', this.userPrvdr.user)
  //   if (this.userPrvdr.user) {
  //     this.user = this.userPrvdr.user
  //     return true;
  //   } else {
  //     console.log('denied')
  //     this.navCtrl.push('LoginPage')
  //     return false;
  //   }
  // }


  openExperiment(experiment) {
    console.log('opening experiment', experiment)
    this.navCtrl.push('experimentPage', experiment, {})
  }
  changeFarmer(){
    this.navCtrl.push('FarmerSelectPage')
  }


  bulletRender(i, css) {
    console.log('bullet render', i, css)
  }

  goBack() {
    this.navCtrl.pop()
  }
  // from slides interface

   //   this.slides.paginationBulletRender = (index, defaultClass) => {
    //     console.log('bullet render',index, defaultClass)
    //     return '<span class="' + defaultClass + '"></span>';
    //  }

      // ngAfterViewInit() {
  //   // this.slides.freeMode = true;
  //   // this.experimentSlider.pager = true;
  //   // this.experimentSlider.paginationBulletRender = (index, className) => {
  //   //   console.log('index',index)
  //   //   // return `<span class="custom-pagination ${className}>${index + 1}</\span>`;
  //   // };
  // }

}

var demoFarmer = { "displayName": "Aaron 2Moore", "email": "Heath44@hotmail.com", "jobTitle": "Regional Configuration Producer", "active": true, "phoneNumber": "611-898-6201", "date": "2015-11-06T07:21:25.510Z" }
