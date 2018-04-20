import { Injectable } from '@angular/core';
import {Constants} from '../../support';
import {Datacenter} from '../../models';
import {HttpClient} from '@angular/common/http';
import {Data} from '../../models/data.model';

declare const window: any;

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  get(datacenter: Datacenter, type: string): Promise<any> {
    return this.httpClient.post(this.url(datacenter, type), null, {withCredentials: true}).toPromise();
    // .then((data: any) => data.map(data => new Data(data)));
  }

  private url(datacenter: Datacenter, type: string): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.DATACENTERS_PATH}/${datacenter.Id}/offerings/${type}`;
  }
}
