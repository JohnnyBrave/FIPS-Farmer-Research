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
  networkGrowthData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr: DatabaseProvider) {
    this._setInsights()
    this._getData()
  }

  ionViewDidEnter() {

  }
  _getData() {
    // bind to farmer registration survey for data
    this.databasePrvdr.getSubCollection('Surveys', '3blD3GGrIzuuPjD47a08', "Farmers")
      .subscribe(
      f => { this._calculateTimeSeries(f, 'completed') }
      )
  }
  _calculateTimeSeries(data, field) {
    // takes data array with timestamp field values and pushes to seperate total and cumulative objects
    let dailyTotals = {}
    let runningTotals = {}
    let i = 1
    data.forEach((el) => {
      let timestamp: Date = el[field]
      let datestring = timestamp.toDateString()
      // use utc to force into correct order by date
      let utc = Date.parse(datestring)
      dailyTotals[utc] = dailyTotals[utc] ? dailyTotals[utc] + 1 : 1
    });
    // sort utc numerically
    let keys = Object.keys(dailyTotals)
    keys = keys.sort()
    let sortedDailyTotals={}
    for(let k of keys){sortedDailyTotals[k]=dailyTotals[k]}
    let running = 0
    for (let key in sortedDailyTotals) {
      if (dailyTotals.hasOwnProperty(key)) {
        runningTotals[key] = dailyTotals[key] + running
        running = runningTotals[key]
      }
    }
    this.networkGrowthData = this._jsonToDateArray(runningTotals)
    // update network growth for real data
    this.insights[0].chartData.series[0].data = this.networkGrowthData
  }
  _jsonToDateArray(json) {
    // takes json with utc key : value pairs and pushes to array items with utc date object for highcharts
    let arr = []
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        let val = json[key]
        let epoch = parseInt(key)
        let dateObject = new Date(epoch)
        let dateFormatted=Date.UTC(dateObject.getUTCFullYear(),dateObject.getUTCMonth(),dateObject.getUTCDate())
        arr.push([dateFormatted, val])
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
