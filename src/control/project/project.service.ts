import {Injectable} from "@angular/core";
import {Project} from "./project.model";
import {projects} from "./testData";
import * as projectdb from "../../../db/project.js";

@Injectable()
export class ProjectService{
  getAllProjects(): Project[]{
    let projects: Array<Project> = [];
    projectdb.getAllProjects().then((rows)=>{
      projects = rows;
      console.log(rows);
    });
    return projects;
  }
}

export const PROJECT_PROVIDERS: Array<any> = [
  { provide: ProjectService, useClass: ProjectService }
];

console.log(new ProjectService().getAllProjects());
