import {
  Component, OnInit, Input, EventEmitter, Output, SimpleChanges, TemplateRef, ViewChild,
  ElementRef, AfterViewInit, AfterViewChecked, DoCheck, ChangeDetectorRef, IterableDiffers, IterableDiffer, OnChanges
} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import * as textarea from './textarea.model';
import * as util from '../../../com-util';

@Component({
  selector: 'com-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css']
})
export class TextareaComponent implements OnInit ,
  OnChanges,
  AfterViewInit{


  /**
   * 在control生成以后就返回给form表单
   * @type {EventEmitter<number>}
   */
  @Output() backControl: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();

  /**
   * 需要传入的参数
   */
  @Input()
  param : any;
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
   * textarea DOM元素
   */
  @ViewChild('txta')
  txtadom: ElementRef;

  constructor() {
    //初始化消息
    this.validMsg = {};
    this.errorKey = '';
  }

  ngOnInit() {
    //初始化param
    // this.param = util.deepAssign(textarea.param,this.param);
    //初始化control
    this.control = new FormControl({value: this.param['value'],disabled: this.param['disabled']});
    //设置control的验证规则
    this.control.setValidators(this.setValidator());
    //监听值得改变
    this.control.valueChanges.subscribe((value) => {
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
      let cp = changes['param'] && changes['param']['currentValue'];
      let pp = changes['param'] && changes['param']['previousValue'];

      //设置输入项的disable和enable状态
      cp.disabled !== pp.disabled && (cp.disabled ? this.control.disable() : this.control.enable());

      //如果为display，则重新计算textarea的高度
      cp.pattern === 'display' && this.setTextareaSize();
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
   * 设置textarea展示的最大高度
   */
  setTextareaSize(){
    //当前值
    let value = this.param['value'];
    let txtadom = this.txtadom.nativeElement;
    //当前元素width
    let width = parseInt(txtadom.offsetWidth);
    //默认300px
    width = width <= 0 ? 300 : width;
    if(!value) return;
    //获取单字节字符
    let singleChar = value.match(/[\x00-\xff]/g);
    //获取双字节字符
    let doubleChar = value.match(/[^\x00-\xff]/g);
    //算总字符长度
    let len = (singleChar ? singleChar.length : 0) + (doubleChar ? 2 * doubleChar.length : 0);
    //算出每行能够展示的字符数，一个字符占7px，目测得出
    let rowNumber = parseInt(((width - 16) / 7).toFixed(0));
    //算出总行数乘以每行高度，一行高25px，目测得出
    let height = 25 * len / rowNumber + 2 + 'px';
    txtadom.style.height =  height;
    // txtadom.style.maxHeight =  height;
  }

  ngAfterViewInit(): void {
    this.param.pattern === 'display' && this.setTextareaSize();
  }

}
