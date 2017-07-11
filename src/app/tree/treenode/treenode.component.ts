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
    this.arrowActive = false;
    this.animate = false;
  }

  ngOnInit() {
    this.arrowActive = this.node['unfold'];
  }

  ngAfterViewInit(): void {
    if(this.ul){
      let uldom = this.ul.nativeElement;
      let len = this.calNode(this.node);
      uldom.style.height = 'auto';
    }
  }

  troggleFold(event, node){
    // node.unfold = !node.unfold;
    let i = event.target;
    if(this.animate || !i) return;
    this.animate = true;
    this.arrowActive = !this.arrowActive;
    if(node.unfold){
      let ul = i.parentElement.parentElement.nextElementSibling;
      ul.style.height = ul.offsetHeight + 'px';
      setTimeout(() => {
        ul.style.height = 0 + 'px';
      },10);
      setTimeout(() => {
        node.unfold = !node.unfold;
        this.animate = false;
      },510);
    }else{
      node.unfold = !node.unflod;
      let len = this.calNode(node);
      setTimeout(() => {
        let ul = i.parentElement.parentElement.nextElementSibling;
        ul.style.height = 30 * len + 'px'
      },10);
      setTimeout(() => {
        let ul = i.parentElement.parentElement.nextElementSibling;
        this.animate = false;
        ul.style.height = 'auto'
      },510);
    }
    event.stopPropagation();
  }

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
