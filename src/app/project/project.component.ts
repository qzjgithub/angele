import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // @Input()
  project : Object;

  // @Input()
  tips: Array<any>;



  state: String;//fold,unfold,redact

  constructor() {
    this.state = 'fold';
    this.project = {name:'project1',modify:'20170602',url:'project1',description:'asdfasdfasdf as;dfj;asd ;awejf[saidjf fj ;dfj adj'}
    this.tips = [
      {key:'modify',name:'修改时间'},
      {key:'url',name:'默认路径',value:'/project1/test'}
    ]
  }

  ngOnInit() {
  }

}
