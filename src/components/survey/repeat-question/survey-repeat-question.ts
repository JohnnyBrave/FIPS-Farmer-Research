import { Component } from '@angular/core';

/**
 * Generated class for the SurveyRepeatQuestionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'survey-repeat-question',
  templateUrl: 'survey-repeat-question.html'
})
export class SurveyRepeatQuestionComponent {

  text: string;

  constructor() {
    console.log('Hello SurveyRepeatQuestionComponent Component');
    this.text = 'Hello World';
  }

}
