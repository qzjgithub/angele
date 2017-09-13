import {Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';
import {AppState} from "../../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../../control/app.store";
import {getCurrentModId} from "../../../control/modul/modul.reducer";
import {getCurrentProId} from "../../../control/project/project.reducer";
import * as util from '../../../com-util';

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
  modul:Object;

  /**
   * 框架上要展示的数据
   */
  tips: Array<any>;

  /**
   * 是否展示简介
   */
  brefIsDisplay: boolean;

  /**
   * 被选中的模块
   * @param store
   */
  selectModulId: string;

  /**
   * 被选中的项目ID
   */
  selectProId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
    //初始化选中项目
    this.selectProId = getCurrentProId(this.store.getState());
    //初始化被选模块
    this.selectModulId = getCurrentModId(this.store.getState(),this.selectProId)
  }

  ngOnInit() {
    if(new RegExp(/^\d+$/).test(this.modul['modify_time'])) this.modul['modify_time'] = util.setDateFormat(new Date(this.modul['modify_time']))
    if(this.selectModulId === this.modul['id']){
      this.brefIsDisplay = false;
    }
  }

  /**
   * 切换简介
   * @param event
   */
  toggleBref(event){
    this.brefIsDisplay = !this.brefIsDisplay;
    if(!this.brefIsDisplay){
      this.modulEvent.emit({type:'toggle',param:this.modul});
    }
    event.stopPropagation();
  }

  /**
   * 删除模块
   */
  delete(event){
    this.modulEvent.emit({type:'delete',param:[this.modul['id']]});
    event.stopPropagation();
  }


  /**
   * 进入模块详情
   */
  gotoModul(event){
    this.modulEvent.emit({type:'gotoModul',param: this.modul});
    event.stopPropagation();
  }

}
