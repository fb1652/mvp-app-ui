import {Component, OnInit} from '@angular/core';
import {HealthcheckService, HelpService} from '../../services';

@Component({
  selector: 'app-healthcheck-exception',
  templateUrl: './healthcheckexception.component.html',
  styleUrls: ['./healthcheckexception.component.scss']
})
export class HealthcheckExceptionComponent implements OnInit {

  component: String = 'app-healthcheck-exception';
  healthcheckSubscription: any;
  selected: any;
  tabGroupIndex = 0;

  constructor(private helpService: HelpService,
    private healthcheckService: HealthcheckService) {
    this.healthcheckSubscription = this.healthcheckService.getSelectedChangeEmitter()
      .subscribe(exception => {
        this.tabGroupIndex = 1;
        this.selected = exception;
      });
  }

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_RunHCScan');
  }
}
