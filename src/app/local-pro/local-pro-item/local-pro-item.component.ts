import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";
import {Project} from "../../../control/project/project.model";
import * as input from '../../component/input/input.model';
import {deepAssign} from "../../../com-util";

@Component({
  selector: 'app-local-pro-item',
  templateUrl: 'local-pro-item.component.html',
  styleUrls: ['local-pro-item.component.css']
})
export class LocalProItemComponent implements OnInit {

  /**
   * 表单
   */
  form: FormGroup;

  /**
   * 当前项目
   */
  @Input()
  project: Project;

  /**
   * 编辑和展示的内容
   */
  editData: Project;

  /**
   * 表单要传入的参数
   */
  param: Object;

  constructor() {
    //实例化表单
    this.form = new FormGroup({});

    //设置表单参数
    this.setParam();
    console.log('local-pro-constructor over');
  }

  ngOnInit() {
    //生成新的一份project数据，可用于编辑
    this.editData = Object.assign({},this.project);
    this.setValue();
    console.log('local-pro oninit over');
  }

  /**
   * 接受表单元件返回的control，并放入当前form中
   * @param event
   * @param name
   */
  getControl(event:AbstractControl, name:string){
    this.form.addControl(name,event);
  }
  setParam(){
    this.param = {};
    this.param['url'] = deepAssign(input.param,{
      class:'test',
      name:'url',
      placeholder:'请输入路径',
      value:'',//this.editData['url'],
      disabled:true,
      pattern:'edit',
      length:'3-8'
    })
  }

  setValue(){
    this.param['url']['value'] = this.editData['url'];
  }

}
