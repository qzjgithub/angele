import {Component, OnInit, Inject} from '@angular/core';
import {Project} from "../../control/project/project.model";
import {Intdata} from "../../control/intdata/intdata.model";
import {AppStore} from "../../control/app.store";
import {Store} from "redux";
import {AppState} from "../../control/app.reducer";
import {IntdataService} from "../../control/intdata/intdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../control/project/project.service";
import {getOneIntdatasEntities} from "../../control/intdata/intdata.reducer";
import * as ProjectActions from '../../control/project/project.action';
import {getCurrentProject} from "../../control/project/project.reducer";
import * as ModulActions from '../../control/modul/modul.action';
import * as InterfActions from '../../control/interf/interf.action';
import * as IntdataActions from '../../control/intdata/intdata.action';
import * as pop from '../component/pop/pop.model';
import {deepAssign} from "../../com-util";
import {InterfService} from "../../control/interf/interf.service";
import {getInterfById} from "../../control/interf/interf.reducer";

@Component({
  selector: 'app-intdata',
  templateUrl: './intdata.component.html',
  styleUrls: ['./intdata.component.css']
})
export class IntdataComponent implements OnInit {

  /**
   * 所属项目id
   */
  projectid:string;

  /**
   * 所属项目
   */
  project:Project;

  /**
   * 所属接口id
   */
  interfid:string;

  /**
   * 所有接口
   */
  intdatas: Intdata[];

  /**
   * 被选中的接口
   */
  selectIntdata: Intdata;

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

  /**
   * 父节点组成的路径
   */
  // parentPath: Array<string>;

  constructor(@Inject(AppStore) private store: Store<AppState>,
              private router: ActivatedRoute,
              private _router: Router,
              private intdataService: IntdataService,
              private interfService: InterfService,
              private projectService: ProjectService) {
    console.log(this.router.params);
    // this.router.params.switchMap((params: Params) => {console.log(params);return null;});
    // console.log(this.projectid);
    this.interfid = '';
    this.intdatas = [];
    this.selectIntdata= {
      id: "",
      name: "",
      create_time: new Date(),
      modify_time: new Date(),
      type:"",
      code:200,
      content:"",
      status:false,
      comment: "",
      parent: this.interfid
    };
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = [];
    // this.parentPath = [];
    this.getParent();
    this.store.subscribe(()=>this.updateIntdatas());
  }

  ngOnInit() {
  }

  /**
   * 得到当前父节点下的所有模块信息
   */
  updateIntdatas(){
    const state = this.store.getState();
    this.intdatas = getOneIntdatasEntities(state,this.projectid,this.interfid);
    this.intdatas.forEach((e) => {
      if(e.type === 'file'){
        e['file'] = e.content;
      }
    })
  }

  /**
   * 得到该模块所有附节点的id
   */
  getParent(){
    this.router.params.subscribe(params => {
      console.log(params);
      this.projectid = params.project;
      this.interfid = params.interf=='null' ? null : params.interf;
      this.store.dispatch(ProjectActions.setCurrentProject(this.projectid));
      this.project = getCurrentProject(this.store.getState());
      let intdatas = [];
      if(this.project){
        intdatas = getOneIntdatasEntities(this.store.getState(),this.projectid,this.interfid);
        if(intdatas.length){
          this.intdatas = intdatas;
        }else{
          this.refresh();
        }
      }else{
        this.projectService.getAllProjects((rows)=>{
          this.store.dispatch(ProjectActions.setProjects(rows));
          this.project = getCurrentProject(this.store.getState());
          intdatas = getOneIntdatasEntities(this.store.getState(),this.projectid,this.interfid);
          if(intdatas.length){
            this.intdatas = intdatas;
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
    this.store.dispatch(IntdataActions.setCurrentIntdata(this.projectid,''));
    this.selectIntdata = {
      id: "",
      name: "",
      create_time: new Date(),
      modify_time: new Date(),
      type:"",
      code:null,
      content:"",
      status:false,
      comment: "",
      parent: this.interfid
    }
  }

  /**
   * 确认添加模块
   * @param event
   */
  confirmAdd(event){
    event['create_time'] = new Date();
    event['modify_time'] = new Date();
    event['parent'] = parseInt(this.interfid);
    if(event.type === 'file'){
      event.content = event.file;
    }
    this.intdataService.add(this.project['name'],event,(row)=>{
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
      this.selectIntdata = null;
      this.store.dispatch(IntdataActions.setCurrentIntdata(this.projectid,null));
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
        this.intdataService.delete(this.project['name'],this.manageIds,()=>{
          this.refresh();
          this.manageIds = [];
          this.pattern = 'display';
        });
        break;
      case 'update':
        let intdata = event.data.param;
        intdata['parent'] = parseInt(this.interfid);
        this.intdataService.update(this.project['name'],this.selectIntdata.id,event.data.param,() => {
          this.refresh();
        });
        break;
    }
  }

  /**
   * 选中某个模拟数据的事件
   * @param event
   * @param project
   */
  clickIntdata(event, intdata){
    switch(this.pattern){
      case 'manage':
        let index = this.manageIds.indexOf(intdata.id);
        if(index > -1){
          this.manageIds.splice(index,1);
        }else{
          this.manageIds.push(intdata.id);
        }
        break;
      case 'add':
      case 'display':
        if(!this.selectIntdata || intdata.id!==this.selectIntdata.id){
          this.selectIntdata = intdata;
          this.store.dispatch(IntdataActions.setCurrentIntdata(this.projectid,intdata.id));
          event.stopPropagation();
        }
    }

  }

  /**
   * 更新模块基本信息
   */
  updateIntdata(event){
    if(event.type === 'file'){
      event.content = event.file;
    }
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
    this.intdataService.getIntdatasByProName(this.project['name'],(rows)=>{
      this.store.dispatch(IntdataActions.setIntdatas(this.projectid,rows));
    });
  }

  /**
   * 模块每条信息的处理事件
   */
  intdataEvent($event){
    let intdata = null;
    switch($event.type){
      case 'delete':
        this.manageIds = $event.param;
        this.delete(null);
        break;
      case 'toggle':
        intdata = $event.param;
        this.store.dispatch(IntdataActions.setCurrentIntdata(this.projectid,intdata.id));
        break;
    }
  }

  /**
   * 返回上一级目录
   */
  back(event){
    console.log(this.interfid);
    let parentInt = getInterfById(this.store.getState(),this.projectid,this.interfid);
    if(!parentInt){
      this.interfService.getInterfsByProName(this.project.name, (rows)=>{
        this.store.dispatch(InterfActions.setInterfs(this.projectid,rows));
        let parentInt = getInterfById(this.store.getState(),this.projectid,this.interfid);
        this.store.dispatch(ModulActions.setCurrentModul(this.projectid,parentInt.parent));
        console.log(parentInt);
        this._router.navigate(['interf',{project:this.projectid,modul:parentInt.parent}]);
      });
    }else{
      this.store.dispatch(ModulActions.setCurrentModul(this.projectid,parentInt.parent));
      console.log(parentInt);
      this._router.navigate(['interf',{project:this.projectid,modul:parentInt.parent}]);
    }
  }

}
