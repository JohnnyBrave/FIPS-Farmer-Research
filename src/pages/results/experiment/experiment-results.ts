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
  insightMeta:any;
  collatedResults: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this._setInsights()
    this._getData()
    this._setInsightMeta()
    console.log('groPlus meta', this.groPlusSurveyMeta)
    // load farmer if navigating from data page, wait until after more init complete to set experiment
    if(this.navParams.data.farmerKey){this.focusFarmer=navParams.data.farmerKey}
    
  }

  iconClick(i){
    // method when counter person icon clicked
    console.log('i',i)
  }

  _getData() {
    // get list survey farmers then get their meta
    // this.farmers = this.databasePrvdr.getSubCollection('Surveys', '3blD3GGrIzuuPjD47a08', "Farmers")
    // testing only
    this.databasePrvdr.getSubCollection('Surveys', '8ft5LhC8t9Uo072m34px', "Farmers")
      .subscribe(r => {
        this.results = r
        console.log('results', this.results)
        this._processResults(r)
        this._getMeta(r)
      })
    this.surveys = this.databasePrvdr.getCollection('Surveys')
  }

  _getMeta(farmers) {
    // takes list of farmer object containing _key and completed field and returns farmer doc
    console.log('getting meta',farmers)
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
    // first set preloaded values using options map (a bit hardcoded, should be generalised)
    this.collatedResults = this._createOptionsMap(this.groPlusSurveyMeta)
    for (let r of results) {
      let farmerKey = r._farmerKey
      this.collatedResults = this._flatten(this.collatedResults, r, farmerKey)
    }
    console.log('collated', this.collatedResults)
    if(this.navParams.data.experiment){this.activeInsight='Perceived effect of GroPlus on crops'}

  }
  _flatten(collated, json, pushVal) {
    // take a current json array and map to corresponding array of values in collated, pushing id value
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        let val = json[key]
        if (val != "") {
          //ignore empty string values
          if (!collated[key]) { collated[key] = {} }
          if (typeof val == "string" || typeof val == "number") {
            // strings or numbers can be mapped directly
            collated[key] = this._mapValToObject(collated[key], val, pushVal)
          }
          if (typeof val == "object") {
            // objects need to be determined and dealt with. Undefined or null are ignored
            if (val[0]) {
              // arrays just populate multiple string values
              this._mapArrayToObject(collated[key], val, pushVal)
            }
            else if (val instanceof Date) {
              // dates currently ignored but could be collated by day/month/year like in network results
              console.log('ignoring date objects')
            }
            else if (Object.keys(val).length > 0) {
              // json objects go through same process recursively
              collated[key] = this._flatten(collated[key], val, pushVal)
            }
          }
        }
      }
      //   // 
      //   // 
      //   // else{console.error('object type unknown',val)}
      //   // json, arrays or date objects need to be handled recursively

    }
    return collated
  }
  _mapValToObject(json, value, id) {
    // push an id to a matching value array in an object, to track frequency of specific results
    if (!json.hasOwnProperty(value)) { json[value] = [] }
    json[value].push(id)
    return json
  }

  _mapArrayToObject(json, array, id) {
    // push an id to multiple matching value arrays in an object, to track frequency of specific results
    for (let el of array) {
        if (!json.hasOwnProperty(el)) { json[el] = [] }
        json[el].push(id)
        return json
    }

  }
  _setInsightMeta(){
    //generate meta in correct format
    let meta:any ={}
    meta.options=this.groPlusSurveyMeta["Used with"]
  }

  _createOptionsMap(meta) {
    // need format cropNAME.diffName.diffValue =[]
    // e.g. maize.'flowering time'.earlier=[]

    //should be collated with other fuctions from flatten, although beta schema needed
    // (not diferentiating the differences as sub of used with)
    let map = { "Differences observed": {} }
    for (let crop of meta["Used with"].options) {
      // populate possible crops
      map["Differences observed"][crop.value] = {}
      for (let d of meta["Differences observed"].options) {
        // populate possible subcrop differences
        map["Differences observed"][crop.value][d.value] = {}
        for (let option of d.subOptions) {
          map["Differences observed"][crop.value][d.value][option.value] = []
        }
      }
    }
    return map
  }
}
