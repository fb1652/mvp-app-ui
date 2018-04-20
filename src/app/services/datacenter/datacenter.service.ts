import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Datacenter, User} from '../../models';
import {Attachment} from '../../models/attachment.model';
import {Constants} from '../../support';

declare const window: any;

@Injectable()
export class DatacenterService {

  currentDatacenter: Datacenter = undefined;
  @Output() selectedDatacenter: EventEmitter<Datacenter> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  delete(datacenter: Datacenter): Promise<any> {
    return this.httpClient.delete(this.url(datacenter.Id), {withCredentials: true}).toPromise();
  }

  get(): Promise<any> {
    return this.httpClient.get(this.url(), {withCredentials: true}).toPromise()
    .then((datacenters: any) => datacenters.map((datacenter) => new Datacenter(datacenter)));
  }

  getById(id: string): Promise<any> {
    return this.httpClient.get(this.url(id), {withCredentials: true}).toPromise()
    .then((datacenter: any) => new Datacenter(datacenter));
  }

  save(datacenter: Datacenter): Promise<any> {
    const action: string = (datacenter.Id === undefined) ? 'post' : 'put';
    return this.httpClient[action](this.url(datacenter.Id), datacenter.raw(), {withCredentials: true}).toPromise()
    .then((raw: any) => datacenter.assign(raw));
  }

  getAttachments(id: string): Promise<any> {
    return this.httpClient.get(this.scanUrl(id), {withCredentials: true}).toPromise()
    .then((attachments: any) => attachments.map((attachment) => new Attachment(attachment)));
  }

  deleteAttachments(id: string, attachment: Attachment): Promise<any> {
    return this.httpClient.delete(`${this.scanUrl(id)}/${attachment.Id}`, {withCredentials: true}).toPromise()
    .then((attachment: any) => attachment);
  }

  updateAttachment(id: string, attachment: Attachment): Promise<any> {
    return this.httpClient.put(this.scanUrl(id), attachment.raw(), {withCredentials: true}).toPromise()
    .then((raw: any) => attachment.assign(raw));
  }

  getCurrentDatacenter() {
    return this.currentDatacenter;
  }

  setCurrentDatacenter(datacenter) {
    this.currentDatacenter = datacenter;
    this.selectedDatacenter.emit(datacenter);
  }

  getSelectedChangeEmitter() {
    return this.selectedDatacenter;
  }

  getUsers(id: string) {
    return this.httpClient.get(this.users(id), {withCredentials: true}).toPromise()
    .then((users: any) => users.map((user) => new User(user)));
  }

  updateUsers(id: string, users: User[]) {
    users = users.map((user) => user.raw()); // get raw list of users
    return this.httpClient.put(this.users(id), users, {withCredentials: true}).toPromise();
  }

  private scanUrl(id: string): string {
    return this.url(id, 'scans');
  }

  private url(id?: string, scan?: string): string {
    id = id === undefined ? '' : `/${id}`;
    scan = scan === undefined ? '' : `/${scan}`;
    return `${window.location.protocol}//${window.location.hostname}${Constants.DATACENTERS_PATH}${id}${scan}`;
  }

  private users(id: string): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.DATACENTERS_PATH}/${id}/users`;
  }

}
