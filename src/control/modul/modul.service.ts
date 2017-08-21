import {Injectable, Inject} from "@angular/core";
import {Modul} from "./modul.model";
import {Store} from "redux";
import {AppStore} from "../app.store";
import {AppState} from "../app.reducer";
// import {projects} from "./testData";
// import * as projectdb from "../../../db/projects";
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class ModulService{
  constructor(@Inject(AppStore) private store: Store<AppState>){}
  /**
   * 得到所有的项目信息
   * @param reject
   */
  getModulsByProName(name,reject?){
    window['moduldb'].getModulsByProName(name).then((rows)=>{
      console.log(rows);
      reject && reject(rows);
    });
  }

  /**
   * 添加项目
   * @param data
   */
  add(name,data,reject?){
    window['moduldb'].add(name,data).then((row)=>{
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
  }

  /**
   * 更新项目
   * @param id
   * @param project
   * @param reject
   */
  update(id,project,reject?){
    window['moduldb'].update(id,project).then(()=>{
      reject && reject();
    });
  }
}

export const MODUL_PROVIDERS: Array<any> = [
  { provide: ModulService, useClass: ModulService }
];
