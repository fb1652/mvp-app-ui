import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Data} from '../../models';
import {DatacenterService, DataService, HealthcheckService, HelpService} from '../../services';
import {HealthcheckException} from '../../support';

@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.component.html',
  styleUrls: ['./healthcheck.component.scss']
})
export class HealthcheckComponent implements OnInit, OnDestroy {

  component: String = 'app-healthcheck';
  offeringType = 'Health Checks';
  loading: Boolean = false;
  dataArray: any = [];
  healthcheckSubscription: any;
  selected: any = null;
  tabGroupIndex = 0;

  @Input() data: any;

  constructor(private healthcheckService: HealthcheckService) {}

  ngOnInit() {
    this.healthcheckSubscription = this.healthcheckService.getSelectedChangeEmitter()
    .subscribe((exception) => {
      this.tabGroupIndex = 1;
      this.selected = this.healthcheckService.getHealthcheckException();
    });
    this.dataArray = this.data.Data.report.map((data) => new Data(data));
    this.dataArray.forEach((entry) => {
      const reports = entry.Data.reports.low.concat(entry.Data.reports.medium.concat(entry.Data.reports.high));
      entry.Data.reports.exceptions = new MatTableDataSource<HealthcheckException>(reports);
    });
  }

  ngOnDestroy() {
    this.healthcheckSubscription.unsubscribe();
  }
}
