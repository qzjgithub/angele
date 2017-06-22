import {Component, Inject} from '@angular/core';
import {AppStore} from "../control/app.store";
import {Store} from "redux";
import {AppState} from "../control/app.reducer";
import * as CommonActions from '../control/common/common.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tabs : Array<any>;
  curTab : Object;
  position : Array<String>;

  constructor(@Inject(AppStore) private store: Store<AppState>){
    this.tabs = [
      {router: 'localPro', name: '本地项目'},
      {router:'user',name:'用户管理'}
    ]
    this.curTab = this.tabs[0];
    this.position = [ 'project1', 'module1', 'interface1'];
  }

  onClick(){
    this.store.dispatch(CommonActions.addClick(true));
    setTimeout(() => this.store.dispatch(CommonActions.setClick(false)),500);
  }

  navClick(tab){
    this.curTab = tab;
  }
}


