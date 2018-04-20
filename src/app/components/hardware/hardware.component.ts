import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Data} from '../../models';
import {HelpService} from '../../services';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class HardwareComponent implements OnInit {

  dataArray: any = [];
  @Input() data: any;
  
  constructor() {}

  ngOnInit() {
    this.dataArray = this.data.Data.report.map((data) => new Data(data));
  }
}
