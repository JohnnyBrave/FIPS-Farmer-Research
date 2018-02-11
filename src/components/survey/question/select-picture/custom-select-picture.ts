import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SurveyQuestionComponent } from '../survey-question'

@Component({
  selector: 'custom-select-picture',
  templateUrl: 'custom-select-picture.html'
})
export class CustomSelectPictureComponent extends SurveyQuestionComponent {


  options: any;
  selected: any = {}
  selectPictureValue: any;

  ngOnInit() {
    console.log('question', this.question)
    console.log('formgroup', this.formGroup)
    console.log('this', this)

  }
  ngOnDestroy() {
    //  call parent element ondestroy function using super
    // super.ngOnDestroy();
  }
  selectClicked(e, value) {
    // value always passed as ion-change event
    
    if (this.selected[value]) {
      //  checked new box, need to uncheck old
      Object.keys(this.selected).forEach(k => {
        if (k != value) {
          this.selected[k] = false
        }
      })
      this.saveValue(value)
      console.log('formgroup', this.formGroup)
    }
    else{
      // unchecked existing, need to clear
      this.saveValue("")
    }

  }
  selectMultipleClicked(e,value){
    // ensure all non-selected are set to false for completion
    for(let option of this.question.options.selectOptions){
      if(!this.selected[option.value]){this.selected[option.value]=false}
    }
    this.saveValue(this.selected)
  }

}
