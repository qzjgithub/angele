import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as util from '../../../com-util';

@Component({
  selector: 'com-frame',
  templateUrl: 'com-frame.component.html',
  styleUrls: ['com-frame.component.css']
})
export class ComFrameComponent implements OnInit {

  /**
   * 传进来要展示的数据
   */
  @Input()
  data : Object;

  // @Input()
  tips: Array<any>;

  /**
   * 是否展示简介
   */
  brefIsDisplay: boolean;

  constructor() {
    //传进来的要展示的数据
    this.data = {name:'project1',modify_time:'20170602',url:'project1',comment:'asdfasdfasdf as;dfj;asd ;awejf[saidjf fj ;dfj adj'}
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'url',name:'默认路径',value:'/project1/test'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
  }

  ngOnInit() {
    this.data['modify_time'] = util.setDateFormat(this.data['modify_time']);
  }
  toggleBref(){
    this.brefIsDisplay = !this.brefIsDisplay;
  }

}
