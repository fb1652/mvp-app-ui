import {Injectable} from '@angular/core';
import {Offering} from '../../models/offering.model';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../support';

declare const window: any;

@Injectable()
export class ConfigService {

  config: any = {};

  constructor(private httpClient: HttpClient) {}

  refresh(): Promise<any> {
    return this.httpClient.get(this.url(), {withCredentials: true}).toPromise()
    .then((config: any) => this.config = config);
  }

  private url(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.CONFIG_PATH}`;
  }

}
