import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Report} from '../../models';
import {Constants} from '../../support';

declare const window: any;

@Injectable()
export class ReportService {

  constructor(private httpClient: HttpClient) {}

  all(): Promise<any> {
    return this.httpClient.get(this.url(), {withCredentials: true}).toPromise()
    .then((reports: any) => reports.map((report) => new Report(report)));
  }

  get(report: Report): Promise<any> {
    const params = new HttpParams().set('datacenter', report.DatacenterId);
    return this.httpClient.get(this.url(report.Id), {params: params, withCredentials: true}).toPromise()
    .then((data: any) => Object.assign(report, {Data: data.data})); // add the data to the report
  }

  delete(report: Report): Promise<any> {
    const params = new HttpParams().set('datacenter', report.DatacenterId);
    return this.httpClient.delete(this.url(report.Id), {params: params, withCredentials: true}).toPromise();
  }

  private url(reportId?: string): string {
    const id = reportId ? `/${reportId}` : '';
    return `${window.location.protocol}//${window.location.hostname}${Constants.REPORTS_PATH}${id}`;
  }

}
