import {Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';
import {Intdata} from "../../../control/intdata/intdata.model";
import {AppStore} from "../../../control/app.store";
import {Store} from "redux";
import {AppState} from "../../../control/app.reducer";
import {getCurrentProId} from "../../../control/project/project.reducer";
import {getCurrentIntdataId} from "../../../control/intdata/intdata.reducer";

@Component({
  selector: 'app-intdata-item',
  templateUrl: 'intdata-item.component.html',
  styleUrls: ['intdata-item.component.css']
})
export class IntdataItemComponent implements OnInit {

  @Output()
  intdataEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * 当前模块
   */
  @Input()
  intdata:Intdata;

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
  selectIntdataId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //在右上角要展示的内容
    this.tips = [
      {key:'modify_time',name:'修改时间'},
      {key:'path',name:'默认路径'}
    ];
    //默认展示简介
    this.brefIsDisplay = true;
    //初始化被选模块
    this.selectIntdataId = getCurrentIntdataId(this.store.getState(),getCurrentProId(this.store.getState()))
    // this.selectInterfId = null;
  }

  ngOnInit() {
    if(this.selectIntdataId === this.intdata.id){
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
      this.intdataEvent.emit({type:'toggle',param:this.intdata});
    }
    event.stopPropagation();
  }

  /**
   * 删除模块
   */
  delete(event){
    this.intdataEvent.emit({type:'delete',param:[this.intdata.id]});
    event.stopPropagation();
  }

}
