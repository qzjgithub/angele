import {Component, OnInit, EventEmitter, Output} from '@angular/core';
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
   * 在control生成以后就返回给form表单
   * @type {EventEmitter<number>}
   */
  @Output() backControl: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();

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

  /**
   * 当前应该显示的错误信息关键字
   */
  errorKey:String;

  patternState:String;

  constructor() {
    console.log('input constructor');
    this.param = util.deepAssign({
      /**
       * 次输入框的名字，唯一标识，获取value时value的名字，传入后台的数据名字
       * 默认'value'
       */
      name:'test',
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
       * name表示给此条验证一个名字，可用于获取此条验证是否通过。可为空，为空则默认为'reg_'+index，index是此条验证在数组中的位置
       *
       * reg也可以接收一个方法，返回true表示成功，返回false表示验证失败
       * 方法由本组件调用，内部传入输入框值function(value)
       *
       * reg可接受一个请求路径，默认以json格式传入{value:value}
       * 返回json{result:true}表示验证通过，返回json{result:false}表示验证失败
       */
      regular: [{reg:/^[\S]+$/,msg:'不能有空格换行',name:''}],
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
      placeholder:'请输入×××',
      /**
       * 默认值
       */
      value: '',
      /**
       * 输入框模式
       * 分为display（展示）和edit（编辑）
       * 默认为edit
       */
      pattern:'edit',
      /**
       * 输入项的禁用状态
       * true表示被禁用，false表示启用
       * 默认false
       * display模式下也可启用，鼠标进入时转化
       */
      disabled: false
    },this.param);
    this.validMsg = {};
    this.patternState = this.param['pattern'];
    this.control = new FormControl({value: this.param['value'],disabled: this.param['disabled']});
    //设置control的验证规则
    this.control.setValidators(this.setValidator());
    this.control.valueChanges.subscribe((value) => {
      console.log(this.control.errors);
      if(this.control.errors){
        var keys = Object.keys(this.control.errors);
        this.errorKey = keys[0];
      }else{
        this.errorKey = '';
      }
    });
  }

  ngOnInit() {
    console.log('input init');
    this.backControl.emit(this.control);
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

  setRegValidator(){
    let regular = this.param['regular'];
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
