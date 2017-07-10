import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'pop',
  templateUrl: 'pop.component.html',
  styleUrls: ['pop.component.css']
})
export class PopComponent implements OnInit {

  @Input()
  param: Object;

  constructor() {
    this.param = {};
  }

  ngOnInit() {
  }

}
