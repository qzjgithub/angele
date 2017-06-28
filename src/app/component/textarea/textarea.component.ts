import {Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as textarea from './textarea.model';
import * as util from '../../../com-util';

@Component({
  selector: 'com-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css']
})
export class TextareaComponent implements OnInit {

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

  /**
   * 当前值
   */
  value:String;
  constructor() {
    //初始化消息
    this.validMsg = {};
    this.errorKey = '';
    this.value = '';
  }

  ngOnInit() {
    //初始化param
    this.param = util.deepAssign(textarea.param,this.param);
    //初始化值
    this.value = this.param['value'];
    //初始化control
    this.control = new FormControl({value: this.value,disabled: this.param['disabled']});
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
    console.log('textarea init');
    this.backControl.emit(this.control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(this.control){
      //设置输入项的disable和enable状态
      let p = changes['param'] && changes['param']['currentValue'];
      p.disabled ? this.control.disable():this.control.enable();
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

}
