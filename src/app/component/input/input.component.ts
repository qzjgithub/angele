import { Component, OnInit } from '@angular/core';
import { deepAssign } from '../../../com-util';
import {FormControl, AbstractControl, Validators} from "@angular/forms";

@Component({
  selector: 'com-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})
export class InputComponent implements OnInit {

  /**
   * 需要传入的参数
   */
  param : Object;
  /**
   * 当前的formControl
   */
  control: AbstractControl;
  /**
   * 验证错误信息
   */
  validMsg:Object;

  constructor() {
    this.param = deepAssign({
      /**
       * 次输入框的名字，唯一标识，获取value时value的名字，传入后台的数据名字
       * 默认'value'
       */
      name:'value',
      /**
       * 是否可以为空
       * true表示不可为空,如果要自定义提示消息，可直接传入字符串
       * 默认为true
       */
      required: true,
      /**
       * 检查数据长度，如1-128
       * 默认无不存在，不限制长度
       */
      // length:'',
      /**
       * 要填写数据的格式类型
       * IP,EMAIL,NUMBER,TEXT(普通文本)...
       * 默认为TEXT
       * 可写{type:'TEXT',msg:'自定义提示信息'}的形式来重写提示信息
       */
      dataType: 'TEXT',
      /**
       * 添加额外的正则验证
       * 在dataType验证成功之后才做验证
       * 默认不存在
       * 逐条验证，reg是验证正则，msg是验证出错的提示信息
       *
       * reg也可以接收一个方法，返回true表示成功，返回false表示验证失败
       * 方法由本组件调用，内部传入输入框值function(value)
       *
       * reg可接受一个请求路径，默认以json格式传入{value:value}
       * 返回json{result:true}表示验证通过，返回json{result:false}表示验证失败
       */
      //regular: [{reg:/^\S$/,msg:''}]，
      /**
       * 是否是密码框
       * false表示不是
       * 默认false
       */
      password: false,
      /**
       * 定义在输入框右边框内的小图标，按数组顺序依次显示
       * 默认不存在
       * 提供几种默认样式"SELECT","EYE"等
       * 也可自定义class
       * 字符串表示class或种类，对象加入event字段表示是否启用默认样式的默认事件
       */
      // icon:['SELECT',{class:'EYE',event:true},'common'],
      /**
       * 加在com-input元素下第一个子元素的class
       * 提供用户自定义样式的入口
       * 默认不存在
       */
      // class:'',
      /**
       * 未输入内容时的提示消息
       */
      placeholder:''
    },this.param);
    this.control = new FormControl(this.param['name']);
    this.control.setValidators(this.setValidator());
  }

  ngOnInit() {
  }

  setValidator(){
    let validator = [];
    validator = [...validator,...this.setRequiredValidator()];
    return validator;
  }

  setRequiredValidator(){
    let required = this.param['required'];
    let validator = [];
    if(required){
      this.validMsg['required'] = typeof required === 'string' ? required : '不可为空';
      validator.push(Validators.required);
    }
    return validator;
  }

  setLengthValidator(){
    let length = this.param['length'];
    let validator = [];
    if(length){
      let index = length.indexOf('-');
      if(index===0){
        let max = length.substring(1,length.length);
        Validators.maxLength(max);
      }
    }
    return validator;
  }

  setDataTypeValidator(){
    let dataType = this.param['dataType'];
    let msg = '';
    if(dataType instanceof Object){
      msg = dataType['msg'];
      dataType = dataType['type'];
    }

    switch(dataType){
      case 'TEXT':
        let reg = /^\S$/;
        Validators.pattern(reg);
    }
  }

}
