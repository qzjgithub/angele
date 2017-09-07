import {Component, OnInit, Inject, Input} from '@angular/core';
import {Modul} from "../../control/modul/modul.model";
import {Store} from "redux";
import {AppState} from "../../control/app.reducer";
import {AppStore} from "../../control/app.store";
import * as ModulActions from '../../control/modul/modul.action';
import {deepAssign} from "../../com-util";
import * as pop from '../component/pop/pop.model';
import {getOneModulsEntities, getModulById} from "../../control/modul/modul.reducer";
import {getCurrentProject} from "../../control/project/project.reducer";
import {ModulService} from "../../control/modul/modul.service";
import {Project} from "../../control/project/project.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as ProjectActions from '../../control/project/project.action';
import 'rxjs/add/operator/switchMap';
import {ProjectService} from "../../control/project/project.service";

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {

  /**
   * 所属项目id
   */
  projectid:string;

  /**
   * 所属项目
   */
  project:Project;

  /**
   * 所属模块id
   */
  modulid:string;

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
  pattern: string;

  /**
   * 被选中要管理的modul
   * @param store
   */
  manageIds: Array<string>;

  /**
   * 弹框数组
   */
  popData: Array<Object>;

  constructor(@Inject(AppStore) private store: Store<AppState>,
              private modulService: ModulService,
              private router:ActivatedRoute,
              private _router: Router,
              private projectService: ProjectService) {
    console.log(this.router.params);
    // this.router.params.switchMap((params: Params) => {console.log(params);return null;});
    // console.log(this.projectid);
    this.modulid = '';
    this.moduls = [];
    this.selectModul = {
      id: "",
      name: "",
      principal:"",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      jurisdiction: ""
    };
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = [];
    this.getParent();
    this.store.subscribe(()=>this.updateModuls());
    // this.refresh();
  }

  ngOnInit() {

  }

  /**
   * 得到当前父节点下的所有模块信息
   */
  updateModuls(){
    const state = this.store.getState();
    this.moduls = getOneModulsEntities(state,this.projectid,this.modulid);
  }

  /**
   * 得到该模块所有附节点的id
   */
  getParent(){
    this.router.params.subscribe(params => {
      console.log(params);
      this.projectid = params.project;
      this.store.dispatch(ProjectActions.setCurrentProject(this.projectid));
      this.modulid = params.modul=='null' ? null : params.modul;
      const state = this.store.getState();
      this.project = getCurrentProject(state);
      let moduls = [];
      if(this.project){
        moduls = getOneModulsEntities(state,this.projectid,this.modulid);
        if(moduls.length){
          this.moduls = moduls;
        }else{
          this.refresh();
        }
      }else{
        this.projectService.getAllProjects((rows)=>{
          this.store.dispatch(ProjectActions.setProjects(rows));
          moduls = getOneModulsEntities(state,this.projectid,this.modulid);
          if(moduls){
            this.moduls = moduls;
          }else{
            this.refresh();
          }
        });
      }
    });
    // const state = this.store.getState();
    // this.projectid = getCurrentProId(state);
    // this.project = getCurrentProject(state);
    // this.modulid = getCurrentModId(state,this.projectid);
  }

  /**
   * 添加模块
   */
  add(event){
    this.pattern = "add";
    this.store.dispatch(ModulActions.setCurrentModul(this.projectid,''));
    this.selectModul = {
      id: "",
      name: "",
      principal:"",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      jurisdiction: ""
    }
  }

  /**
   * 确认添加模块
   * @param event
   */
  confirmAdd(event){
    event['create_time'] = new Date();
    event['modify_time'] = new Date();
    event['parent'] = parseInt(this.modulid);
    this.modulService.add(this.project['name'],event,(row)=>{
      this.pattern = 'display';
      this.refresh();
    });
  }

  /**
   * 取消添加模块
   */
  cancel(){
    this.pattern = 'display';
  }

  /**
   * 管理模块
   */
  manage(event){
    if(this.pattern!=='manage'){
      this.pattern = 'manage';
      this.selectModul = null;
      this.store.dispatch(ModulActions.setCurrentModul(this.projectid,null));
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
        operate: 'delete'
      }
    }));
    event && event.stopPropagation();
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
        this.modulService.delete(this.project['name'],this.manageIds,()=>{
          this.refresh();
          this.manageIds = [];
          this.pattern = 'display';
        });
        break;
      case 'update':
        this.modulService.update(this.project['name'],this.selectModul.id,event.data.param,() => {
          this.refresh();
        });
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
          this.store.dispatch(ModulActions.setCurrentModul(this.projectid,modul.id));
          event.stopPropagation();
        }
    }

  }

  /**
   * 更新模块基本信息
   */
  updateModul(event){
    this.popData.push(deepAssign(pop.param,{
      content:"确认保存修改的模块基本信息吗？",
      data: {
        operate: 'update',
        param: event
      }
    }));
  }

  /**
   * 从数据库获取项目刷新
   */
  refresh(){
    console.log(this.project);
    if(!this.project){
      const state = this.store.getState();
      this.project = getCurrentProject(state);
      console.log(state,this.project);
    }
    this.modulService.getModulsByProName(this.project['name'],(rows)=>{
      this.store.dispatch(ModulActions.setModuls(this.projectid,rows));
    });
  }

  /**
   * 模块每条信息的处理事件
   */
  modulEvent($event){
    let modul = null;
    switch($event.type){
      case 'delete':
        this.manageIds = $event.param;
        this.delete(null);
        break;
      case 'gotoModul':
        modul = $event.param;
        this._router.navigate(['modul',{project:this.projectid,modul: modul.id}]);
        break;
      case 'toggle':
        modul = $event.param;
        this.store.dispatch(ModulActions.setCurrentModul(this.projectid,modul.id));
        break;
    }
  }

  /**
   * 返回上一级目录
   */
  back(event){
    if(!this.modulid){
      this._router.navigate(['localPro']);
    }else{
      console.log(this.modulid);
      let parentMod = getModulById(this.store.getState(),this.projectid,this.modulid);
      this.store.dispatch(ModulActions.setCurrentModul(this.projectid,parentMod.parent));
      console.log(parentMod);
      this._router.navigate(['modul',{project:this.projectid,modul:parentMod.parent}]);
    }
  }

}
