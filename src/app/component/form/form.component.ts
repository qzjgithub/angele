import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import * as util from '../../../com-util';

@Component({
  selector: 'com-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {

  /**
   * 当前form
   */
  form: FormGroup;

  /**
   * 生成form所需参数
   */
  param: Object;

  constructor() {
    console.log('form constructor');
    this.form = new FormGroup({});
    this.param = util.deepAssign({
      /**
       * 表单标题
       * 如果值为false表示不展示标题
       * 默认false
       */
      title:false,
      /**
       * 表单输入项
       * 如果值为false表示无输入项
       * 默认false
       *
       * list接收数组
       * type表示响应操作的元件类型（button,checkbox,radio...)
       * name表示此元件的名字
       * param是使用此元件需要带的参数
       * [{type:'',name:'',param:{}}]
       */
      list:false,
      /**
       * 对表单的全局操作 global operation
       * 如果值为false表示无响应操作
       * 默认false
       *
       * glop接收数组
       * type表示响应操作的元件类型（button,checkbox,radio...)
       * name表示此元件的名字
       * param是使用此元件需要带的参数
       * [{type:'',name:'',param:{}}]
       */
      glop:false
    },this.param);
    this.form.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to:', form);
      }
    );
  }

  ngOnInit() {
  }

  getControl(event: AbstractControl,name: string){
    this.form.addControl(name,event);
    console.log(this.form.controls);
  }

}
