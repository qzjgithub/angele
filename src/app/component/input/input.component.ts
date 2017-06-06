import { Component, OnInit } from '@angular/core';
import { deepAssign } from '../../../com-util';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})
export class InputComponent implements OnInit {

  param : Object;

  constructor() {
    this.param = deepAssign({
      /**
       * 是否可以为空
       * true表示不可为空
       * 默认为true
       */
      require: true,
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
       *
       * reg也可以接收一个方法，返回true表示成功，返回false表示验证失败
       * 方法由本组件调用，内部传入输入框值function(value)
       *
       * reg可接受一个请求路径，默认以json格式传入{value:value}
       * 返回json{result:true}表示验证通过，返回json{result:false}表示验证失败
       */
      //regular: [{reg:/^\S$/,msg:''}]，
      /**
       * 是否是密码框
       * false表示不是
       * 默认false
       */
      password: false,
      icon:'',
    },this.param);
  }

  ngOnInit() {
  }

}
