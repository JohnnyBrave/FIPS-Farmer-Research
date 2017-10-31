/*
 a simple service for transforming the questions to a FormGroup. 
 In a nutshell, the form group consumes the metadata from the question model and allows you to
 specify default values and validation rules.
 */

import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../../models/question-base';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionControlProvider {

  constructor() {
    console.log('Hello QuestionControlProvider Provider');
  }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
