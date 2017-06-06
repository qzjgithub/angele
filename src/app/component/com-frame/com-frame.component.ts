import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'com-frame',
  templateUrl: 'com-frame.component.html',
  styleUrls: ['com-frame.component.css']
})
export class ComFrameComponent implements OnInit {

  // @Input()
  object : Object;

  // @Input()
  tips: Array<any>;

  constructor() {
    this.object = {name:'project1',modify:'20170602',url:'project1',description:'asdfasdfasdf as;dfj;asd ;awejf[saidjf fj ;dfj adj'}
    this.tips = [
      {key:'modify',name:'修改时间'},
      {key:'url',name:'默认路径',value:'/project1/test'}
    ]
  }

  ngOnInit() {
  }

}
