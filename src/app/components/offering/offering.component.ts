import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {TreeNode} from 'primeng/api';
import {Offering} from '../../models/offering.model';
import {HelpService, OfferingsService} from '../../services';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.scss']
})
export class OfferingComponent implements OnInit, OnDestroy {

  loading: Boolean = false;
  offering: any;

  private sub;
  private regex = /^\/Catalog(?:\/([^\/?]+))?/; // /Catalog/offering[/...]

  constructor(private helpService: HelpService, private offeringsService: OfferingsService, private router: Router) { }

  ngOnInit() {
    const match = () => {
      const match = this.regex.exec(this.router.url);
      let name = match[1];
      if (name !== undefined) { name = decodeURI(name); }
      return name;
    };
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { return this.refresh(match()); }
    });
    return this.refresh(match());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  refresh(name: string): Promise<any> {
    this.loading = true;
    return this.offeringsService.get()
    .then((offerings: Offering[]) => this.offering = offerings.find(o => o.Name === name))
    .then(() => this.loading = false)
    .catch(() => this.loading = false);
  }
}

