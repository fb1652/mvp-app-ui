import {Component, AfterViewInit, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatTableDataSource, MatHorizontalStepper} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {DatacentersListDialog} from '../datacenterslistdialog/datacenterslistdialog.component';
import {DatacenterService, DataService, HelpService, OfferingsService} from '../../services';
import {Attachment, Data, Offering} from '../../models';
import * as Content from '../../content';

@Component({
  selector: 'app-offering-steps',
  templateUrl: './offeringSteps.component.html',
  styleUrls: ['./offeringSteps.component.scss']
})
export class OfferingStepsComponent implements AfterViewInit, OnInit, OnDestroy {

  component: String = 'app-offering-steps';
  loading: Boolean = false;
  currentView = 0;
  data: any = new Data();
  datacenter: any = {};
  steps: FormGroup[] = [];
  offering: Offering = new Offering();
  offerings: Offering[] = [];
  exceptions: any[];
  submission: any = {};
  hid = '';
  runJcl = '';

  private subs: any[] = [];
  private regex = /^\/Catalog(?:\/([^\/?]+))?/; // /Catalog/offering[/...]

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(
    public datacenterService: DatacenterService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private helpService: HelpService,
    private dataService: DataService,
    private offeringsService: OfferingsService,
    private router: Router) {
    this.steps.push(fb.group({datacenter: ['', Validators.required]}));
    this.steps.push(fb.group({toolkit: ['']}));
    this.steps.push(fb.group({attachments: ['', Validators.required]}));
    this.steps.push(fb.group({submit: ['']}));
  }

  ngOnInit() {
    return this.offeringsService.get()
    .then((offerings: any) => this.offerings = offerings) // set offerings
    .then(() => { // setup event listeners
      const activate = () => {
        const match = this.regex.exec(this.router.url);
        const offeringType = match[1];
        if (offeringType !== undefined) {
          this.offering = this.offerings.find((o: any) => o.Name === decodeURI(offeringType));
          if (this.offering) {
            switch (this.offering.Name) {
              case 'Hardware': {
                this.hid = 'HID_RunHardwareScan';
                this.runJcl = Content.Hardware.RUN_JCL;
                break;
              }
              case 'Software': {
                this.hid = 'HID_RunSoftwareScan';
                this.runJcl = Content.Software.RUN_JCL;
                break;
              }
              case 'Health Checks': {
                this.hid = 'HID_RunHCScan';
                this.runJcl = Content.Healthchecks.RUN_JCL;
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
          }
        }
      };
      this.subs.push(this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) { return activate(); }
      }));
      this.subs.push(this.datacenterService.getSelectedChangeEmitter().subscribe((event) => {
        this.datacenter = this.datacenterService.getCurrentDatacenter();
      }));
      activate();
    });
  }

  ngAfterViewInit() {
    // this.stepper._getIndicatorType = () => 'number';
    this.subs.push(this.stepper.selectionChange.subscribe((selection) => {
      if (selection.selectedIndex === 3) { // last step
        this.loading = true;
        return this.dataService.get(this.datacenterService.getCurrentDatacenter(), this.offering.Name) // generate report; TODO refactor
        .then((result) => {
          this.submission.datetime = new Date(result.createdAt).toLocaleString();
          this.submission.confirmation = result.id;
          return this.loading = false;
        })
        .catch(() => this.loading = false);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  handleAttachments(attachments: Attachment[]) {
    if (Array.isArray(attachments)) { // might be some other event
      const missing = this.offering.Required.reduce((missing: string[], type: string) => {
        if (!attachments.find((att) => type === att.type())) { missing.push(type === 'HARDWARE/SOFTWARE' ? 'ENV' : type); }
        return missing;
      }, []);
      if (this.steps[0].invalid) { this.steps[0].setValue(this.datacenter); } // set something for datacenter
      if (missing.length) {
        this.steps[2].reset(); // error
        console.log(missing); // TODO warn on screen
      } else {
        this.steps[2].setValue({attachments: attachments}); // set the value for the form
      }
    }
  }
}
