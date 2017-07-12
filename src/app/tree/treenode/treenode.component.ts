import {
  Component, OnInit, Input, AfterViewInit, EmbeddedViewRef, ViewChild, TemplateRef,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreenodeComponent implements OnInit, AfterViewInit {

  @Input()
  node : Object;

  @ViewChild('children')
  ul : ElementRef;

  /**
   * 小三角表示的展示和隐藏
   */
  arrowActive:boolean;

  /**
   * 是否在动画中
   */
  animate:boolean;

  constructor() {
    //默认箭头关闭
    this.arrowActive = false;
    //默认不处于动画中
    this.animate = false;
  }

  ngOnInit() {
    //设置箭头的展开状态
    this.arrowActive = this.node['unfold'];
  }

  ngAfterViewInit(): void {
    //如果默认是展开的，则获取到ul，则将ul的高度置为自动
    if(this.ul){
      let uldom = this.ul.nativeElement;
      uldom.style.height = 'auto';
    }
  }

  /**
   * 打开和关闭树节点
   * @param event
   * @param node
   */
  troggleFold(event, node){
    //获取点击对象
    let i = event.target;
    //若处于动画中或没有获取到则返回
    if(this.animate || !i) return;
    //设置处于动画中
    this.animate = true;
    //改变箭头状态
    this.arrowActive = !this.arrowActive;

    if(node.unfold){//如果是打开的则关闭
      //获取子节点容器
      let ul = i.parentElement.parentElement.nextElementSibling;
      //为ul的height样式设置实际的值
      ul.style.height = ul.offsetHeight + 'px';
      setTimeout(() => {
        //关闭子节点
        ul.style.height = 0 + 'px';
      },10);
      setTimeout(() => {
        //改变树节点为关闭状态
        node.unfold = !node.unfold;
        //设置不处于动画中
        this.animate = false;
      },510);
    }else{//如果是关闭的则打开
      node.unfold = !node.unfold;
      //得到需要设置的子节点个数
      let len = this.calNode(node);
      setTimeout(() => {
        //获取子节点容器
        let ul = i.parentElement.parentElement.nextElementSibling;
        //如果获取到则改变高度
        if(ul) ul.style.height = 30 * len + 'px'
      },10);
      setTimeout(() => {
        //获取子节点容器
        let ul = i.parentElement.parentElement.nextElementSibling;
        //设置不处于动画中
        this.animate = false;
        //设置子节点高度为自动
        ul.style.height = 'auto'
      },510);
    }
    event.stopPropagation();
  }

  /**
   * 计算某树节点如果展开的话，需要展示的子节点个数
   * @param node
   * @returns {number}
   */
  calNode(node){
    let num = 0;
    node.children &&
    node.children.length &&
    node.unfold &&
    node.children.forEach((e,i) => {
      num++;
      num += this.calNode(e);
    });
    return num;
  }

}
