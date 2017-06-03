import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  host: {class: 'tree'}
})
export class TreeComponent implements OnInit {

  nodes: Array<any>;

  constructor() {
    this.nodes = [
      {name: '节点1',unfold:true,children: [{name:'子节点1',children: [{name:'子节点11'}]}]},
      {name: '节点2',unfold:true,children: [{name:'子节点2'}]}
    ]
  }

  ngOnInit() {
  }

}
