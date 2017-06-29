import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import {Project} from "../../../control/project/project.model";
import * as util from "../../../com-util";

@Component({
  selector: 'com-baseinfo',
  templateUrl: 'baseinfo.component.html',
  styleUrls: ['baseinfo.component.css']
})
export class BaseinfoComponent implements OnInit {

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

  /**
   * 当前表单的状态
   */
  disabled: boolean;

  /**
   * 当前表单的模式
   */
  pattern: string;

  constructor() {
    //实例化表单
    this.form = new FormGroup({});

    //设置表单参数
    this.setParam();

    this.disabled = false;
    this.pattern = 'display';
  }

  ngOnInit() {
    //生成新的一份project数据，可用于编辑
    this.editData = Object.assign({},this.project);
    util.setValue(this.editData, this.param);
    util.setParamOneValue('pattern',this.pattern,this.param);
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

  /**
   * 设置表单输入项参数
   */
  setParam(){
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
      data: [{text:'user1',value:'1'},{text:'user2',value:'2'}]
    }
    this.param['principal'] = {
      name:'principal',
      data : [{text:'user1',value:'1'},{text:'user2',value:'2'}]
    }
    this.param['comment'] = {
      name:'comment',
    }
  }

  /**
   * 切换输入项禁用状态
   */
  toggleDisabled(){
    this.disabled = !this.disabled;
    util.setParamOneValue('disabled',!this.param['path']['disabled'],this.param);
  }

  /**
   * 切换输入项转换模式
   * @param pattern
   */
  togglePattern(pattern){
    util.setParamOneValue('pattern',pattern,this.param);
  }
}
