import {Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {Attachment, Datacenter} from '../../models';
import {DatacenterService, HelpService, SocketService} from '../../services';
import {Constants} from '../../support';
import {stateAnimation} from '../../support/animations';
import * as _ from 'lodash';

declare const window: any;

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  animations: [stateAnimation]
})
export class ScanComponent implements OnInit, OnDestroy {

  columns: string[] = ['Filename', 'Description', 'Type', 'Uploaded', 'Delete'];
  datacenterId: string;
  datacenter: Datacenter = new Datacenter();
  attachments: MatTableDataSource<Attachment>;
  errors: any[] = [];
  selectedAll = false;
  filterValue: string;

  @Input() size = 700;
  @Input() writable: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  private subs: any[] = [];

  constructor(private route: ActivatedRoute,
    private datacenterService: DatacenterService,
    private helpService: HelpService,
    private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('attachment-saved', (data: any) => {
      if (data.datacenterId === this.datacenterId) { // ignore others
        data = data.attachment; // use attachment only now
        let item = this.attachments.data.find((item) => item.Id === data.Id); // find obj that matches the data
        if (!item) { // obj is new if it didn't exist
          item = new Attachment(); // default to empty object
          this.attachments.data = this.attachments.data.concat([item]); // push this item
        }
        Object.assign(item, data, {state: 'saved'}); // refresh item with the updated data & trigger animation
        this.change.emit(this.attachments.data);
      }
    });
    this.socketService.on('attachment-deleted', (data) => {
      if (data.datacenterId === this.datacenterId) { // ignore others
        data = data.attachment; // use attachment only now
        const index = this.attachments.data.findIndex((item) => item.Id === data.Id); // find obj that matches the data
        if (index > -1) { Object.assign(this.attachments.data[index], {state: 'deleted'}); } // trigger animation to remove
      }
    });
    this.subs.push(this.route.params.subscribe(params => {
      this.datacenterId = params['datacenterId'];
      if (this.datacenterId) {
        return this.datacenterService.getById(this.datacenterId)
        .then(datacenter => this.datacenter = datacenter)
        .then(() => this.refresh());
      }
    }));
    this.subs.push(this.datacenterService.getSelectedChangeEmitter().subscribe((item) => {
      this.datacenter = item;
      this.datacenterId = item.Id;
      return this.refresh();
    }));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  refresh(): Promise<any> {
    return this.datacenterService.getAttachments(this.datacenterId)
    .then((attachments) => this.attachments = new MatTableDataSource<Attachment>(attachments))
    .then(() => this.attachments.sort = this.sort)
    .then(() => this.change.emit(this.attachments.data)); // sort
  }

  save(attachment: Attachment): Promise<any> {
    const current = _.omitBy(attachment.raw(), _.isNil);
    const original = _.omitBy(attachment._original, _.isNil);
    if (_.isEqual(current, original)) { return; } // do nothing if it's the original
    return this.datacenterService.updateAttachment(this.datacenterId, attachment) // save
    .then((attachment: Attachment) => this.socketService.emit('save-attachment', { // notify Attachment was saved w/ datacenter context
      datacenterId: this.datacenter.Id,
      attachment: attachment
    }));
  }

  delete(attachment: Attachment): Promise<any> {
    const selected = this.attachments.filteredData.filter((e) => attachment.Id !== e.Id && e['checked']); // add other selected
    selected.push(attachment); // add the clicked attachment
    return selected.reduce((promise, attachment) => {
      return promise.then(() => this.datacenterService.deleteAttachments(this.datacenterId, attachment)) // delete
      .then(() => this.socketService.emit('delete-attachment', { // notify Attachment was deleted w/ datacenter context
        datacenterId: this.datacenter.Id,
        attachment: attachment
      }));
    }, Promise.resolve());
  }

  onUpload(event) {
    return this.refresh()
    .then(() => {
      if (event.xhr.response) {
        const res = JSON.parse(event.xhr.response);
        if (res.errors) { this.errors = res.errors; }
        res.files.forEach((file) => {
          const attachment = this.attachments.data.find((att) => att.Filename === file.filename);
          if (attachment) {
            return this.socketService.emit('save-attachment', { // notify Attachment was saved w/ datacenter context
              datacenterId: this.datacenter.Id,
              attachment: attachment
            });
          }
        });
      }
    });
  }

  url(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.DATACENTERS_PATH}/${this.datacenter.Id}/scans`;
  }

  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.attachments.filter = filterValue;
    this.setSelectedAll();
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }

  select() {
    this.selectedAll = this.attachments.filteredData.reduce((selectedAll, item) => {
      return selectedAll && item['checked'];
    }, true);
  }

  selectAll() {
    this.attachments.filteredData.forEach((item) => item['checked'] = this.selectedAll);
  }

  setSelectedAll() {
    this.selectedAll = this.attachments.filteredData.length === 0 ? false :
    this.attachments.filteredData.reduce((selectedAll, report) => selectedAll && report['checked'], true); // detect selected all
  }

  handleState(attachment: Attachment): void {
    if (attachment['state'] === 'saved') { delete attachment['state']; } // remove the state
    if (attachment['state'] === 'deleted') {
      const index = this.attachments.data.findIndex((item) => item.Id === attachment.Id); // find obj that matches the data
      if (index > -1) { // remove the existing item
        this.attachments.data = this.attachments.data.slice(0, index).concat(this.attachments.data.slice(index + 1)); // remove the item
        this.setSelectedAll();
        this.change.emit(this.attachments.data);
      }
    }
  }
}
