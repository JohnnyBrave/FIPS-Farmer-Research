import { Component, AfterViewInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-results-overview',
  templateUrl: 'results-overview.html',
})
export class ResultsOverviewPage {
  page1: any = 'NetworkResultsPage';
  page2: any = 'ExperimentResultsPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }



}
