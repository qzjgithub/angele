import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import {Project} from "../../../control/project/project.model";
import * as input from '../../component/input/input.model';
import {deepAssign} from "../../../com-util";

@Component({
  selector: 'app-local-pro-item',
  templateUrl: 'local-pro-item.component.html',
  styleUrls: ['local-pro-item.component.css']
})
export class LocalProItemComponent implements OnInit {

  /**
   * 表单
   */
  form: FormGroup;

  /**
   * 当前项目
   */
  @Input()
  project: Project;

  /**
   * 编辑和展示的内容
   */
  editData: Project;

  /**
   * 表单要传入的参数
   */
  param: Object;

  constructor() {
    //实例化表单
    this.form = new FormGroup({});

    //设置表单参数
    this.getParam();
    console.log('local-pro-constructor over');
  }

  ngOnInit() {
    //生成新的一份project数据，可用于编辑
    this.editData = Object.assign({},this.project);
    this.setValue();
    console.log('local-pro oninit over');
  }

  /**
   * 接受表单元件返回的control，并放入当前form中
   * @param event
   * @param name
   */
  getControl(event:AbstractControl, name:string){
    this.form.addControl(name,event);
  }
  getParam(){
    this.param = {};
    this.param['path'] = {
      name:'path',
      dataType: 'path'
    }
    this.param['port'] = {
      name:'port',
      dataType: 'number'
    }
    this.param['limit'] = {
      name:'limit',
    }
    this.param['create_user'] = {
      name:'create_user',
      data: [{text:'user1',value:1},{text:'user2',value:2}]
    }
    this.param['principal'] = {
      name:'principal',
    }
    this.param['comment'] = {
      name:'comment',
    }

  }

  setValue(){
    this.setParamByKey('path',{value: this.editData['path']});
  }

  toggle(){
    this.setParamOneValue('disabled',!this.param['path']['disabled']);
  }
  setUrlParam(pattern){
    this.setParamOneValue('pattern',pattern.value);
  }

  setParamOneValue(valueKey,value){
    let keys = Object.keys(this.param);
    keys.forEach((v, i) => {
      this.setParamByKey(v,{[valueKey]:value});
    })
  }

  setParamByKey(key, data){
    this.param[key] = deepAssign(this.param[key],data);
  }

}
