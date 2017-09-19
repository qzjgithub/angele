import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import * as util from "../../../com-util";

@Component({
  selector: 'intdata-baseinfo',
  templateUrl: 'intdata-baseinfo.component.html',
  styleUrls: ['intdata-baseinfo.component.css']
})
export class IntdataBaseinfoComponent implements OnInit {

  /**
   * 表单
   */
  form: FormGroup;

  /**
   * 当前项目
   */
  @Input()
  intdata: Object;

  /**
   * 取消添加传送给父元素
   * @type {EventEmitter<any>}
   */
  @Output() cancelAdd: EventEmitter<any> = new EventEmitter<any>();

  /**
   * 确认添加项目的事件
   * @type {EventEmitter<any>}
   */
  @Output() confirmSave: EventEmitter<any> = new EventEmitter<any>();

  /**
   * 编辑和展示的内容
   */
  editData: Object;

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
    //如果没有id，表明是添加模式
    if(!this.intdata['id']){
      this.pattern = 'add';
    }
    //生成新的一份project数据，可用于编辑
    this.editData = Object.assign({},this.intdata);
    util.setValue(this.editData, this.param);
    util.setParamOneValue('pattern',this.pattern,this.param);
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
    this.param['name'] = {
      name:'name',
      type: 'input'
    }
    this.param['type'] = {
      name:'type',
      type: 'select',
      data: [{text:'文本',value:"text"},{text:'文件',value:"file"}],
      value: 'text'
    }
    this.param['code'] = {
      name:'code',
      dataType: 'TEXT',
      type: 'input'
    }
    this.param['file'] = {
      name:'file',
      type: 'file'
    }
    this.param['content'] = {
      name:'content',
      dataType: 'TEXT',
      type: 'textarea'
    }
    this.param['status'] = {
      name:'status',
      data: [{text:'启用',value:true},{text:'禁用',value:false}],
      type: 'select',
      value: false
    }
    this.param['comment'] = {
      name:'comment',
      required: false,
      type: 'textarea'
    }
    util.setParam(this.param);
  }

  /**
   * 切换输入项禁用状态
   */
  toggleDisabled(event){
    this.disabled = !this.disabled;
    util.setParamOneValue('disabled',this.disabled,this.param);
    event.stopPropagation();
  }

  /**
   * 切换输入项转换模式
   * @param pattern
   */
  togglePattern(event,pattern){
    this.pattern = pattern;
    util.setParamOneValue('pattern',pattern,this.param);
    event && event.stopPropagation();
  }

  /**
   * 重置表单
   */
  reset(event){
    this.form.reset(this.intdata);
    this.pattern = 'display';
    this.togglePattern(null,this.pattern);
    event.stopPropagation();
  }

  /**
   * 保存表单
   */
  save(event){
    if(this.form.valid){
      this.confirmSave.emit(this.form.value);
    }
    event.stopPropagation();
  }
  /**
   * 清空表单
   * @param event
   */
  clear(event){
    this.form.reset({
      id: "",
      name: "",
      create_time: new Date(),
      modify_time: new Date(),
      type:"",
      content:"",
      status:false,
      comment: "",
      parent:""
    });
    event.stopPropagation();
  }

  /**
   * 取消本次添加
   */
  cancel(event){
    this.cancelAdd.emit();
    this.clear(event);
  }

}
