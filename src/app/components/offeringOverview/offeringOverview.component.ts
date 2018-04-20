import {Component, AfterViewInit, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatHorizontalStepper} from '@angular/material';
import {Offering} from '../../models';
import {HelpService, OfferingsService} from '../../services';

@Component({
  selector: 'app-offering-overview',
  templateUrl: './offeringOverview.component.html',
  styleUrls: ['./offeringOverview.component.scss']
})
export class OfferingOverviewComponent implements AfterViewInit, OnInit, OnDestroy {

  component: String = 'app-offering-overview';
  loading: Boolean = false;
  offering: any;

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  private subs = [];
  private regex = /^\/Catalog(?:\/([^\/?]+))?/; // /Catalog/offering[/...]
  private hid = '';

  constructor(private offeringsService: OfferingsService, private router: Router, private helpService: HelpService) {}

  ngOnInit() {
    const match = () => {
      const match = this.regex.exec(this.router.url);
      let name = match[1];
      if (name !== undefined) { name = decodeURI(name); }
      switch (name) {
        case 'Hardware': {
          this.hid = 'HID_RunHardwareScan';
          break;
        }
        case 'Software': {
          this.hid = 'HID_RunSoftwareScan';
          break;
        }
        case 'Health Checks': {
          this.hid = 'HID_RunHCScan';
          break;
        }
        case 'Capacity Optimization': {
          this.hid = 'HID_RunCapacityScan';
          break;
        }
        case 'Specialty Engines': {
          this.hid = 'HID_RunSpecialtyProcessorsScan';
          break;
        }
        case 'Software Standardization': {
          this.hid = 'HID_RunSoftwareStandardizationScan';
          break;
        }
       }
      this.helpService.setHeaderHelp(this.hid);
      return name;
    };
    this.subs.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { return this.refresh(match()); }
    }));
    return this.refresh(match());
  }

  ngAfterViewInit() {
    // this.stepper._getIndicatorType = () => 'number';
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  refresh(name: string): Promise<any> {
    this.loading = true;
    return this.offeringsService.get()
      .then((offerings: Offering[]) => this.offering = offerings.find(o => o.Name === name))
      .then(() => this.loading = false)
      .catch(() => this.loading = false);
  }

  begin(event) {
    // if (this.offering.Access !== 'allowed') { return; /* do nothing */ }
    return this.router.navigate(['Catalog', this.offering.Name, 'Steps']);
  }
}
