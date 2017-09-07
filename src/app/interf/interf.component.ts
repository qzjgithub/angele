import {Component, OnInit, Inject} from '@angular/core';
import {Project} from "../../control/project/project.model";
import {Interf} from "../../control/interf/interf.model";
import {AppStore} from "../../control/app.store";
import {Store} from "redux";
import {AppState} from "../../control/app.reducer";
import {ModulService} from "../../control/modul/modul.service";
import {InterfService} from "../../control/interf/interf.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../control/project/project.service";
import {getOneInterfsEntities} from "../../control/interf/interf.reducer";
import * as ProjectActions from '../../control/project/project.action';
import {getCurrentProject} from "../../control/project/project.reducer";
import * as ModulActions from '../../control/modul/modul.action';
import * as InterfActions from '../../control/interf/interf.action';
import * as pop from '../component/pop/pop.model';
import {deepAssign} from "../../com-util";
import {getModulById} from "../../control/modul/modul.reducer";

@Component({
  selector: 'app-interf',
  templateUrl: './interf.component.html',
  styleUrls: ['./interf.component.css']
})
export class InterfComponent implements OnInit {

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
   * 所有接口
   */
  interfs: Interf[];

  /**
   * 被选中的接口
   */
  selectInterf: Interf;

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
              private interfService: InterfService,
              private router: ActivatedRoute,
              private _router: Router,
              private projectService: ProjectService) {
    console.log(this.router.params);
    // this.router.params.switchMap((params: Params) => {console.log(params);return null;});
    // console.log(this.projectid);
    this.modulid = '';
    this.interfs = [];
    this.selectInterf= {
      id: "",
      method: "",
      principal:"",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      full_path:"",
      jurisdiction: ""
    };
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = [];
    this.getParent();
    this.store.subscribe(()=>this.updateInterfs());
  }

  ngOnInit() {
  }

  /**
   * 得到当前父节点下的所有模块信息
   */
  updateInterfs(){
    const state = this.store.getState();
    this.interfs = getOneInterfsEntities(state,this.projectid,this.modulid);
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
      this.store.dispatch(ProjectActions.setCurrentProject(this.projectid));
      const state = this.store.getState();
      this.project = getCurrentProject(state);
      let interfs = [];
      if(this.project){
        interfs = getOneInterfsEntities(state,this.projectid,this.modulid);
        if(interfs.length){
          this.interfs = interfs;
        }else{
          this.refresh();
        }
      }else{
        this.projectService.getAllProjects((rows)=>{
          this.store.dispatch(ProjectActions.setProjects(rows));
          interfs = getOneInterfsEntities(state,this.projectid,this.modulid);
          if(interfs){
            this.interfs = interfs;
          }else{
            this.refresh();
          }
        });
      }
    });
  }

  /**
   * 添加模块
   */
  add(event){
    this.pattern = "add";
    this.store.dispatch(InterfActions.setCurrentInterf(this.projectid,''));
    this.selectInterf = {
      id: "",
      method: "",
      principal:"",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      full_path:"",
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
    this.interfService.add(this.project['name'],event,(row)=>{
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
      this.selectInterf = null;
      this.store.dispatch(InterfActions.setCurrentInterf(this.projectid,null));
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
      content:"确认删除选中的接口吗？",
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
        this.interfService.delete(this.project['name'],this.manageIds,()=>{
          this.refresh();
          this.manageIds = [];
          this.pattern = 'display';
        });
        break;
      case 'update':
        this.interfService.update(this.project['name'],this.selectInterf.id,event.data.param,() => {
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
  clickModul(event, interf){
    switch(this.pattern){
      case 'manage':
        let index = this.manageIds.indexOf(interf.id);
        if(index > -1){
          this.manageIds.splice(index,1);
        }else{
          this.manageIds.push(interf.id);
        }
        break;
      case 'add':
      case 'display':
        if(!this.selectInterf || interf.id!==this.selectInterf.id){
          this.selectInterf = interf;
          this.store.dispatch(InterfActions.setCurrentInterf(this.projectid,interf.id));
          event.stopPropagation();
        }
    }

  }

  /**
   * 更新模块基本信息
   */
  updateModul(event){
    this.popData.push(deepAssign(pop.param,{
      content:"确认保存修改的接口基本信息吗？",
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
    this.interfService.getInterfsByProName(this.project['name'],(rows)=>{
      this.store.dispatch(InterfActions.setInterfs(this.projectid,rows));
    });
  }

  /**
   * 模块每条信息的处理事件
   */
  interfEvent($event){
    let interf = null;
    switch($event.type){
      case 'delete':
        this.manageIds = $event.param;
        this.delete(null);
        break;
      case 'toggle':
        interf = $event.param;
        this.store.dispatch(InterfActions.setCurrentInterf(this.projectid,interf.id));
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
