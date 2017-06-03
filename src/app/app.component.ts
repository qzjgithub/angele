import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tabs : Array<any>;
  curTab : Object;
  position : Array<String>;

  constructor(){
    this.tabs = [
      {router: 'localPro', name: '本地项目'},
      {router:'user',name:'用户管理'}
    ]
    this.curTab = this.tabs[0];
    this.position = [ 'project1', 'module1', 'interface1'];
  }

  navClick(tab){
    this.curTab = tab;
  }
}


