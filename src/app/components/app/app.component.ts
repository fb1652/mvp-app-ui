import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ConfigService} from '../../services';

declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private title: Title, public configService: ConfigService) {
    this.title.setTitle('MRI');
  }

  ngOnInit() {
    window.addEventListener('unhandledrejection', (event) => {
      window.location.reload(true); // reload
    });
    return this.configService.refresh();
  }

}
