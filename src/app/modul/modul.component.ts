import {Component, OnInit, Inject, Input} from '@angular/core';
import {Modul} from "../../control/modul/modul.model";
import {Store} from "redux";
import {AppState} from "../../control/app.reducer";
import {AppStore} from "../../control/app.store";
import * as ModulActions from '../../control/modul/modul.action';
import {deepAssign} from "../../com-util";
import * as pop from '../component/pop/pop.model';

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {

  /**
   * 父节点内容
   */
  @Input()
  parent:Object;

  /**
   * 父节点类型
   */
  @Input()
  ptype:string;
  /**
   * 所有模块
   */
  moduls: Modul[];

  /**
   * 被选中的模块
   */
  selectModul: Modul;

  /**
   * 模式
   */
  pattern:String;

  /**
   * 被选中要管理的modul
   * @param store
   */
  manageIds: Array<string>;

  /**
   * 弹框数组
   */
  popData: Array<Object>;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.moduls = [];
    this.selectModul = null;
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = [];
  }

  ngOnInit() {
  }

  /**
   * 添加模块
   */
  add(event){
    this.pattern = "add";
    this.store.dispatch(ModulActions.setCurrentModul(this.parent['id'],this.ptype,null));
    this.selectModul = {
      id: "",
      name: "",
      principal:"",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      jurisdiction: "",
    }
  }

  /**
   * 管理模块
   */
  manage(event){
    if(this.pattern!=='manage'){
      this.pattern = 'manage';
      this.selectModul = null;
      this.store.dispatch(ModulActions.setCurrentModul(this.parent['id'],this.ptype,null));
    }else{
      this.pattern = 'display';
      this.manageIds = [];
    }
    event.stopPropagation();
  }

  /**
   * 删除模块
   */
  delete(event){
    this.popData.push(deepAssign(pop.param,{
      content:"确认删除选中的模块吗？",
      data: {
        operate: 'delete',
        param: {
          pid: this.parent['id'],
          ptype: this.ptype,
          ids:this.manageIds
        }
      }
    }));
    event.stopPropagation();
  }

  /**
   * 弹框的事件
   */
  popevent(event){
    switch(event.key){
      case 'confirm':
        this.popComfirm(event);
      case 'cancel':
      case 'close':
      default:
        this.popData.pop();
    }
  }

  /**
   * 弹框确认事件
   * @param event
   */
  popComfirm(event){
    switch(event.data.operate){
      case 'delete':
        break;
      case 'update':
        break;
    }
  }

  /**
   * 选中某个模块的事件
   * @param event
   * @param project
   */
  clickModul(event, modul){
    switch(this.pattern){
      case 'manage':
        let index = this.manageIds.indexOf(modul.id);
        if(index > -1){
          this.manageIds.splice(index,1);
        }else{
          this.manageIds.push(modul.id);
        }
        break;
      case 'add':
      case 'display':
        if(!this.selectModul || modul.name!==this.selectModul.name){
          this.selectModul = modul;
          this.store.dispatch(ModulActions.setCurrentModul(this.parent['id'],this.ptype,modul.id));
          event.stopPropagation();
        }
    }

  }

}
