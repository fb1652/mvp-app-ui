import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Report} from '../../models';
import {HelpService, ReportService, SocketService} from '../../services';
import {stateAnimation} from '../../support/animations';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [stateAnimation]
})
export class ReportsComponent implements OnInit {

  loading = false;
  columns = ['Select', 'Date', 'Type', 'Datacenter', /*'Description',*/ 'User', 'Status', 'Delete'];
  reports: MatTableDataSource<Report> = new MatTableDataSource<Report>([]);
  selectedReports: Report[];
  selectedAll = false;
  filterValue: string;
  tab = 0;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private helpService: HelpService, private reportService: ReportService, private socketService: SocketService) {}

  ngOnInit() {
    this.refresh();
    this.helpService.setHeaderHelp('HID_MyReports');
    this.socketService.on('report-progress', (data: any) => {
      const item = this.reports.data.find((item) => item.Id === data.id); // find obj that matches the data
      if (item) { item.assign({status: data.status}); } // update status
    });
    this.socketService.on('report-saved', (data: Report) => {
      let item = this.reports.data.find((item) => item.Id === data.Id); // find obj that matches the data
      if (!item) { // obj is new if it didn't exist
        item = new Report(); // default to empty object
        this.reports.data = this.reports.data.concat([item]); // push this item
      }
      Object.assign(item, data, {state: 'saved'}); // refresh item with the updated data & trigger animation
    });
    this.socketService.on('report-deleted', (data) => {
      const index = this.reports.data.findIndex((item) => item.Id === data.Id); // find obj that matches the data
      if (index > -1) { Object.assign(this.reports.data[index], {state: 'deleted'}); } // trigger animation to remove
    });
  }

  refresh(): Promise<any> {
    this.loading = true; // start loading
    return this.reportService.all() // get all
    .then((reports: Report[]) => this.reports = new MatTableDataSource<Report>(reports.reverse())) // store in datasource
    .then(() => this.reports.sort = this.sort) // sort
    .then(() => this.loading = false) // stop loading
    .catch(() => this.loading = false); // stop loading
  }

  view(report: Report): Promise<any> {
    this.loading = true; // start loading
    const selected = this.reports.data.filter((e) => report.Id !== e.Id && e['checked']); // add other selected
    selected.push(report); // add the clicked report
    this.selectedReports = [];
    return selected.reduce((promise, report) => {
      return promise.then(() => this.reportService.get(report))
      .then((data) => this.selectedReports.push(data));
    }, Promise.resolve(0))
    .then(() => this.loading = false) // stop loading
    .then(() => this.tab = 1) // show reports
    .catch(() => this.loading = false); // stop loading
  }

  delete(report: Report): Promise<any> {
    const selected = this.reports.data.filter((e) => report.Id !== e.Id && e['checked']); // add other selected
    selected.push(report); // add the clicked report
    return selected.reduce((promise, report) => {
      return promise.then(() => this.reportService.delete(report)) // delete
      .then(() => this.socketService.emit('delete-report', report)); // notify
    }, Promise.resolve());
  }

  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.reports.filter = filterValue;
    this.setSelectedAll();
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }

  select() {
    this.selectedAll = this.reports.filteredData.reduce((selectedAll, item) => {
      return selectedAll && item['checked'];
    }, true);
  }

  selectAll() {
    this.reports.filteredData.forEach((item) => item['checked'] = this.selectedAll);
  }

  setSelectedAll() {
    this.selectedAll = this.reports.filteredData.length === 0 ? false :
    this.reports.filteredData.reduce((selectedAll, report) => selectedAll && report['checked'], true); // detect selected all
  }

  handleState(report: Report): void {
    if (report['state'] === 'saved') { delete report['state']; } // remove the state
    if (report['state'] === 'deleted') {
      const index = this.reports.data.findIndex((item) => item.Id === report.Id); // find obj that matches the data
      if (index > -1) { // remove the existing item
        this.reports.data = this.reports.data.slice(0, index).concat(this.reports.data.slice(index + 1)); // remove the item
      }
      this.setSelectedAll();
    }
  }
}
