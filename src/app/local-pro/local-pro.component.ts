import {Component, OnInit, Inject} from '@angular/core';
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {Project} from "../../control/project/project.model";
import {getAllProjects} from "../../control/project/project.reducer";
import {ProjectService} from "../../control/project/project.service";
import * as ProjectActions from '../../control/project/project.action';
import * as CommonActions from '../../control/common/common.action';

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

  popData: Object;

  constructor(@Inject(AppStore) private store: Store<AppState>
  ,private projectService: ProjectService) {
    store.subscribe(() => this.updateState());
    store.dispatch(ProjectActions.setProjects(projectService.getProjects()));
    this.updateState();
    this.selectProject = null;
    this.pattern = 'display';
    this.manageIds = [];
    this.popData = {
      title: '提示',
      content: '确认删除吗？',
      button:[
        {key:'cancel',text:'取消'},
        {key:'confirm',text:'确认'}
      ]
    }
  }

  /**
   * 获取所有项目
   */
  updateState() {
    const state = this.store.getState();
    this.projects = getAllProjects(state);
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
      limit: "",
    }
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

}
