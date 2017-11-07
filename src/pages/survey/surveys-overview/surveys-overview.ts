import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-surveys-overview',
  templateUrl: 'surveys-overview.html',
})
export class SurveysOverviewPage {
  farmer: any;
  farmerCompleted: any = {};
  experiment: any;
  surveys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this.farmer = navParams.data.farmer ? navParams.data.farmer : demoFarmer
    this.experiment = navParams.data.experiment ? navParams.data.experiment : demoExperiment
    console.log('farmer', this.farmer)
    console.log('experiment', this.experiment)

    this.databasePrvdr.getCollection('Surveys').subscribe(
      x => console.log('x', x)
    )
    // subscribe to farmer completed, push array of values into json object (capturing date completed)
    this.databasePrvdr.getSubCollection('Farmers', this.farmer._key, 'Surveys').subscribe(
      c => {
        console.log('farmer completed',c)
        c.forEach(el => {
          let key=el['_key']
          this.farmerCompleted[key] = el['completed']
        })
        console.log('farmer completed',this.farmerCompleted)
    }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveysOverviewPage');
    this.surveys = this.databasePrvdr.getCollection('Surveys')
  }
  startSurvey(survey) {
    if (survey.hasOwnProperty('surveyPage')) {
      this.navCtrl.push(survey.surveyPage, {farmer:this.farmer, experiment:this.experiment,survey:survey})
    }
  }
  test() {
    console.log('farmercomplete', this.farmerCompleted)
  }

}

var demoFarmer = {
  "_key": "EZu8LTNcscrAN83kEZa3",
  "displayName": "Example Farmer 1",
  "firstName": "Example Farmer",
  "householdCode": "Code001",
  "lastName": "1"
}
var demoExperiment = {
  "_key": "ebTsqw4C5Wq9mn8xK1mT",
  "context": "Rains are unreliable and soils are highly variable, even within a farm. As such, the predominant crop maize often fails in Makueni County, particularly on the less fertile terraces. Legumes such as cowpea, green gram and pigeon pea are more tolerant than maize of both depleted soils and unreliable rains. However, when planted on extremely poor soils they will also provide little benefit. This may be because legumes will struggle to nodulate and fix nitrogen in the absence of phosphorus.        A seed treatment of soluble-phosphorus (GroPlus) exists that can boost productivity of legumes by 50 – 100% as learned through observations of paired plots of beans, cowpeas and green grams treated with the input. This is assumed to be because the phosphorus allows legumes to improve use of available nutrient resources in the soil or applied manure by improved root development and ability to absorb nutrients in the soil or through better nitrogen fixation.       However, effectiveness of GroPlus appears to vary between legumes and farms, which may be linked to fertility of soil and responsiveness of the particular legumes. To date, adoption of the GroPlus has been limited. Factors that may affect the adoption include biophysical factors and socio-economic factors.",
  "description": "Farmers planted beans, green grams and cowpeas with deep tillage on three benches of their farm (fertile, moderate, infertile). Each crop had a 5 x 5 m plot with GroPlus compared to a 5 x 5 m plot without GroPlus. The aim is to help farmers consider how they can maximize production potential of legumes on parts of their farm with different fertility levels.",
  "surveys": {
    "8ft5LhC8t9Uo072m34px": true,
    "3blD3GGrIzuuPjD47a08": true,
    "R2OZwvCulWBsnsRLiiYM": false
  },
  "title": "Legumes with and without GroPlus on benches of different fertilities"
}
