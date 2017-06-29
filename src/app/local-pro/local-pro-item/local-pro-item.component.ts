import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import {Project} from "../../../control/project/project.model";
import {deepAssign} from "../../../com-util";

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
