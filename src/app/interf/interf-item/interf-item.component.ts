import {Component, OnInit, Output, EventEmitter, Input, Inject} from '@angular/core';
import {Interf} from "../../../control/interf/interf.model";
import {Store} from "redux";
import {AppStore} from "../../../control/app.store";
import {AppState} from "../../../control/app.reducer";
import {getCurrentIntId} from "../../../control/interf/interf.reducer";
import {getCurrentProId} from "../../../control/project/project.reducer";

@Component({
  selector: 'app-interf-item',
  templateUrl: 'interf-item.component.html',
  styleUrls: ['interf-item.component.css']
})
export class InterfItemComponent implements OnInit {
  @Output()
  interfEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * 当前模块
   */
  @Input()
  interf:Interf;

  /**
   * 框架上要展示的数据
   */
  tips: Array<any>;

  /**
   * 是否展示简介
   */
  brefIsDisplay: boolean;

  /**
   * 被选中的jiekou
   * @param store
   */
  selectInterfId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
    //初始化被选模块
    this.selectInterfId = getCurrentIntId(this.store.getState(),getCurrentProId(this.store.getState()))
    // this.selectInterfId = null;
  }

  ngOnInit() {
    if(this.selectInterfId === this.interf.id){
      this.brefIsDisplay = false;
    }
  }

  /**
   * 切换简介
   * @param event
   */
  toggleBref(event){
    this.brefIsDisplay = !this.brefIsDisplay;
    console.log(this.brefIsDisplay);
    if(!this.brefIsDisplay){
      this.interfEvent.emit({type:'toggle',param:this.interf});
    }
    event.stopPropagation();
  }

  /**
   * 删除模块
   */
  delete(event){
    this.interfEvent.emit({type:'delete',param:[this.interf.id]});
    event.stopPropagation();
  }

}
