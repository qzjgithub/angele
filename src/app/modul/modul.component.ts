import {Component, OnInit, Input} from '@angular/core';
import {Project} from "../../control/project/project.model";

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {

  /**
   * 所属项目
   */
  @Input()
  project: Project;



  constructor() { }

  ngOnInit() {
  }

}
