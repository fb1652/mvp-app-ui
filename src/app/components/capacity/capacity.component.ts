import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  constructor( private helpService: HelpService ) {}

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_RunCapacityScan');
  }

}
