import {Injectable, Inject} from "@angular/core";
import {Store} from "redux";
import {AppStore} from "../app.store";
import {AppState} from "../app.reducer";
// import {projects} from "./testData";
// import * as projectdb from "../../../db/projects";
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class IntdataService{
  constructor(@Inject(AppStore) private store: Store<AppState>){}
  /**
   * 得到所有的模拟数据信息
   * @param reject
   */
  getIntdatasByProName(name,reject?){
    window['intdatadb'].getIntdatasByProName(name).then((rows)=>{
      console.log(rows);
      reject && reject(rows);
    });
  }

  /**
   * 添加模拟数据
   * @param data
   */
  add(name,data,reject?){
    window['intdatadb'].add(name,data).then((row)=>{
      if(data.type==='file'){
        console.log('上传文件');
      }
      reject && reject(row);
    });
  }

  /**
   * 删除模拟数据，批量删除
   * @param ids
   * @param reject
   */
  delete(name,ids,reject?){
    const state = this.store.getState();
    window['intdatadb'].delete(name,ids).then(()=>{
      reject && reject();
    });
  }

  /**
   * 更新模拟数据
   * @param id
   * @param project
   * @param reject
   */
  update(name,id,intdata,reject?){
    window['intdatadb'].update(name,id,intdata).then(()=>{
      if(intdata.type==='file'){
        console.log('上传文件');
      }
      reject && reject();
    });
  }

  /**
   * 上传文件
   */
  uploadFile(name,intdata){

  }
}

export const INTDATA_PROVIDERS: Array<any> = [
  { provide: IntdataService, useClass: IntdataService }
];
