import {Component, OnInit, Input, Inject, EventEmitter, Output} from '@angular/core';
import {Project} from "../../../control/project/project.model";


@Component({
  selector: 'app-local-pro-item',
  templateUrl: 'local-pro-item.component.html',
  styleUrls: ['local-pro-item.component.css']
})
export class LocalProItemComponent implements OnInit {

  /**
   * 当前项目
   */
  @Input()
  project: Project;

  /**
   * 确认添加项目的事件
   * @type {EventEmitter<any>}
   */
  @Output() saveBase: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  updateProject(event){
    this.saveBase.emit(event);
  }


}
