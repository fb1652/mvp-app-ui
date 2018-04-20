import {Component, OnInit} from '@angular/core';
import {HelpService} from '../../services/help/help.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  content: String = '<p> this is the MRI Catalog page!</p>';
  tab = 0;

  constructor(private helpService: HelpService) {}

  ngOnInit() {
    this.helpService.setHeaderHelp('HID_Catalog');
  }
}
