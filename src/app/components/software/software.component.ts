import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Data} from '../../models';
import {DatacenterService, DataService, HelpService, SortTableService} from '../../services';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {

  dataArray: any = [];
  @Input() data: any;

  constructor(private sortTableService: SortTableService) {}

  ngOnInit() {
    this.dataArray = this.data.Data.report.map((data) => new Data(data));
  }

  tabChanged() {
    this.sortTableService.emit({event: 'RESET'});
  }
}
