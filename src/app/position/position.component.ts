import {Component, OnInit, Input, Inject} from '@angular/core';
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {getPosition} from "../../control/common/common.reducer";
import {getCurrentProject} from "../../control/project/project.reducer";
import {getCurrentModul, getModulById} from "../../control/modul/modul.reducer";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  position: Array<String>

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.position = [];
    store.subscribe(() => this.updateState());
  }

  ngOnInit() {
  }
  updateState(){
    const state = this.store.getState();
    let project = getCurrentProject(state);
    this.position = [];
    if(project){
      this.position.push(project.name);
      let modul = getCurrentModul(state,project.id);
      if(modul){
        this.nestModul(project.id,modul);
      }
    }
  }

  nestModul(projectid, modul){
    if(modul.parent){
      let pm = getModulById(this.store.getState(),projectid,modul.parent);
      this.nestModul(projectid,pm);
    }
    this.position.push(modul.name);
  }

}
