// Provider to develop survey forms based on schema. Not currently used

import { Injectable }       from '@angular/core';
import { DropdownQuestion } from '../../models/question-dropdown';
import { QuestionBase }     from '../../models/question-base';
import { TextboxQuestion }  from '../../models/question-textbox';
// import newFarmerRegistrationForm from '../../models/surveyForms/newFarmerRegistration'

@Injectable()
export class QuestionProvider {



//  getCustomSchemaQuestions() {
  // // load questions from json template and apply into schema
//    let questions: QuestionBase<any>[] = []

//    for(let q of newFarmerRegistrationForm){
//      if(q.controlType=="dropdown"){
//       questions.push(new DropdownQuestion(q))
//      }
//      if(q.controlType=="textbox"){
//       questions.push(new TextboxQuestion(q))
//      }
//    }
//   ;
//    return questions.sort((a, b) => a.order - b.order);
//  }
 }
