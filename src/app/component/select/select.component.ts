import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as select from './select.model';
import * as util from '../../../com-util';
import {MapType} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'com-select',
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
   * 在选择其中一条数据后数据改变的话触发的事件
   * @type {EventEmitter<Object>}
   */
  @Output() changed: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * 下拉框选中事件
   * @type {EventEmitter<Object>}
   */
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();

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

  /**
   * 实际值
   */
  value:any;

  constructor() {
    //初始化错误消息
    this.validMsg = {};
    this.status = false;
    this.data = {};
    this.value = '';
  }

  ngOnInit() {
    //初始化param
    this.param = util.deepAssign(select.param,this.param);
    this.value = this.param['value'];
    //初始化control
    this.control = new FormControl({value: this.value,disabled: true});
    //设置control的验证规则
    // this.control.setValidators(this.setValidator());
    //设置可选数据键值对
    this.setData();
    //监听值得改变
    this.control.valueChanges.subscribe((value) => {
      console.log(this.control.errors);
      let errors = {};
      //更新错误消息的key
      if(errors = this.control.errors || this.control.validator ? this.control.validator(this.control):''){
        var keys = Object.keys(errors);
        this.errorKey = keys[0];
      }else{
        this.errorKey = '';
      }
    });
    console.log('input init');
    this.backControl.emit(this.control);
  }

  /**
   * 设置可选项的键值对
   */
  setData(){
    if(!this.param['data'].length) return;
    this.param['data'].forEach((v,i,arr)=>{
      //文本模型，实际文本，值模型，实际值
      let mtext,text,mvalue,value;
      mtext = this.param['realText'];
      switch(typeof mtext){
        case 'function':
         text = mtext(v,i,arr);
          break;
        case 'string':
          text = v[mtext];
          break;
        default:
          text = v['text'];
      }
      mvalue = this.param['realValue'];
      switch(typeof mvalue){
        case 'function':
          value = mvalue(v,i,arr);
          break;
        case 'string':
          value = v[mvalue];
          break;
        default:
          value = v['value'];
      }
      this.data[value] = {text:text,index:i};
    });
  }

  select(v){
    let ov = this.value;
    this.value = v;
    let param = {
      value: v,
      oldValue: ov,
      item: this.data[v],
      oldItem: this.data[ov]
    };
    this.selected.emit(param);
    ov!==v && this.changed.emit(param);
  }

  toggleList(){
    if(this.param['disabled'] || !Object.keys(this.data).length){
      return;
    }
    this.status = !status;
  }

}
