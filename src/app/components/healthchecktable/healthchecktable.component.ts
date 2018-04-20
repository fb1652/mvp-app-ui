import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {HealthcheckException} from '../../support';
import {HealthcheckService} from '../../services';

@Component({
  selector: 'app-healthchecktable',
  templateUrl: './healthchecktable.component.html',
  styleUrls: ['./healthchecktable.component.scss']
})
export class HealthchecktableComponent implements OnInit, AfterViewInit {

  component: String = 'app-healthchecktable';
  columnsToDisplay = [ 'owner', 'check', 'severity' ];
  filterValue: string;

  @Input() table: MatTableDataSource<HealthcheckException> = new MatTableDataSource<HealthcheckException>([]);
  @Output() onSelected = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private healthcheckService: HealthcheckService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.table.sort = this.sort;
  }

  severity(severity) {
    if (severity.startsWith('LOW')) { return 'low'; }
    if (severity.startsWith('MEDIUM')) { return 'medium'; }
    if (severity.startsWith('HIGH')) { return 'high'; }
  }

  selected(row) {
    this.healthcheckService.setHealthcheckException(row);
  }

  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.table.filter = filterValue;
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }
}
