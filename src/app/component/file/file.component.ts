import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges} from '@angular/core';
import {AbstractControl, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'com-file',
  templateUrl: 'file.component.html',
  styleUrls: ['file.component.css']
})
export class FileComponent implements OnInit ,OnChanges {

  /**
   * 在control生成以后就返回给form表单
   * @type {EventEmitter<number>}
   */
  @Output() backControl: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();

  /**
   * 需要传入的参数
   */
  @Input()
  param: Object;
  /**
   * 当前的formControl
   */
  control: AbstractControl;
  /**
   * 验证错误信息
   */
  validMsg: Object;

  /**
   * 当前应该显示的错误信息关键字
   */
  errorKey: String;

  constructor() {
    //初始化消息
    this.validMsg = {};
    this.errorKey = '';
  }

  ngOnInit() {
    //初始化param
    // this.param = util.deepAssign(input.param,this.param);
    this.setId();
    //初始化control
    this.control = new FormControl({value: this.param['value'], disabled: this.param['disabled']});
    //设置control的验证规则
    this.control.setValidators([Validators.required]);
    //监听值得改变
    this.control.valueChanges.subscribe((value) => {
      let errors = {};
      //更新错误消息的key
      if (errors = this.control.errors || this.control.validator(this.control)) {
        var keys = Object.keys(errors);
        this.errorKey = keys[0];
      } else {
        this.errorKey = '';
      }
    });
    this.backControl.emit(this.control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      let cp = changes['param'] && changes['param']['currentValue'];
      let pp = changes['param'] && changes['param']['previousValue'];

      //设置输入项的disable和enable状态
      cp.disabled !== pp.disabled && (cp.disabled ? this.control.disable() : this.control.enable());
    }
  }

  setId(){
    if(!this.param['id']){
      this.param['id'] = 'file_' + new Date().getTime();
    }
  }
}
