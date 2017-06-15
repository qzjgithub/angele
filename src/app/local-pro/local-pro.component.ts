import {Component, OnInit, Inject} from '@angular/core';
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {Project} from "../../control/project/project.model";
import {getAllProjects} from "../../control/project/project.reducer";
import {ProjectService} from "../../control/project/project.service";
import * as ProjectActions from '../../control/project/project.action';

@Component({
  selector: 'app-local-pro',
  templateUrl: './local-pro.component.html',
  styleUrls: ['./local-pro.component.css']
})
export class LocalProComponent implements OnInit {

  projects: Project[];


  constructor(@Inject(AppStore) private store: Store<AppState>
  ,private projectService: ProjectService) {
    store.subscribe(() => this.updateState());
    store.dispatch(ProjectActions.setProjects(projectService.getProjects()));
    this.updateState();
  }

  updateState() {
    const state = this.store.getState();
    this.projects = getAllProjects(state);
  }

  ngOnInit() {
  }

}
