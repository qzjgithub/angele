import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as select from './select.model';
import * as util from '../../../com-util';
import {MapType} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit {
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
   * 下拉框展示状态
   * true表示展示，false表示隐藏
   * 默认为false
   */
  status:boolean;

  /**
   * 键值对数据
   */
  data:Object;

  constructor() {
    //初始化错误消息
    this.validMsg = {};
    this.status = false;
    this.data = {};
  }

  ngOnInit() {
    //初始化param
    this.param = util.deepAssign(select.param,this.param);
    //初始化control
    this.control = new FormControl({value: this.param['value'],disabled: true});
    //设置control的验证规则
    // this.control.setValidators(this.setValidator());
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

}
