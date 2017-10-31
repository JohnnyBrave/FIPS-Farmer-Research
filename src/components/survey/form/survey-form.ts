import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from '../../../models/question-base';
import { QuestionControlProvider }    from '../../../providers/providers';

@Component({
  selector: 'survey-form',
  templateUrl: 'survey-form.html',
})
export class SurveyFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
 
  constructor(private qcp: QuestionControlProvider) {  }
 
  ngOnInit() {
    this.form = this.qcp.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
