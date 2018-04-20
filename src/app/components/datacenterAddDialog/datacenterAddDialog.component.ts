import {Component, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Datacenter } from '../../models/datacenter.model';
import { DatacenterService } from '../../services';
import {FormControl, Validators} from '@angular/forms';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-datacenter-add',
  templateUrl: './datacenterAddDialog.component.html',
  styleUrls: ['./datacenterAddDialog.component.scss']
})

export class DatacenterAddDialog {
  datacenter: Datacenter = new Datacenter();
  error: string;
  action: string;
  nameValid = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<DatacenterAddDialog>,
    private datacenterService: DatacenterService,
   @Inject(MAT_DIALOG_DATA) private data) {
    this.action = 'Define';
    if (data) {
      this.datacenter = data;
      this.action = 'Update';
    }
  }

  goBactToDataCenters() {
     this.dialogRef.close();
}

  save(): Promise<any> {
    if(this.datacenter.Name!== undefined) {
      return this.datacenterService.save(this.datacenter)
        .then((datacenter:Datacenter) => this.dialogRef.close(datacenter))
        .catch(error => this.error = error);
    }
  }

  getNameValidMessage() {
    return this.nameValid.hasError('required') ? 'You must enter a Name.' : '';
  }
}
