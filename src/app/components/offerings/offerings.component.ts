import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Offering, User} from '../../models';
import {OfferingsService} from '../../services';
import * as Content from "../../content";

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.scss']
})
export class OfferingsComponent implements OnInit {

  loading: Boolean = false;
  categories: string[] = [];
  offerings: any = {};
  
  constructor(private offeringsService: OfferingsService, private router: Router) {}
  
  ngOnInit() {
    return this.refresh();
  }

  refresh(): Promise<any> {
    this.loading = true;
    return this.offeringsService.get()
    .then((offerings: Offering[]) => offerings.forEach((offering: Offering) => {
      if (!this.categories.find((category) => category === offering.Category)) {
        this.categories.push(offering.Category); // add the category if it doesn't exist yet
        this.offerings[offering.Category] = []; // init this category
      }
     
      this.offerings[offering.Category].push(offering); // add the offering to the category
      
    }))
    .then(() => this.loading = false)
    .catch(() => this.loading = false);
  }

  select(offering: Offering) {
    return this.router.navigate(['Catalog', offering.Name, 'Overview']);
  }
}
