import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router, NavigationEnd} from '@angular/router';
import {HelpService} from '../../services/help/help.service';
import {UserService} from '../../services';
import {User} from '../../models';
import {Constants} from '../../support';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {

  copyright = Constants.COPYRIGHT;
  title = Constants.NAME;
  

  active: string;
  slideOutHelp = {name: '', content: ''};

  user: User;
  helpTopic: string;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sidenavHelp') sidenavHelp: MatSidenav;

  private subs: any[] = [];

  constructor(private userService: UserService, private router: Router, private helpService: HelpService) {}

  ngOnInit() {
    this.user = this.userService.user || new User(); // init
    if (!this.userService.user) { this.userService.logout(); } // reset and go to login
    this.subs.push(this.helpService.helpTopic.subscribe((event) => this.helpTopic = event)); // help topic changes
    const activate = () => { // 'activate' the route
      const match = /^\/([^\/\?]+).*$/.exec(this.router.url);
      if (match) { this.active = match[1]; }
    };
    this.subs.push(this.router.events.subscribe((event) => { // route changes
      if (event instanceof NavigationEnd) { activate(); }
    }));
    activate(); // init
    return this.userService.refresh();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  help() {
    this.helpService.setHelpId(this.helpTopic);
    this.sidenavHelp.toggle();
    const hid = this.helpService.getHelpId();
    if (hid) {
      this.helpService.getContent(hid)
      .then((jsonContent) => {
        jsonContent[0].content = jsonContent[0].content
        .replace(/rel="nofollow"/g, 'rel="nofollow noopener noreferrer" target="_blank"');
        this.slideOutHelp = jsonContent[0];
      });
    }
  }

  mriToolkitHelp() {
    this.helpService.setHelpId('HID_InstallToolkit');
  }

  changePassword() {
    return this.router.navigate(['/changePassword']);
  }
  
  logout() {
    return this.userService.logout()
    .catch((error: any) => console.error(error));
  }
}
