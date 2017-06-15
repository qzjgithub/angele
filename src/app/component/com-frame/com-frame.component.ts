import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'com-frame',
  templateUrl: 'com-frame.component.html',
  styleUrls: ['com-frame.component.css']
})
export class ComFrameComponent implements OnInit {

  // @Input()
  data : Object;

  // @Input()
  tips: Array<any>;

  /**
   * 是否展示简介
   */
  brefIsDisplay: boolean;

  constructor() {
    //传进来的要展示的数据
    this.data = {name:'project1',modify:'20170602',url:'project1',description:'asdfasdfasdf as;dfj;asd ;awejf[saidjf fj ;dfj adj'}
    //在右上角要展示的内容
    this.tips = [
      {key:'modify',name:'修改时间'},
      {key:'url',name:'默认路径',value:'/project1/test'}
    ]
    this.brefIsDisplay = true;
  }

  ngOnInit() {
  }
  toggleBref(){
    this.brefIsDisplay = !this.brefIsDisplay;
  }

}
