import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSort, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {DatacenterUserAddDialog} from '../datacenterUserAddDialog/datacenterUserAddDialog.component';
import {Datacenter, User} from '../../models';
import {DatacenterService, SocketService, UserService} from '../../services';
import {stateAnimation} from '../../support/animations';

@Component({
  selector: 'app-datacenter-users',
  templateUrl: './datacenterUsers.component.html',
  styleUrls: ['./datacenterUsers.component.scss'],
  animations: [stateAnimation]
})
export class DatacenterUsersComponent implements OnInit {

  columns = ['Email', 'First', 'Last', 'Role'];
  loading: Boolean = false;
  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  others: any[] = [];
  selectedAll = false;
  filterValue: string;

  @Input() datacenter: Datacenter;
  @Input() size = 730;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
    private datacenterService: DatacenterService,
    private socketService: SocketService,
    private userService: UserService) {}

  ngOnInit() {
    if (this.datacenter.Role === 'ADMIN') { this.columns = this.columns.concat(['Delete']); }
    this.socketService.on('datacenter-user-saved', (event: any) => {
      if (event.datacenterId === this.datacenter.Id) { // handle only for this datacenter
        let item = this.users.data.find((item) => item.Id === event.user.Id); // find obj that matches the data
        if (!item) { // obj is new if it didn't exist
          item = new User(); // default to empty object
          this.users.data = this.users.data.concat([item]);
        }
        Object.assign(item, event.user, {state: 'saved'}); // refresh item with the updated data & trigger animation
      }
    });
    this.socketService.on('datacenter-user-removed', (event: any) => {
      if (event.datacenterId === this.datacenter.Id) { // handle only for this datacenter
        const index = this.users.data.reduce((loc, user, index) => user.Email === event.Email ? index : loc, -1);
        if (index > -1) { // if the object exists,
          Object.assign(this.users.data[index], {state: 'deleted'}); // trigger animation
        }
      }
    });
    return this.refresh();
  }

  refresh(): Promise<any> {
    this.loading = true; // start loading
    return this.datacenterService.getUsers(this.datacenter.Id) // get users for a datacenter
    .then((users: User[]) => this.users = new MatTableDataSource<User>(users)) // store in datasource
    .then(() => this.userService.users()) // get all users
    .then((others) => this.others = others.filter((other) => { // retain non-added users
      return this.users.data.find((user) => other.Email === user.Email) === undefined;
    }))
    .then(() => this.users.sort = this.sort) // sort users
    .then(() => this.loading = false) // stop loading
    .catch(() => this.loading = false); // catch stop loading
  }

  add(): Promise<any> {
    return new Promise((resolve) => {
      const params = {width: '500px', data: {others: this.others}};
      const dialogRef: MatDialogRef<DatacenterUserAddDialog> = this.dialog.open(DatacenterUserAddDialog, params);
      dialogRef.afterClosed().subscribe((index: number) => {
        if (index) {
          const user = this.others[index];
          this.users.data = this.users.data.concat([user]); // add the user
          return this.save(user)
          .then(() => this.others = this.others.slice(0, index).concat(this.others.slice(index + 1))); // cut out the added user
        }
        return resolve(null);
      });
    });
  }

  save(user: User): Promise<any> {
    return this.datacenterService.updateUsers(this.datacenter.Id, this.users.data) // save the User
    .then(() => this.socketService.emit('save-datacenter-user', { // notify User was saved w/ datacenter context
      datacenterId: this.datacenter.Id,
      user: user
    }));
  }

  remove(user: User): Promise<any> {
    // TODO do selected (checked) items
    Object.assign(user, {state: 'deleted'}); // trigger animation to delete
    const users = this.users.data.filter((u) => u.Id !== user.Id); // retain all except the given user
    return this.datacenterService.updateUsers(this.datacenter.Id, users) // update
    .then(() => this.socketService.emit('remove-datacenter-user', { // notify User was removed from a datacenter
      datacenterId: this.datacenter.Id,
      user: user
    }));
  }

  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.users.filter = filterValue;
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }

  handleState(user: User): void {
    if (user['state'] === 'saved') { delete user['state']; } // remove the state
    if (user['state'] === 'deleted') {
      const index = this.users.data.findIndex((item) => item.Id === user.Id); // find obj that matches the data
      if (index > -1) { // remove the existing item
        this.users.data = this.users.data.slice(0, index).concat(this.users.data.slice(index + 1)); // remove the item
      }
    }
  }
}
