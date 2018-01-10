/**************************************************
For full list of possible options see bottom of page
**************************************************/
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';

@Injectable()
export class SurveyBuilderProvider {
  public formGroup: FormGroup;
  // allQuestions = questionMeta
  groupQuestions: any;
  section: any;
  // track questions to omit from main lists
  repeatChildren: any = []

  constructor(private fb: FormBuilder, private events: Events) {
  }

  getSurveyValue(controlName){
    return this.formGroup.value[controlName]
  }
  generateQuestionForm(questions, repeatGroup?: boolean) {
    // uses the formbuilder to a form from an array of questions provided
    // also handles building of repeat groups nested within forms
    let questionGroup = {}
    // filter out invalid questions (keep non-questions as may be labels or feedback)
    questions = questions.filter(q => {
      if (!q.controlName || q.controlName == "") { return false }
      // if(q.isQuestion!="TRUE"){return false}
      return true
    })
    // generate conditions
    questions = questions.map(q => {
      if (!q.options) { q.options = {} }
      if (q.options.condition) { return this._generateConditionOptions(q) }
      else { return q }
    })
    let displayQs = []
    questions.forEach(q => {
      // build templates for any repeat groups
      if (q.type == "repeat") {
        // build formgroup sections appropriately
        let repeatQs = this._generateRepeatQuestions(q, questions)
        q.repeatQuestions = repeatQs
        questionGroup[q.controlName] = this.fb.array([])
        displayQs.push(q)
      }
      else {
        // skip questions included in repeat groups unless repeat group
        if (this.repeatChildren.indexOf(q.controlName) == -1 || repeatGroup) {
          if (!q.value) { q.value = "" }
          displayQs.push(q)
          // omit non question from form (but keep in display)
          if (q.isQuestion == "TRUE") {
            // apply any validator (needs testing)
            if(q.options.validator){
              console.log('applying validator',q)
              console.log('validators',Validators)
              console.log('validator',Validators[q.options.validator])
              questionGroup[q.controlName] = [q.value,Validators[q.options.validator]]
            }
            else{
              questionGroup[q.controlName] = q.value
            }
            
          }
        }
      }
    });
    if (!repeatGroup) { this.groupQuestions = displayQs }
    // remove label and other parts not interested in final formgroup
    console.log('questionGroup',questionGroup)
    this.formGroup = this.fb.group(questionGroup)
    return this.formGroup

  }

  _generateConditionOptions(question) {
    // if text condition string turn into json element for use in show logic function
    let json = {}
    let condition = question.options.condition
    if(typeof condition == 'object'){
      question.conditionJson=condition
      return question
    }
    else{
      let propertiesString = question.options.condition
      let propertiesArray = propertiesString.split(',')
      propertiesArray.forEach(el => {
        let a = el.split(':');
        let key = a[0].trim();
        let val = a[1].trim();
        json[key] = val
      });
      question.conditionJson = json
      return question
    }
   
  }

  initFormValues(values, allQuestions) {
    // set values, building controls as required ( in simple mode, currently skipping any validators)
    Object.keys(values).forEach(key => {
      let val = values[key]
      // load string values
      if (typeof (val) == "string") {
        let patch = {}
        patch[key] = val
        this.formGroup.patchValue(patch)
      }
      // create controls for repeat group questions
      else if (val instanceof Array) {
        let question = allQuestions.filter(q => { return q.controlName == key })[0]
        let repeatQs = this._generateRepeatQuestions(question, allQuestions)
        // update value on repeatQs
        for (let repeat of val) {
          repeatQs.map(q => {
            q.value = repeat[q.controlName]
          })
          const control = <FormArray>this.formGroup.controls[key]
          control.push(this._buildRepeatGroup(repeatQs))
        }
      }
    })
    console.log('formgroup', this.formGroup)
  }
  _generateRepeatQuestions(question, allQuestions) {
    // takes a question prefix and groups all sub questions into a repeat group
    let groupPrefix = question.controlName
    let repeatQs: any = allQuestions.filter(q => {
      // match 3.2.1 and 3.2.2 to 3.2 group
      if (q.controlName.indexOf(groupPrefix) > -1 && q.controlName != groupPrefix) {
        this.repeatChildren.push(q.controlName)
        return true
      }
    })
    // add listener for update, e.g. if values depend on 4.2 listn for arrayChange:4.2
    this.events.unsubscribe('arrayChange:' + question.selectOptions)
    this.events.subscribe('arrayChange:' + question.selectOptions, update => {
      console.log('array change:' + question.selectOptions, update)
      console.log('pushing repeat to ' + question.controlName)
      const control = <FormArray>this.formGroup.controls[groupPrefix]
      if (update.type == "push") {
        // push a repeat to the question group
        control.push(this._buildRepeatGroup(repeatQs))
      }
      if (update.type == "splice") {
        control.removeAt(update.index)
      }
      if (update.type == "reset") {
        for (let i = control.length; i > 0; i--) {
          control.removeAt(i - 1)
        }
        if (!update.empty) { control.push(this._buildRepeatGroup(repeatQs)) }
      }
      console.log('formgroup', this.formGroup)
    })
    return repeatQs
  }

  _buildRepeatGroup(repeatQs) {
    let repeatGroup = this.generateQuestionForm(repeatQs, true)
    return repeatGroup
  }

}
/**************************************************
Options
**************************************************/

/*
options:{
  condition:conditionObject
  repeatAs:string
  repeats:string[]
  selectOptions: selectOption[]
  validator:string (must exist on Validators)

}

selectOption:{
  label:string
  value:string
}

*****************
condition objects
*****************
These are used to pass necessary conditions to show question. Currently supported are
'pre-requisite' and 'value' if display depends on another question's existence or value

{
  type: 'prerequisite'
  controlName: string,

  type: 'value'
  controlName: string,
  value: any
}

*/










  //************ old code  ******************//





//   getFormGroup() {
//     if (this.formGroup) { return this.formGroup }
//     else {
//       this.formGroup = this._generateQuestionForm(questionMeta)
//       return this.formGroup
//     }
//   }
//   getQuestions() {
//     // return questions pre-processed to remove repeat groups and other unwanted features
//     if (this.groupQuestions) { return this.groupQuestions }
//     else {
//       this._generateQuestionForm(questionMeta)
//       return this.groupQuestions
//     }
//   }



//   _customUpdateTriggers(update) {
//     // things that don't fall naturally into template
//     if (update.controlName == "q5.1") {
//       // patch to alter repeat group repeats
//       let patch = {}
//       patch["q5.2"] = ''
//       this.formGroup.patchValue(patch)
//       if (update.value == "Yes") {
//         this.events.publish('arrayChange:q5.2', { controlName: "q5.2", type: 'reset', empty: false })
//       }
//       if (update.value == "No") {
//         this.events.publish('arrayChange:q5.2', { controlName: "q5.2", type: 'reset', empty: true })
//       }
//     }
//   }






//   _addSubQuestion(template) {
//     // create nested group
//     return this.fb.group(template)
//   }


