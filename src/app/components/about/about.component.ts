import {Component, OnInit} from '@angular/core';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  content: String = '<p> this is the MRI About page !</p>';

  constructor(private helpService: HelpService) {}

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_AboutMRI');
  }
}
