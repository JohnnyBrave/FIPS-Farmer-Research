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
  }
  _setRepeatQuestion(question){
    this.repeatQuestion=question
    this.repeatArray=question.options.repeats
  }
 

}
