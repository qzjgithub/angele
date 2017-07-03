import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import * as util from "../../../com-util";

@Component({
  selector: 'com-configinfo',
  templateUrl: 'configinfo.component.html',
  styleUrls: ['configinfo.component.css'],
  host: {
    class: 'flex',
    style: 'display:block'
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
  config: Array<any>;

  /**
   * 编辑和展示的内容
   */
  editConfig: Array<any>;

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

    this.data = {};
    this.disabled = false;
    this.pattern = 'display';
  }

  ngOnInit() {
    this.setData();
    //生成新的一份project数据，可用于编辑
    this.editConfig = Object.assign({},this.config[0]);
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
      dataType: 'TEXT'
    }
    this.param['type'] = {
      name:'port',
      data: [
        {value: 'error',text:'error'},
        {value: 'right',text:'right'},
        {value: 'request',text:'request'},
      ]
    }
    this.param['content'] = {
      name:'content'
    }
  }

  /**
   * 设置键值对数据
   */
  setData(){
    this.config.forEach((e,i) => {
      this.data[e.name] = e;
    });
  }

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
  toggleDisabled(){
    this.disabled = !this.disabled;
    util.setParamOneValue('disabled',!this.param['path']['disabled'],this.param);
  }

  /**
   * 切换输入项转换模式
   * @param pattern
   */
  togglePattern(pattern){
    this.pattern = pattern;
    util.setParamOneValue('pattern',pattern,this.param);
  }

  /**
   * 重置表单
   */
  reset(){
    this.form.reset(this.config[0]);
    this.pattern = 'display';
    this.togglePattern('display');
  }

  /**
   * 保存表单
   */
  save(){}

  /**
   * 旁边按钮的隐藏和展示
   */
  showAside(event){
    console.log(event);
    let el = event.target;
    el = el.tagName === 'I' ? el.parentElement : el ;
    let uldom = el.parentElement.lastElementChild;
    let len = uldom.children.length;
    let status = parseInt(uldom.style.height);
    uldom.style.height = ((isNaN(status) || status <=0) ? 26 * len : 0) + 'px';
  }

}
