import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/providers';
// import * as Chart from 'chart.js'
import { Chart } from 'angular-highcharts';
import meta from '../../survey/growPlus/survey1/surveyMeta'



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
  results: any;
  surveys: any;
  focusFarmerText: string = "Loading Farmers...";
  focusFarmer: string = "_none";
  activeInsight: string = "_none";
  groPlusSurveyMeta: any = meta;
  collatedTemplate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this._setInsights()
    this._getData()
    this._createOptionsMap()
    console.log('groPlus meta', this.groPlusSurveyMeta)
  }

  _getData() {
    // get list survey farmers then get their meta
    // this.farmers = this.databasePrvdr.getSubCollection('Surveys', '3blD3GGrIzuuPjD47a08', "Farmers")
    // testing only
    this.databasePrvdr.getSubCollection('Surveys', '8ft5LhC8t9Uo072m34px', "Farmers")
      .subscribe(r => {
        this.results = r
        this._processResults(r)
        console.log('results', this.results)
        this._getMeta(r)
      })
    this.surveys = this.databasePrvdr.getCollection('Surveys')
  }
  test() {
    console.log('farmers', this.farmers)
  }
  _getMeta(farmers) {
    // takes list of farmer object containing _key and completed field and returns farmer doc
    let keyArray = farmers.map(f => f._farmerKey)
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
  _processResults(results) {
    // takes array of json results objects and aggregates into counts of specific values
    // currently hardcoded for this vis, but could be generalised
    let collated = {}
    for (let r of results) {
      let farmerKey = r._farmerKey
      if (r.hasOwnProperty('Differences observed')) {
        for (let crop in r['Differences observed']) {
          if (r['Differences observed'].hasOwnProperty(crop)) {
            for (let difference in r['Differences observed'][crop]) {
              let val = r['Differences observed'][crop][difference]
              console.log('difference', difference, 'val', val)
              this.collatedTemplate[crop][difference][val].push(farmerKey)
            }
          }
        }
      }
    }
    console.log('collated', this.collatedTemplate)
  }
  _addToCollated(key) {

  }
  _createOptionsMap() {
    // need format cropNAME.diffName.diffValue =[]
    // e.g. maize.'flowering time'.earlier=[]
    let collatedTemplate = {}
    for (let crop of this.groPlusSurveyMeta["Used with"].options) {
      collatedTemplate[crop.value] = {}
      for (let d of this.groPlusSurveyMeta["Differences observed"].options) {
        collatedTemplate[crop.value][d.value] = {}
        for (let option of d.subOptions) {
          collatedTemplate[crop.value][d.value][option.value] = []
        }
      }
    }

    this.collatedTemplate = collatedTemplate
    console.log('collated template', this.collatedTemplate)
  }
}
