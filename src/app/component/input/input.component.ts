import { Component, OnInit } from '@angular/core';
import * as util from '../../../com-util';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators} from "@angular/forms";

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
  formGroup: FormGroup;
  /**
   * 验证错误信息
   */
  validMsg:Object;

  /**
   * 当前应该显示的错误信息关键字
   */
  errorKey:Object;

  constructor(fb: FormBuilder) {
    this.param = util.deepAssign({
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
       length:'3-6',
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
    this.validMsg = {};
    /*this.formGroup = fb.group({
      'control':  ['', Validators.compose(this.setValidator())]
    });*/
    //创建一个control
    this.control = new FormControl(this.param['name']);
    //this.control = this.formGroup.controls['control'];
    //设置control的验证规则
    this.control.setValidators(this.setValidator());

    this.control.valueChanges.subscribe(
      (value: string) => {
        var keys = Object.keys(this.validMsg);
        console.log(this.control.errors);
        if(!this.control.errors){
          this.errorKey = '';
        } else {
          for(let i = 0;i < keys.length; i++){
            if(this.control.errors && this.control.errors[keys[i]]){
              this.errorKey = keys[i];
              break;
            }
          }
        }
      }
    );
  }

  ngOnInit() {
  }

  /**
   * 根据传入的参数设置次输入项的验证规则
   * @returns {Array}
     */
  setValidator(){
    let validator = [];
    validator = [...this.setRequiredValidator(),...this.setLengthValidator(),...this.setDataTypeValidator()];
    return validator;
  }

  /**
   * 设置是否必填的验证规则
   * @returns {Array}
     */
  setRequiredValidator(){
    let required = this.param['required'];
    let validator = [];
    if(required){
      this.validMsg['required'] = typeof required === 'string' ? required : '不可为空';
      validator.push(Validators.required);
    }
    return validator;
  }

  /**
   * 设置长度验证规则
   * @returns {Array}
     */
  setLengthValidator(){
    let length = this.param['length'];
    if(!length) return [];
    //验证规则数组，‘-’符号位置，最小长度，最大长度
    let validator = [],index = length.indexOf('-'),min,max;
    if(index===0){
      max = length.substring(1,length.length);
    }else if(index===(length.length - 1)){
      min = length.substring(0,length.length - 1);
    }else if(index > -1){
      let lenArr = length.split('-');
      min = lenArr[0];
      max = lenArr[1];
    }
    max = util.getIntTrue(max);
    max > -1 && validator.push(Validators.maxLength(util.getIntTrue(max)));
    this.validMsg['maxlength'] = max > -1 ? ('最大长度为'+ max) : '';

    min = util.getIntTrue(min);
    min > -1 && validator.push(Validators.minLength(min));
    this.validMsg['minlength'] = max > -1 ? ('最小长度为'+ min) : '';
    return validator;
  }

  /**
   * 设置数据类型验证
   */
  setDataTypeValidator(){
    let dataType = this.param['dataType'],msg = '',validator = [];
    if(dataType instanceof Object){
      msg = dataType['msg'];
      dataType = dataType['type'];
    }

    switch(dataType){
      case 'TEXT':
        let reg = /^\S*$/;
        validator.push(Validators.pattern(reg));
        this.validMsg['pattern'] = msg || '正则验证不通过';
        break;
    }
    return validator;
  }

}
