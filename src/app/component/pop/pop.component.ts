import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pop',
  templateUrl: 'pop.component.html',
  styleUrls: ['pop.component.css']
})
export class PopComponent implements OnInit {

  @Input()
  param: Object;

  @Output() btnclick : EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {
    this.param = {};
  }

  ngOnInit() {
  }

  btnevent($event,key){
    switch(key){
      case 'close':
      case 'cancel':
        this.param['active'] = false;
      default:
        this.btnclick.emit({key:key, data: this.param['data']});
    }
  }

}
