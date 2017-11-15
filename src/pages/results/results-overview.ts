import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController, SuperTabs } from 'ionic2-super-tabs';


@IonicPage()
@Component({
  selector: 'page-results-overview',
  templateUrl: 'results-overview.html',
})
export class ResultsOverviewPage {
  page1: any = 'NetworkResultsPage';
  page2: any = 'ExperimentResultsPage';
  params: any;
  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private superTabsCtrl: SuperTabsController,
  ) {
    this.params = this.navParams
    }


  ngAfterViewInit() {
    if (this.navParams.data.experiment) {
      this.superTabsCtrl.slideTo('experimentsTab')
    }
  }
  ionViewDidLoad() {
    console.log('overview loaded')
  }



}
