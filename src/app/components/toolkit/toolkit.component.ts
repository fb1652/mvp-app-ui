import {Component, OnInit, ViewChild} from '@angular/core';
import {MatHorizontalStepper, MatVerticalStepper} from '@angular/material';
import {HelpService} from '../../services/help/help.service';

@Component({
    selector: 'app-toolkit',
    templateUrl: './toolkit.component.html',
    styleUrls: ['./toolkit.component.scss']
})
export class ToolkitComponent implements OnInit {
  content: String = '<p> this is toolkit doc</p>';

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  constructor(private helpService: HelpService) {
  }

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_InstallToolkit');
    // return this.helpService.getContent('HID_InstallToolkit')
    //   .then((data) => this.content = data[0].content.replace(/rel="nofollow"/g, 'rel="nofollow noopener noreferrer" target="_blank"'));
  }
}
