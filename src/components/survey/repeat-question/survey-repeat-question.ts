import { Component, Input } from '@angular/core';

@Component({
  selector: 'survey-repeat-question',
  templateUrl: 'survey-repeat-question.html'
})
export class SurveyRepeatQuestionComponent {
  repeatArray:any[]=[]
  repeatQuestion:any
  @Input() set question(question: number){
    this._setRepeatQuestion(question)
  };
  // @Input() set repeats(repeats: number) {
  //   this._setRepeatArray(repeats)
  // }



  constructor() {
    console.log('Hello SurveyRepeatQuestionComponent Component');
  }
  _setRepeatQuestion(question){
    console.log('setting repeat question',question)
    this.repeatQuestion=question
    this.repeatArray=question.options.repeats
  }
  _setRepeatArray(repeats){
    // convert data object to array
    console.log('repeats',repeats)
  }
 

}
