import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as textarea from './textarea.model';
import * as util from '../../../com-util';

@Component({
  selector: 'app-textarea',
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
  }

}
