import { Component } from '@angular/core';

@Component({
  selector: 'survey-complete',
  templateUrl: 'survey-complete.html'
})
export class SurveyCompleteComponent {

  text: string;

  constructor() {
    console.log('Hello SurveyCompleteComponent Component');
    this.text = 'Hello World';
  }

}
