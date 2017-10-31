import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { User } from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-data-collect',
  templateUrl: 'data-collect.html',
})
export class DataCollectPage {
  @ViewChild('surveySlider') surveySlider: Slides;
  surveys: any;
  user:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private userPrvdr:User) {
    this.surveys = demoSurveys
    //   this.slides.paginationBulletRender = (index, defaultClass) => {
    //     console.log('bullet render',index, defaultClass)
    //     return '<span class="' + defaultClass + '"></span>';
    //  }
  };
  ionViewCanEnter(): boolean{
    console.log('user?',this.userPrvdr.user)
    // here we can either return true or false
    // depending on if we want to leave this view
    if(this.userPrvdr.user){
      this.user=this.userPrvdr.user
       return true;
     } else {
       console.log('denied')
       this.navCtrl.push('LoginPage')
       return false;
     }    
  }

  ngAfterViewInit() {
    // this.slides.freeMode = true;
    // this.surveySlider.pager = true;
    // this.surveySlider.paginationBulletRender = (index, className) => {
    //   console.log('index',index)
    //   // return `<span class="custom-pagination ${className}>${index + 1}</\span>`;
    // };
  }
  openSurvey(survey){
    console.log('opening survey',survey)
    this.navCtrl.push('SurveyPage',survey,{})
  }


  bulletRender(i, css) {
    console.log('bullet render', i, css)
  }

  goBack() {
    this.navCtrl.pop()
  }

}

var demoSurveys = [
  {
    title: 'My Farm',
    description: 'example survey description',
    image: 'assets/images/survey1.png',
    questions:[
      {
        text:'How many acres do you have?',
        var:'acres',
        hint:'if unsure leave blank',
        input:'number',
        required:true,
        criteria:false,
        validation:{type:'number',criteria:'>0'}
      },
      {
        text:'what challenges do you currently face',
        var:'challenges',
        hint:'if unsure leave blank',
        input:'text',
        required:false,
        criteria:{type:'exists',var:'acres'},
      }
    ]
  },
  {
    title: 'Survey 2',
    description: 'example survey description 2',
    image: 'assets/images/survey2.png'
  },
  {
    title: 'Survey 3',
    description: 'example survey description 4',
    image: 'assets/images/survey3.png'
  }
]
