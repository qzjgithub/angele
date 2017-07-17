import {Component, OnInit, Inject} from '@angular/core';
import {deepAssign} from "../../com-util";
import {AppState} from "../../control/app.reducer";
import {Store} from "redux";
import {AppStore} from "../../control/app.store";
import {getProjectsEntities} from "../../control/project/project.reducer";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  host: {class: 'tree'}
})
export class TreeComponent implements OnInit {

  /**
   * 所有的节点
   */
  nodes: Array<any>;

  /**
   * 树节点的展开和关闭状态
   */
  close: boolean;

  /**
   * 所有节点的Keys
   */
  keys: Array<any>

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.close = false;
    this.keys = [];
    store.subscribe(() => this.updateNodes());
    /*this.nodes = [
      {name: '节点1',unfold:true,children: [{name:'子节点1',children: [{name:'子节点11'}]}]},
      {name: '节点2',unfold:true,children: [{name:'子节点2'}]}
    ]*/
  }

  ngOnInit() {
  }

  updateNodes(){
    const state = this.store.getState();
    let projects = getProjectsEntities(state);
    let keys = Object.keys(projects);
    let nodes = [];
    keys.forEach((key) => {
      let project = projects[key];
      let node = {name: project.name};
      if(this.keys.indexOf(key) > -1){
        nodes.push(deepAssign(this.nodes[key],node));
      }else{
        nodes.push(node);
      }
    });
    this.keys = keys;
    this.nodes = nodes;
  }

  /**
   * 展示或隐藏树
   * @param event
   */
  toggleTree(event){
    this.close = !this.close;
    event.stopPropagation();
  }

  /**
   * 关闭节点
   * @param event
   */
  foldNode(event){
    let new_nodes = [];
    this.nodes.forEach((e,i)=>{
      new_nodes.push(this.closeNode(e))
    });
    this.nodes = new_nodes;
    event.stopPropagation();
  }

  /**
   * 关闭节点嵌套方法
   * @param node
   * @returns {any}
   */
  closeNode(node){
    if(node.children && node.children.length > 0){
      node = deepAssign(node,{unfold: false});
      let new_children = [];
      node.children.forEach((e,i)=> {
        new_children.push(this.closeNode(e))
      });
      node.children = new_children;

    }
    return node;
  }

}
