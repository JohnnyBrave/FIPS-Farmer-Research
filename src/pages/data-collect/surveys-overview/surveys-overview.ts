import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider} from '../../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-surveys-overview',
  templateUrl: 'surveys-overview.html',
})
export class SurveysOverviewPage {
  farmer:any;
  experiment:any;
  surveys:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr:DatabaseProvider) {
    console.log('params',navParams.data)
    this.farmer=demoFarmer;
    this.experiment=demoExperiment;
    
    this.databasePrvdr.getCollection('Surveys').subscribe(
      x=>console.log('x',x)
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveysOverviewPage');
    this.surveys=this.databasePrvdr.getCollection('Surveys')
  }
  startSurvey(survey){
    if(survey.hasOwnProperty('surveyPage')){
      this.navCtrl.push(survey.surveyPage)
    }
  }

}

var demoFarmer={
    "_key": "EZu8LTNcscrAN83kEZa3",
    "displayName": "Example Farmer 1",
    "firstName": "Example Farmer",
    "householdCode": "Code001",
    "lastName": "1"
}
var demoExperiment={
  "_key": "ebTsqw4C5Wq9mn8xK1mT",
  "context": "Rains are unreliable and soils are highly variable, even within a farm. As such, the predominant crop maize often fails in Makueni County, particularly on the less fertile terraces. Legumes such as cowpea, green gram and pigeon pea are more tolerant than maize of both depleted soils and unreliable rains. However, when planted on extremely poor soils they will also provide little benefit. This may be because legumes will struggle to nodulate and fix nitrogen in the absence of phosphorus.        A seed treatment of soluble-phosphorus (GroPlus) exists that can boost productivity of legumes by 50 – 100% as learned through observations of paired plots of beans, cowpeas and green grams treated with the input. This is assumed to be because the phosphorus allows legumes to improve use of available nutrient resources in the soil or applied manure by improved root development and ability to absorb nutrients in the soil or through better nitrogen fixation.       However, effectiveness of GroPlus appears to vary between legumes and farms, which may be linked to fertility of soil and responsiveness of the particular legumes. To date, adoption of the GroPlus has been limited. Factors that may affect the adoption include biophysical factors and socio-economic factors.",
  "description": "Farmers planted beans, green grams and cowpeas with deep tillage on three benches of their farm (fertile, moderate, infertile). Each crop had a 5 x 5 m plot with GroPlus compared to a 5 x 5 m plot without GroPlus. The aim is to help farmers consider how they can maximize production potential of legumes on parts of their farm with different fertility levels.",
  "title": "Legumes with and without GroPlus on benches of different fertilities"
}
