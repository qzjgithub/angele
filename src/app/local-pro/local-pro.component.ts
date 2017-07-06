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
   * 是否处于添加中
   */
  addStatus: boolean;

  constructor(@Inject(AppStore) private store: Store<AppState>
  ,private projectService: ProjectService) {
    store.subscribe(() => this.updateState());
    store.dispatch(ProjectActions.setProjects(projectService.getProjects()));
    this.updateState();
    this.selectProject = null;
    this.addStatus = false;
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
    if(!this.selectProject || project.name!==this.selectProject.name){
      this.selectProject = project;
      this.store.dispatch(CommonActions.resetPosition([this.selectProject.name]));
      event.stopPropagation();
    }
  }

  /**
   * 添加事件
   * @param event
   */
  add(event){
    this.addStatus = true;
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
    this.addStatus = false;
  }

}
