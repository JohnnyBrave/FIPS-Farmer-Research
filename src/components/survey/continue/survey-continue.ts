import { Component } from '@angular/core';

/**
 * Generated class for the SurveyContinueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'survey-continue',
  templateUrl: 'survey-continue.html'
})
export class SurveyContinueComponent {

  text: string;

  constructor() {
    console.log('Hello SurveyContinueComponent Component');
    this.text = 'Hello World';
  }

}
