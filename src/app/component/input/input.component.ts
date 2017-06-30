import {Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as util from '../../../com-util';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators} from "@angular/forms";
import * as input from './input.model';

@Component({
  selector: 'com-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})
export class InputComponent implements OnInit ,OnChanges{
  /**
   * 在control生成以后就返回给form表单
   * @type {EventEmitter<number>}
   */
  @Output() backControl: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();

  /**
   * 需要传入的参数
   */
  @Input()
  param : Object;
  /**
   * 当前的formControl
   */
  control: AbstractControl;
  /**
   * 验证错误信息
   */
  validMsg:Object;

  /**
   * 当前应该显示的错误信息关键字
   */
  errorKey:String;

  constructor() {
    console.log('input constructor');
    //初始化消息
    this.validMsg = {};
    this.errorKey = '';

  }

  ngOnInit() {
    //初始化param
    this.param = util.deepAssign(input.param,this.param);
    //初始化control
    this.control = new FormControl({value: this.param['value'],disabled: this.param['disabled']});
    //设置control的验证规则
    this.control.setValidators(this.setValidator());
    //监听值得改变
    this.control.valueChanges.subscribe((value) => {
      console.log(this.control.errors);
      let errors = {};
      //更新错误消息的key
      if(errors = this.control.errors || this.control.validator(this.control)){
        var keys = Object.keys(errors);
        this.errorKey = keys[0];
      }else{
        this.errorKey = '';
      }
    });
    console.log('input init');
    this.backControl.emit(this.control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(this.control){
      let cp = changes['param'] && changes['param']['currentValue'];
      let pp = changes['param'] && changes['param']['previousValue'];

      //设置输入项的disable和enable状态
      cp.disabled !== pp.disabled && (cp.disabled ? this.control.disable() : this.control.enable());
    }
  }

  /**
   * 根据传入的参数设置次输入项的验证规则
   * @returns {Array}
     */

  setValidator(){
    let validator = [];
    validator = [...util.setRequiredValidator(this.param,this.validMsg),
      ...util.setLengthValidator(this.param,this.validMsg),
      ...util.setDataTypeValidator(this.param,this.validMsg),
      ...util.setRegValidator(this.param,this.validMsg)];
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
    if(!dataType) return [];
    if(dataType instanceof Object){
      msg = dataType['msg'];
      dataType = dataType['type'];
    }

    dataType = dataType.toUpperCase();
    let reg;
    switch(dataType){
      case 'TEXT':
        reg = /^\S*$/;
        validator.push(Validators.pattern(reg));
        this.validMsg['pattern'] = msg || '正则验证不通过';
        break;
      case 'PATH':
        reg = /^\/([\S]+\/)*$/;
        validator.push(Validators.pattern(reg));
        this.validMsg['pattern'] = msg || '不符合路径规则';
        break;
      case 'NUMBER':
        reg = /^\d+$/;
        validator.push(Validators.pattern(reg));
        this.validMsg['pattern'] = msg || '输入的不全是数字';
        break;
    }
    return validator;
  }

  /**
   * 设置自定义验证
   * @returns {Array}
   */
  setRegValidator(){
    let regular = this.param['regular'];
    if(!regular) return [];
    let validator = [], keys = Object.keys(regular);
    keys.length && keys.forEach((e,i) => {
      var item = regular[e];
      let name = item.name || ('reg_'+i);
      validator.push(Validators.patternName(item.reg, name));
      this.validMsg[name] = item.msg;
    });
    return validator;
  }

}
