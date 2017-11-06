import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/providers';
// import * as Chart from 'chart.js'
import { Chart } from 'angular-highcharts';

@IonicPage()
@Component({
  selector: 'page-network-results',
  templateUrl: 'network-results.html',
})
export class NetworkResultsPage {
  insights: any
  canvas: any;
  ctx: any;
  showIntro: boolean = true;
  chart: any;
  activeInsight: any;
  networkGrowthData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this.databasePrvdr.getCollection('Surveys')
    this._setInsights()
    this._getData()
  }

  ionViewDidEnter() {

  }
  _getData(){
    // bind to farmer registration survey for data
    this.databasePrvdr.getSubCollection('Surveys','3blD3GGrIzuuPjD47a08',"Farmers")
    .subscribe(
      f=>{this._calculateTimeSeries(f,'completed')}
    )
  }
  _calculateTimeSeries(data, field){
    // takes data array with timestamp field values and pushes to seperate total and cumulative objects
    let dailyTotals={}
    let runningTotals={}
    data.forEach((el,i) => {
      let timestamp:Date = el[field]
      let datestring = timestamp.toDateString()
      console.log('dateString',datestring)
      dailyTotals[datestring] = dailyTotals[datestring] ? dailyTotals[datestring] +1 : 1
      runningTotals[datestring] = i+1
    });
    this.networkGrowthData=this._jsonToDateArray(runningTotals)
    console.log('daily totals',dailyTotals)
    console.log('running totals',runningTotals)
    // update network growth for real data
    this.insights[0].chartData.series[0].data=this.networkGrowthData
  }
  _jsonToDateArray(json){
    // takes json with datestring key : value pairs and pushes to array items with utc date object for highcharts
    let arr = []
    for(let key in json){
      if(json.hasOwnProperty(key)){
        let dateObject = new Date(Date.parse(key))
        let utc = Date.UTC(dateObject.getFullYear(),dateObject.getMonth(),dateObject.getDay())
        let val = json[key]
        arr.push([utc,val])
      }      
    }
    return arr
  }

  insightChange(i) {
    console.log('insight changed', i)
    this.showIntro = false
    this.activeInsight = i
    this.chart = new Chart(i.chartData)
  }

  chartClicked(e) {
    console.log('chart clicked', e)
  }
  chartHovered(e) {
    console.log('chart hovered', e)
  }

  _setInsights() {
    this.insights = [
    {
      title: 'Network Growth',
      chartData: networkGrowthTemplate
    }
    ]
  }
  
}

var testData1: any = {
  chart: { type: 'line' },
  title: { text: 'Linechart' },
  credits: { enabled: false },
  series: [{
    name: 'Line 1',
    data: [1, 2, 3]
  }]
}

var networkGrowthTemplate: any = {
  chart: {
    zoomType: 'x'
  },
  title: {
    text: 'Farmer Registrations Over Time'
  },
  subtitle: {
    text: document.ontouchstart === undefined ?
      'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'Number of Farmers'
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null
    }
  },

  series: [{
    type: 'area',
    name: 'Total Farmers',
    data: []
  }]
}


// chartjs format insights
// ionViewDidEnter() {
//   this.canvas = document.getElementById('myChart');
//   this.ctx = this.canvas.getContext('2d');    
// }

// this.insights=[{
//   label:'Network Growth',
//   labels:['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
//   chartType:'bar',
//   data:[
//     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
//     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
//   ]
// },
// {
//   label:'Network Growth 2',
//   labels:['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
//   chartType:'bar',
//   data:[
//     {data: [15, 49, 80, 51, 56, 95, 40], label: 'Series A'},
//     {data: [28, 48, 20, 19, 26, 27, 50], label: 'Series B'}
//   ]
// }]
