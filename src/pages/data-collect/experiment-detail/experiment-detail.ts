import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-experiment-detail',
  templateUrl: 'experiment-detail.html',
})
export class ExperimentDetailPage {
  experiment:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.experiment=navParams.data
    console.log('experiment',this.experiment)
  }

}
