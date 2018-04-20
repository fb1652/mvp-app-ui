import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-datacenter-user-add',
  templateUrl: './datacenterUserAddDialog.component.html',
  styleUrls: ['./datacenterUserAddDialog.component.scss']
})
export class DatacenterUserAddDialog implements OnInit {

  autocompleteForm: FormControl = new FormControl('', Validators.required);
  autocompleteUsers: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<DatacenterUserAddDialog>, @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.autocompleteForm = new FormControl();
    this.autocompleteUsers = this.autocompleteForm.valueChanges.pipe(startWith(''), map((input) => {
      return input ? this.autocomplete(input) : this.data.others.slice();
    }));
    this.autocompleteForm.setValue(''); // trigger autocomplete refresh
  }

  add() {
    const match = /^([^ ]+) - \w* \w*$/.exec(this.autocompleteForm.value);
    if (match) {
      const index = this.data.others.findIndex((user) => user.Email.toLowerCase() === match[1].toLowerCase());
      if (index > -1) {
        const user = this.data.others[index]; // get user to add
        user.Role = 'USER'; // init role as user for this datacenter
        this.dialogRef.close(index); // return index of selected user
      }
    }
  }

  autocomplete(input: string) { // filter based on value
    input = input.toLowerCase();
    const regex = new RegExp(input);
    return this.data.others.filter((user) => { // apply autocomplete value to these fields
      return (user.Email && regex.test(user.Email.toLowerCase()))
      || (user.First && regex.test(user.First.toLowerCase()))
      || (user.Last && regex.test(user.Last.toLowerCase()));
    });
  }
}
