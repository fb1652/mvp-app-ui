import {Component, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Datacenter } from '../../models/datacenter.model';
import { DatacenterService } from '../../services';
import {FormControl, Validators} from '@angular/forms';
import {HelpService} from '../../services/help/help.service';
import {DatacentersListComponent} from '../datacenterslist/datacenterslist.component';

@Component({
  selector: 'app-datacenters-list-dialog',
  templateUrl: './datacenterslistdialog.component.html',
  styleUrls: ['./datacenterslistdialog.component.scss']
})

export class DatacentersListDialog {
  datacenter: Datacenter = new Datacenter();
  error: string;
  action: string;
  nameValid = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<DatacentersListDialog>, private datacenterService: DatacenterService,
              @Inject(MAT_DIALOG_DATA) private data) {
    this.action = 'Define';
    if (data) {
      this.datacenter = data;
      this.action = 'Update';
    }
  }

  save(): Promise<any> {
    return this.datacenterService.save(this.datacenter)
      .then((datacenter: Datacenter) => this.dialogRef.close(datacenter))
      .catch(error => this.error = error);
  }

  getNameValidMessage() {
    return this.nameValid.hasError('required') ? 'You must enter a Name.' : '';
  }

  getTitle() {
    return 'Select a Datacenter';
  }
}
