import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {DatacenterAddDialog} from '../datacenterAddDialog/datacenterAddDialog.component';
import {Datacenter} from '../../models';
import {DatacenterService, HelpService, SocketService} from '../../services';
import {stateAnimation} from '../../support/animations';

@Component({
  selector: 'app-datacenters',
  templateUrl: './datacenters.component.html',
  styleUrls: ['./datacenters.component.scss'],
  animations: [stateAnimation]
})
export class DatacentersComponent implements OnInit {

  loading = false;
  columns = ['Name', 'Description', 'View', 'Delete'];
  datacenters: MatTableDataSource<Datacenter> = new MatTableDataSource<Datacenter>([]);
  selectedAll = false;
  filterValue: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private datacenterService: DatacenterService,
    private dialog: MatDialog,
    private helpService: HelpService,
    private router: Router,
    private socketService: SocketService) {}

  ngOnInit() {
    this.refresh();
    this.helpService.setHeaderHelp('HID_CreateDatacenter');
    this.socketService.on('datacenter-saved', (data: Datacenter) => {
      if(data!==null) {
        let item = this.datacenters.data.find((item) => item.Id === data.Id); // find obj that matches the data
        if (!item) { // obj is new if it didn't exist
          item = new Datacenter(); // default to empty object
          this.datacenters.data = this.datacenters.data.concat([item]); // push this item
        }
        Object.assign(item, data, {state: 'saved'}); // refresh item with the updated data & trigger animation
      }
      });
    this.socketService.on('datacenter-deleted', (data) => {
      const index = this.datacenters.data.findIndex((item) => item.Id === data.Id); // find obj that matches the data
      if (index > -1) { Object.assign(this.datacenters.data[index], {state: 'deleted'}); } // trigger animation to remove
    });
  }

  refresh(): Promise<any> {
    this.loading = true; // start loading
    return this.datacenterService.get() // get all
    .then((datacenters: Datacenter[]) => this.datacenters = new MatTableDataSource<Datacenter>(datacenters)) // store in datasource
    .then(() => this.datacenters.sort = this.sort) // sort
    .then(() => this.loading = false) // stop loading
    .catch(() => this.loading = false); // stop loading
  }

  add(): Promise<any> {
    return new Promise((resolve) => {
      const dialogRef: MatDialogRef<DatacenterAddDialog> = this.dialog.open(DatacenterAddDialog, {width: '365px', height: '408px'});
      dialogRef.afterClosed().subscribe((datacenter) => resolve(datacenter));
    })
    .then((datacenter) => this.socketService.emit('save-datacenter', datacenter));
  }

  view(datacenter: Datacenter): Promise<any> {
    return this.router.navigate([`/Datacenters/${datacenter.Id}`]);
  }

  delete(datacenter: Datacenter): Promise<any> {
    const selected = this.datacenters.data.filter((e) => datacenter.Id !== e.Id && e['checked']); // add other selected
    selected.push(datacenter); // add the clicked datacenter
    return selected.reduce((promise, datacenter) => {
      return promise.then(() => this.datacenterService.delete(datacenter)) // delete
      .then(() => this.socketService.emit('delete-datacenter', datacenter)); // notify
    }, Promise.resolve());
  }

  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.datacenters.filter = filterValue;
    this.setSelectedAll();
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }

  select() {
    this.selectedAll = this.datacenters.filteredData.reduce((selectedAll, item) => {
      return selectedAll && item['checked'];
    }, true);
  }

  selectAll() {
    this.datacenters.filteredData.forEach((item) => item['checked'] = this.selectedAll);
  }

  setSelectedAll() {
    this.selectedAll = this.datacenters.filteredData.length === 0 ? false :
    this.datacenters.filteredData.reduce((selectedAll, report) => selectedAll && report['checked'], true); // detect selected all
  }

  handleState(datacenter: Datacenter): void {
    if (datacenter['state'] === 'saved') { delete datacenter['state']; } // remove the state
    if (datacenter['state'] === 'deleted') {
      const index = this.datacenters.data.findIndex((item) => item.Id === datacenter.Id); // find obj that matches the data
      if (index > -1) { // remove the existing item
        this.datacenters.data = this.datacenters.data.slice(0, index).concat(this.datacenters.data.slice(index + 1)); // remove the item
      }
      this.setSelectedAll();
    }
  }
}
