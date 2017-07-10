import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import * as util from '../../../com-util';
import {AppState} from "../../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../../control/app.store";
import * as pop from "../pop/pop.model";

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

  /**
   * 弹框数组
   */
  popData: Array<Object>;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //传进来的要展示的数据
    // this.data = {name:'project1',modify_time:'20170602',url:'project1',comment:'asdfasdfasdf as;dfj;asd ;awejf[saidjf fj ;dfj adj'}
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
    this.popData = [];
  }

  ngOnInit() {
    if(this.data['modify_time'] instanceof Date) this.data['modify_time'] = util.setDateFormat(this.data['modify_time']);
  }

  /**
   * 切换简介
   * @param event
   */
  toggleBref(event){
    this.brefIsDisplay = !this.brefIsDisplay;
    event.stopPropagation();
  }

  /**
   * 删除项目
   */
  delete(event){
    this.popData.push(util.deepAssign(pop.param,{content:"确认删除项目"+this.data['name']+"吗？"}));
    event.stopPropagation();
  }

  /**
   * 弹框的事件
   */
  popevent(event){
    switch(event.key){
      case 'confirm':
      case 'cancel':
      case 'close':
      default:
        this.popData.pop();
    }
  }

}
