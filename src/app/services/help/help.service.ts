import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../support';
declare const window: any;

@Injectable()
export class HelpService {

  private helpSource = new BehaviorSubject<string>('HID_CreateDatacenter');
  helpTopic = this.helpSource.asObservable();
  helpId: string;

  constructor(private httpClient: HttpClient) { }

  setHeaderHelp(topic: string) {
    this.helpSource.next(topic);
  }

  setHelpId(hid: string) {
    this.helpId = hid;
  }

  getHelpId(): string {
    return this.helpId;
  }

  getContent(hid: string): Promise<any> {
    return this.httpClient.get(this.url(hid), {
      withCredentials: true
    }).toPromise();
  }

  private url(id: string): string {
    id = id === undefined ? '' : `/${id}`;
    return `${window.location.protocol}//${window.location.hostname}${Constants.HELP_PATH}${id}`;
  }

}
