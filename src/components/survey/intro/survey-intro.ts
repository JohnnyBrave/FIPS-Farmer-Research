import { Component, Input } from '@angular/core';
import {Events} from 'ionic-angular'
@Component({
  selector: 'survey-intro',
  templateUrl: 'survey-intro.html'
})
export class SurveyIntroComponent {
  @Input('title') title:string;
  @Input('subtitle') subtitle:string;


  constructor( public events:Events) {
  }
  nextSlide() {
    this.events.publish('slides:next')
  }

}
