import { Component, OnInit } from '@angular/core';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-specialtyprocessors',
  templateUrl: './specialtyprocessors.component.html',
  styleUrls: ['./specialtyprocessors.component.scss']
})
export class SpecialtyProcessorsComponent implements OnInit {

  constructor( private helpService: HelpService ) {}

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_RunSpecialtyProcessorsScan');
  }

}
