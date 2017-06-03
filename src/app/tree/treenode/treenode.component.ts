import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreenodeComponent implements OnInit {

  @Input()
  node: Object;

  constructor() {
  }

  ngOnInit() {
  }

  troggleFold(node){
    node.unfold = !node.unfold;
  }

}
