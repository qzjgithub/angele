import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import * as util from "../../../com-util";
import {Config} from "../../../control/config/config.model";

@Component({
  selector: 'com-configinfo',
  templateUrl: 'configinfo.component.html',
  styleUrls: ['configinfo.component.css'],
  host: {
    style: 'display:block;width:50%;'
  }
})
export class ConfiginfoComponent implements OnInit {

  /**
   * 表单
   */
  form: FormGroup;

  /**
   * 当前项目配置列表
   */
  @Input()
  config: Array<Config>;

  /**
   * 编辑和展示的内容
   */
  editConfig: Config;

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

  /**
   * 键值对数据
   */
  data: Object;

  constructor() {
    //实例化表单
    this.form = new FormGroup({});

    //设置表单参数
    this.setParam();

    this.config = [];
    this.editConfig = {id:'',name:'',type:'',content:''};
    this.data = {};
    this.disabled = false;
    this.pattern = 'display';
  }

  ngOnInit() {
    this.setData();
    //生成新的一份project数据，可用于编辑
    this.editConfig = this.config.length ? Object.assign({}, this.config[0]):{id:'',name:'',type:'',content:''};
    util.setParamByKey('name',{data: this.getNameSelectData()},this.param);
    util.setValue(this.editConfig, this.param);
    util.setParamOneValue('pattern',this.pattern,this.param);
    console.log('configinfo oninit over');
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
      dataType: 'TEXT',
      norepeat: true,
      type: 'select'
    }
    this.param['type'] = {
      name:'type',
      data: [
        {value: 'error',text:'error'},
        {value: 'right',text:'right'},
        {value: 'request',text:'request'},
      ],
      placeholder: '请选择配置类型',
      type: 'select'
    }
    this.param['content'] = {
      name:'content',
      type: 'textarea'
    }
    util.setParam(this.param);
  }

  /**
   * 设置键值对数据
   */
  setData(){
    this.config.forEach((e,i) => {
      this.data[e.name] = e;
    });
  }

  /**
   * 设置配置项的名称选项
   * @returns {Array}
   */
  getNameSelectData(){
    let arr = [];
    this.config.forEach((e,i) => {
      arr.push({value:e.name,text:e.name});
    });
    return arr;
  }

  /**
   * 切换输入项禁用状态
   */
  toggleDisabled(event){
    this.disabled = !this.disabled;
    util.setParamOneValue('disabled',this.disabled,this.param);
    util.setParamByKey('name',{disabled: false},this.param);
    event.stopPropagation();
  }

  /**
   * 切换输入项转换模式
   * @param pattern
   */
  togglePattern(event,pattern){
    this.pattern = pattern;
    util.setParamOneValue('pattern',pattern,this.param);
    this.pattern==='edit' && util.setParamByKey('name',{ editable: true },this.param);
    event && event.stopPropagation();
  }

  /**
   * 重置表单
   */
  reset(event){
    this.togglePattern(null,this.pattern);
    // this.editConfig = this.data[this.editConfig.name];
    this.form.reset(this.editConfig);
    this.param['name']['editable'] && util.setParamByKey('name',{ editable: false },this.param);
    this.pattern = 'display';
    event.stopPropagation();
  }

  /**
   * 保存表单
   */
  save(event){
    event.stopPropagation();
  }

  /**
   * 添加配置项
   */
  add(event){
    this.pattern = 'add';
    util.setParamByKey('name',{ editable: true ,pattern:'edit'},this.param);
    util.setParamByKey('type',{ pattern:'edit'},this.param);
    util.setParamByKey('content',{ pattern:'edit'},this.param);
    this.form.reset({id:'',name:'',type:'',content:''});
    event.stopPropagation();
  }

  /**
   * 清空数据
   */
  clear(event){
    this.form.reset({id:'',name:'',type:'',content:''});
    event.stopPropagation();
  }

  /**
   * 选中某条配置项就展示那一条的数据
   * @param event
   */
  setDataByName(event){
    this.editConfig = this.data[event.value];
    util.setValue(this.editConfig,this.param);
  }

  /**
   * 旁边按钮的隐藏和展示
   * 已废弃，改用css实现
   */
  /*showAside(event){
    console.log(event);
    let el = event.target;
    el = el.tagName === 'I' ? el.parentElement : el ;
    let uldom = el.parentElement.lastElementChild;
    let len = uldom.children.length;
    let status = parseInt(uldom.style.height);
    uldom.style.height = ((isNaN(status) || status <=0) ? 26 * len : 0) + 'px';
  }*/

}
