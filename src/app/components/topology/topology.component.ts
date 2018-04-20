import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopologyComponent implements OnInit {

  @Input() topology: TreeNode[] = [];

  constructor() { }

  ngOnInit() {
  }

}
