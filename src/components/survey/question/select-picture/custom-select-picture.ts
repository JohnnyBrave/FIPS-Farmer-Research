import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SurveyQuestionComponent } from '../survey-question'

@Component({
  selector: 'custom-select-picture',
  templateUrl: 'custom-select-picture.html'
})
export class CustomSelectPictureComponent extends SurveyQuestionComponent {


  options: any;
  selected: any = {}
  selectPictureValue:any;

  ngOnInit() {
    console.log('question', this.question)
    console.log('formgroup', this.formGroup)

  }
  ngOnDestroy() {
    //  call parent element ondestroy function using super
    // super.ngOnDestroy();
  }
  selectClicked(e,value) {
    // value always passed as ion-change event
  //  checked new, uncheck old
  if(this.selected[value]){
    Object.keys(this.selected).forEach(k=>{
      if(k!=value){
        this.selected[k]=false
      }
    })
    this.saveValue(value)
    console.log('formgroup',this.formGroup)
  }
  
  }

}
