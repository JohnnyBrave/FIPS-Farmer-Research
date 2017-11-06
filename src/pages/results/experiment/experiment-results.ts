import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/providers';
// import * as Chart from 'chart.js'
import { Chart } from 'angular-highcharts';



@IonicPage()
@Component({
  selector: 'page-experiment-results',
  templateUrl: 'experiment-results.html',
})
export class ExperimentResultsPage {
  insights: any
  canvas: any;
  ctx: any;
  farmers: any;
  surveys:any;
  focusFarmerText: string = "Loading Farmers...";
  focusFarmer: string = "_none";
  activeInsight: string = "_none";

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this._setInsights()
    this._getData()
  }

  _getData() {
    // get list survey farmers then get their meta
    // this.farmers = this.databasePrvdr.getSubCollection('Surveys', '3blD3GGrIzuuPjD47a08', "Farmers")
    // testing only
    this.databasePrvdr.getSubCollection('Surveys', '3blD3GGrIzuuPjD47a08', "Farmers")
      .subscribe(r => {
        this._getMeta(r)
      })
      this.surveys=this.databasePrvdr.getCollection('Surveys')
  }
  test() {
    console.log('farmers', this.farmers)
  }
  _getMeta(farmers) {
    // takes list of farmer object containing _key and completed field and returns farmer doc
    console.log('farmers', farmers)
    let keyArray = farmers.map(f => f._key)
    this.databasePrvdr.getMultipleDocs('Farmers', keyArray).then(res => {
      this.farmers = res
      this.focusFarmerText = "select a farmer"
    })
  }

  _setInsights() {
    this.insights = [
      {
        title: 'Perceived effect of GroPlus on crops',
        // chartData: networkGrowthTemplate
      }
    ]
  }
}
