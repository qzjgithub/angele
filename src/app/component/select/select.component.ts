import {Component, OnInit, Output, EventEmitter, Input, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as select from './select.model';
import * as util from '../../../com-util';
import {AppState} from "../../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../../control/app.store";
import {getClickEntity} from "../../../control/common/common.reducer";

@Component({
  selector: 'com-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css']
})
export class SelectComponent implements OnInit,OnChanges {
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
   * 值的数组
   */
  valueKeys:Array<string>;

  /**
   * 被选中的值
   */
  selectValue: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    //初始化错误消息
    this.validMsg = {};
    this.status = false;
    this.data = {};
    this.valueKeys = [];
    this.selectValue = '';
    this.store.subscribe(()=> this.hideList());
  }

  ngOnInit() {
    //初始化param
    // this.param = util.deepAssign(select.param,this.param);
    //设置可选数据键值对
    this.setData();
    //设置value值数组
    this.valueKeys = Object.keys(this.data);
    this.selectValue = this.param['value'];
    //初始化control
    this.control = new FormControl({value: this.param['value'],disabled: this.param['disabled']});
    //设置control的验证规则
    this.control.setValidators(this.setValidator());
    //监听值得改变
    this.control.valueChanges.subscribe((value) => {
      let errors = {};
      //更新错误消息的key
      if(errors = this.control.errors || this.control.validator ? this.control.validator(this.control):''){
        var keys = Object.keys(errors);
        this.errorKey = keys[0];
      }else{
        this.errorKey = '';
      }
    });
    this.backControl.emit(this.control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.control){
      let cp = changes['param'] && changes['param']['currentValue'];
      let pp = changes['param'] && changes['param']['previousValue'];

      //设置输入项的disable和enable状态
      cp.disabled !== pp.disabled && (cp.disabled ? this.control.disable() : this.control.enable());
      //设置被选择项是否改变
      if(cp.value !== pp.value) this.selectValue = cp.value;
    }
  }
  /**
   * 设置表单验证
   */
  setValidator(){
    let validator = [];
    validator = [...util.setRequiredValidator(this.param,this.validMsg),
      ...util.setLengthValidator(this.param,this.validMsg),
      ...util.setDataTypeValidator(this.param,this.validMsg),
      ...util.setRegValidator(this.param,this.validMsg)];
    if(this.param['norepeat']){
      validator.push(this.setNoRepeatValidator());
    }
    return validator;
  }

  /**
   * 生成不可重复的验证
   * @returns {(control:FormControl)=>{[p: string]: boolean}}
   */
  setNoRepeatValidator(){
    this.validMsg['norepeat'] = '该值已存在';
    return (control: FormControl): { [s: string]: boolean } => {
      if (this.selectValue!==control.value && this.valueKeys.indexOf(control.value) >= 0) {
        return { norepeat: true };
      }
    }
  }
  /**
   * 隐藏下拉列表
   */
  hideList(){
    const state = this.store.getState();
    let click = getClickEntity(state);
    if(click.status){
      this.status = false;
    }
  }
  /**
   * 设置可选项的键值对
   */
  setData(){
    var keys = Object.keys(this.param['data']);
    if(!keys.length) return;
    let arr = this.param['data']
    keys.forEach((key,i)=>{
      //文本模型，实际文本，值模型，实际值
      let mtext,text,mvalue,value;
      let v = arr[key];
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

  /**
   * 下拉列表被点中事件
   * @param v
   */
  select(event,v){
    let ov = this.param['value'];
    this.param['value'] = v;
    let param = {
      value: v,
      oldValue: ov,
      item: this.data[v],
      oldItem: this.data[ov]
    };
    this.status = !this.status;
    this.selectValue = v;
    this.selected.emit(param);
    if(ov!==v){
      this.control.markAsDirty();
      this.changed.emit(param);
    }
    event.stopPropagation();
  }

  /**
   * 下拉列表切换事件
   */
  toggleList(event){
    if(this.param['disabled'] || !this.valueKeys.length){
      return;
    }
    this.status = !this.status;
    this.control.markAsTouched();
    event.stopPropagation();
  }

}
