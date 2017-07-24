import {Component, OnInit, Inject} from '@angular/core';
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {Project} from "../../control/project/project.model";
import {getAllProjects} from "../../control/project/project.reducer";
import {ProjectService} from "../../control/project/project.service";
import * as ProjectActions from '../../control/project/project.action';
import * as pop from '../component/pop/pop.model';
import {deepAssign} from "../../com-util";

@Component({
  selector: 'app-local-pro',
  templateUrl: './local-pro.component.html',
  styleUrls: ['./local-pro.component.css']
})
export class LocalProComponent implements OnInit {

  /**
   * 所有项目
   */
  projects: Project[];

  /**
   * 被选中的项目
   */
  selectProject: Project;

  /**
   * 当前模式
   */
  pattern: string;

  /**
   * 被选中要管理的project
   */
  manageIds: Array<string>;

  /**
   * 弹框数组
   */
  popData: Array<Object>;

  constructor(@Inject(AppStore) private store: Store<AppState>
  ,private projectService: ProjectService) {
    this.projects = [];
    store.subscribe(() => this.updateState());
    this.refresh();
    // this.updateState();
    this.selectProject = null;
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = [];
  }

  /**
   * 获取所有项目
   */
  updateState() {
    const state = this.store.getState();
    this.projects = getAllProjects(state);
  }

  /**
   * 从数据库获取项目刷新
   */
  refresh(){
    this.projectService.getAllProjects((rows)=>{
      this.store.dispatch(ProjectActions.setProjects(rows));
    });
  }

  ngOnInit() {
  }

  /**
   * 选中某个项目的事件
   * @param event
   * @param project
   */
  clickProject(event, project){
    switch(this.pattern){
      case 'manage':
        let index = this.manageIds.indexOf(project.id);
        if(index > -1){
          this.manageIds.splice(index,1);
        }else{
          this.manageIds.push(project.id);
        }
        break;
      case 'add':
      case 'display':
        if(!this.selectProject || project.name!==this.selectProject.name){
          this.selectProject = project;
          this.store.dispatch(ProjectActions.setCurrentProject(this.selectProject['id']));
          event.stopPropagation();
        }
    }

  }

  /**
   * 添加事件
   * @param event
   */
  add(event){
    this.pattern = 'add';
    this.store.dispatch(ProjectActions.setCurrentProject(null));
    this.selectProject = {
      id: "",
      name: "",
      principal: "",
      create_user: "",
      create_time: new Date(),
      modify_time: new Date(),
      comment: "",
      path: "",
      port: undefined,
      status: "",
      jurisdiction: "",
    }
  }

  confirmAdd(event){
    event['create_time'] = new Date();
    event['modify_time'] = new Date();
    this.projectService.add(event,(row)=>{
      this.pattern = 'display';
      this.refresh();
    });
  }
  /**
   * 取消添加事件
   */
  cancel(){
    this.pattern = 'display';
  }

  /**
   * 管理项目
   */
  manage(event){
    if(this.pattern!=='manage'){
      this.pattern = 'manage';
      this.selectProject = null;
      this.store.dispatch(ProjectActions.setCurrentProject(null));
      // this.store.dispatch(ProjectActions.setDisabled(true));
    }else{
      this.pattern = 'display';
      this.manageIds = [];
      // this.store.dispatch(ProjectActions.setDisabled(false));
    }
    event.stopPropagation();
  }

  /**
   * 删除项目
   */
  delete(event){
    this.popData.push(deepAssign(pop.param,{
      content:"确认删除选中的项目吗？",
      data: {
        operate: 'delete',
        param: this.manageIds
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
        this.projectService.delete(event.data.param,()=>{
          this.projectService.getAllProjects((rows)=>{
            this.store.dispatch(ProjectActions.setProjects(rows));
          });
        });
      case 'cancel':
      case 'close':
      default:
        this.popData.pop();
    }
  }

}
