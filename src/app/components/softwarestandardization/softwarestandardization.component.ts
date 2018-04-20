import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-softwarestandardization',
  templateUrl: './softwarestandardization.component.html',
  styleUrls: ['./softwarestandardization.component.scss']
})
export class SoftwareStandardizationComponent implements OnInit {

  constructor( private helpService: HelpService ) {}

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_RunSoftwareStandardizationScan');
  }

}
