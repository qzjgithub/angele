import {Injectable} from "@angular/core";
import {Project} from "./project.model";
import {projects} from "./testData";

@Injectable()
export class ProjectService{
  getProjects(): Project[]{
    return projects;
  }
}

export const PROJECT_PROVIDERS: Array<any> = [
  { provide: ProjectService, useClass: ProjectService }
];
