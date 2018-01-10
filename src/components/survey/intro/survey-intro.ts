import { Component } from '@angular/core';
import {Events} from 'ionic-angular'
@Component({
  selector: 'survey-intro',
  templateUrl: 'survey-intro.html'
})
export class SurveyIntroComponent {


  constructor( public events:Events) {
  }
  nextSlide() {
    this.events.publish('slides:next')
  }

}
