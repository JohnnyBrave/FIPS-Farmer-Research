import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { UserProvider, DatabaseProvider } from '../../providers/providers'
// dev mocks
// import experiments from '../../mocks/datasets/experiments'

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
  current=[];
  available=[];
  enrolled={}


  constructor(public navCtrl: NavController, public navParams: NavParams, private userPrvdr: UserProvider, private databasePrvdr:DatabaseProvider) {
    this.farmer = navParams.data
    // dev
    // this.experiments = experiments
    // console.log('experiments',experiments)
    if (!this.farmer.displayName) { this.farmer = demoFarmer }
    console.log('farmer',this.farmer)
   
  };
  ionViewDidLoad(){
    // get static list of experiments at time of entering (observer assumed not necessary)
    this.experiments=this.databasePrvdr.experiments
    console.log('experiments',this.experiments)
    // subscribe to updates to farmer experiments
    this.databasePrvdr.getFarmerExperiments(this.farmer._key)
    .subscribe(
      x=>{
        console.log('farmer experiments',x)
        x.forEach((element:any,index) => {
          this.enrolled[element._key]=true     
        });
        console.log('enrolled',this.enrolled)
      }
    )
  }
  showExperimentDetail(experiment){
    this.navCtrl.push('ExperimentDetailPage',experiment)
  }
  collectData(experiment){
    console.log('collecting data',experiment)
    this.navCtrl.push('SurveysOverviewPage',{farmer:this.farmer, experiment:experiment})
  }
  viewResults(experiment){
    console.log('viewing results')
    this.navCtrl.push('ResultsOverviewPage',{
      farmerKey:this.farmer._key,
      experiment:experiment
    })

  }
  _filterExperiments(experiments){
    console.log('experiments',experiments)
    //iterate experiment list pushing farmer enrolled to current and others to available
    let current=[]
    let available=[]
    experiments.forEach(x => {
      // if(this.farmer._experiments[x._key]){
      //   current.push(x)
      // }
      // else(available.push(x))
    }); 
    this.current=current;
    this.available=available
  }
  // uncomment for production
  ionViewCanEnter(): boolean {
    if (this.userPrvdr.user) {
      this.user = this.userPrvdr.user
      return true;
    } else {
      console.log('access denied')
      this.navCtrl.push('LoginPage')
      return false;
    }
  }


  openExperiment(experiment) {
    console.log('opening experiment', experiment)
    this.navCtrl.push('experimentPage', experiment, {})
  }
  changeFarmer(){
    this.navCtrl.push('FarmerSelectPage')
  }
  enrolFarmer(experiment){
    // enrol farmer in experiment by binding both farmer key to experiment and experiment key to farmer
    console.log('enrolling',this.farmer,experiment)
    this.databasePrvdr.enrolFarmerInExperiment(this.farmer._key,experiment._key)
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

var demoFarmer = 
{
  "_key": "EZu8LTNcscrAN83kEZa3",
  "displayName": "Example Farmer 1",
  "firstName": "Example Farmer",
  "householdCode": "Code001",
  "lastName": "1"
}
