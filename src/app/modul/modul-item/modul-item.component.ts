import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Modul} from "../../../control/modul/modul.model";

@Component({
  selector: 'app-modul-item',
  templateUrl: 'modul-item.component.html',
  styleUrls: ['modul-item.component.css']
})
export class ModulItemComponent implements OnInit {

  @Output()
  modulEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * 当前模块
   */
  @Input()
  modul:Modul;

  /**
   * 框架上要展示的数据
   */
  tips: Array<any>;

  /**
   * 是否展示简介
   */
  brefIsDisplay: boolean;

  constructor() {
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
  }

  ngOnInit() {
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
   * 删除模块
   */
  delete(event){
    this.modulEvent.emit({type:'delete',param:[this.modul.id]});
    event.stopPropagation();
  }

}
