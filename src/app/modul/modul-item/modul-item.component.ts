import {Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';
import {Modul} from "../../../control/modul/modul.model";
import {AppState} from "../../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../../control/app.store";
import {getCurrentModId} from "../../../control/modul/modul.reducer";
import {getCurrentProId} from "../../../control/project/project.reducer";
import * as ModulActions from '../../../control/modul/modul.action';

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

  /**
   * 被选中的模块
   * @param store
   */
  selectModulId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
    //初始化被选模块
    this.selectModulId = getCurrentModId(this.store.getState(),getCurrentProId(this.store.getState()))
  }

  ngOnInit() {
    if(this.selectModulId === this.modul.id){
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
    this.modulEvent.emit({type:'delete',param:[this.modul.id]});
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
