import {Component, OnInit, Input, Inject} from '@angular/core';
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

  constructor() {
  }

  ngOnInit() {
  }

}
