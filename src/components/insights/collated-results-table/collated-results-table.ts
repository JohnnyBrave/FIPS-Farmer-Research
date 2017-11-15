import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'collated-results-table',
  templateUrl: 'collated-results-table.html'
})
export class CollatedResultsTableComponent {
  @Input('meta') meta:any;

  text: string;

  constructor() {
    console.log('Hello CollatedResultsTableComponent Component');
    this.text = 'Hello World';
  }

}

/*
options:
meta
nested json, each level contains list of options that is used to drill down data object
first level seperates onto pages
options passed as array with value and label fields
optional suboptions on options used as table split
*/
