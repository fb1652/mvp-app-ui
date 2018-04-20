import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Datacenter} from '../../models/datacenter.model';
import {DatacenterService, HelpService} from '../../services';
import {stateAnimation} from '../../support/animations';
import * as _ from 'lodash';

@Component({
  selector: 'app-datacenter',
  templateUrl: './datacenter.component.html',
  styleUrls: ['./datacenter.component.scss'],
  animations: [stateAnimation]
})
export class DatacenterComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  datacenter: Datacenter = new Datacenter();
  editting: boolean;
  name: any = {};
  description: any = {};
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private datacenterService: DatacenterService,
    private helpService: HelpService) {
    this.form = fb.group({
      name: [null, Validators.required],
      description: [null],
      created: [{value: '', disabled: true}],
      updated: [{value: '', disabled: true}],
      role: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_DatacenterPage');
    return this.sub = this.route.params.subscribe((params) => {
      return this.datacenterService.getById(params['datacenterId'])
      .then((datacenter) => this.datacenter = datacenter)
      .then(() => this.name.value = this.datacenter.Name);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    if (this.form.valid) {
      const current = _.omitBy(_.omitBy(this.datacenter.raw(), _.isNil), _.isEmpty);
      const original = _.omitBy(_.omitBy(this.datacenter._original, _.isNil), _.isEmpty);
      const nameChanged = current.name !== original.name;
      const descChanged = current.description !== original.description;
      if (nameChanged || descChanged) { // something changed
        return this.datacenterService.save(this.datacenter) // save the changes
        .then(() => this.name.value = this.datacenter.Name) // update name on breadcrumb
        .then(() => this.name.state = nameChanged ? 'saved' : undefined) // trigger animation
        .then(() => this.description.state = descChanged ? 'saved' : undefined); // trigger animation
      }
    }
  }

  handleState(obj): void {
    delete obj['state']; // remove the state
  }

}
