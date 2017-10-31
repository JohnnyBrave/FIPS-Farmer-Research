import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { QuestionBase }     from '../../../models/question-base';

@Component({
  selector: 'survey-question',
  templateUrl: 'survey-question.html'
})
export class SurveyQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
