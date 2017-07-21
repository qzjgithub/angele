import {Injectable} from "@angular/core";
import {Project} from "./project.model";
// import {projects} from "./testData";
// import * as projectdb from "../../../db/projects";
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class ProjectService{
  getAllProjects(): Project[]{
    let projects: Array<Project> = [];
    window['projectdb'].getAllProjects().then((rows)=>{
      console.log(rows);
    });
    /*projectdb.getAllProjects().then((rows)=>{
      projects = [];
      console.log(typeof rows,rows);
    });*/
    return projects;
  }

  add(data){
    window['projectdb'].add(data);
  }
}

export const PROJECT_PROVIDERS: Array<any> = [
  { provide: ProjectService, useClass: ProjectService }
];

console.log(new ProjectService().getAllProjects());
