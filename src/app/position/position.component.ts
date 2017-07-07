import {Component, OnInit, Input, Inject} from '@angular/core';
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {getPosition} from "../../control/common/common.reducer";
import {getCurrentProject} from "../../control/project/project.reducer";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  position: Array<String>

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
  }

  ngOnInit() {
  }
  updateState(){
    const state = this.store.getState();
    let project = getCurrentProject(state);
    this.position = [project ? project.name : ''];
  }

}
