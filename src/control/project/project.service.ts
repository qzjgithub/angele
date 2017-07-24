import {Injectable} from "@angular/core";
import {Project} from "./project.model";
// import {projects} from "./testData";
// import * as projectdb from "../../../db/projects";
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class ProjectService{
  /**
   * 得到所有的项目信息
   * @param reject
   */
  getAllProjects(reject?){
    window['projectdb'].getAllProjects().then((rows)=>{
      console.log(rows);
      reject && reject(rows);
    });
  }

  /**
   * 添加项目
   * @param data
   */
  add(data,reject?){
    window['projectdb'].add(data).then((row)=>{
      console.log(row);
      reject && reject(row);
    });
  }

  /**
   * 删除项目，批量删除
   * @param ids
   * @param reject
   */
  delete(ids,reject?){
    window['projectdb'].delete(ids).then(()=>{
      reject && reject();
    });
  }
}

export const PROJECT_PROVIDERS: Array<any> = [
  { provide: ProjectService, useClass: ProjectService }
];
