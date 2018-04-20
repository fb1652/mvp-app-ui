import {
  AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SortFilterColumn} from '../../support';
import {SortTableService} from '../../services';

@Component({
  selector: 'app-sort-filter-table',
  templateUrl: './sortfiltertable.component.html',
  styleUrls: ['./sortfiltertable.component.scss']
})
export class SortFilterTableComponent implements OnInit, AfterViewInit {

  component: String = 'app-sort-filter-table';
  filterValue: string;

  @Input() table: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @Input() columnDefs: SortFilterColumn = null;
  @Input() columnsToDisplay: String[] = [];
  @Input() clickableRows = false;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private sortTableService: SortTableService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.table.sort = this.sort;
  }

  selected(index, row) {
    this.sortTableService.emit({index: index, row: row});
    this.rowClick.emit({index: index, row: row});
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

  // ifArray(value) {
  //   return Array.isArray(value);
  // }

  formatArrayData(value) {
    if (Array.isArray(value)) {
      return value.length;
    } else {
      return value;
    }
  }
}
