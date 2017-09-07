import {Injectable, Inject} from "@angular/core";
import {Interf} from "./interf.model";
import {Store} from "redux";
import {AppStore} from "../app.store";
import {AppState} from "../app.reducer";
// import {projects} from "./testData";
// import * as projectdb from "../../../db/projects";
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class InterfService{
  constructor(@Inject(AppStore) private store: Store<AppState>){}
  /**
   * 得到所有的项目信息
   * @param reject
   */
  getInterfsByProName(name,reject?){
    window['interfdb'].getInterfsByProName(name).then((rows)=>{
      console.log(rows);
      reject && reject(rows);
    });
  }

  /**
   * 添加项目
   * @param data
   */
  add(name,data,reject?){
    window['interfdb'].add(name,data).then((row)=>{
      console.log(row);
      reject && reject(row);
    });
  }

  /**
   * 删除项目，批量删除
   * @param ids
   * @param reject
   */
  delete(name,ids,reject?){
    const state = this.store.getState();
    window['interfdb'].delete(name,ids).then(()=>{
      reject && reject();
    });
  }

  /**
   * 更新项目
   * @param id
   * @param project
   * @param reject
   */
  update(name,id,interf,reject?){
    window['interfdb'].update(name,id,interf).then(()=>{
      reject && reject();
    });
  }
}

export const INTERF_PROVIDERS: Array<any> = [
  { provide: InterfService, useClass: InterfService }
];
