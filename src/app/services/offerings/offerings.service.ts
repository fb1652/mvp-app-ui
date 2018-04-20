import {Injectable} from '@angular/core';
import {Offering} from '../../models/offering.model';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../support';

declare const window: any;

@Injectable()
export class OfferingsService {

  constructor(private httpClient: HttpClient) {}

  get(): Promise<any> {
    return this.httpClient.get(this.url(), {withCredentials: true}).toPromise()
    .then((offerings: any) => offerings.map((offering: any) => {
      offering = new Offering(offering); // convert to Offering
      switch (offering.Name) { // set images based on name
        case 'Hardware': {
          offering.ImageUrl = 'assets/mainframe-circle.png';
          offering.Overview = Constants.OVERVIEW_HARDWARE;
          offering.Provides = Constants.OVERVIEW_HARDWARE_PROVIDES;
          offering.Prereq = Constants.OVERVIEW_HARDWARE_PREREQ;
          break;
        }
        case 'Software':
        {
            offering.ImageUrl = 'assets/systemsoftware-circle.png';
            offering.Overview = Constants.OVERVIEW_SOFTWARE;
            offering.Overview2Title = 'Features';
            offering.Provides = Constants.OVERVIEW_SOFTWARE_FEATURES;
            offering.Prereq = Constants.OVERVIEW_SOFTWARE_PREREQ;
            break;
        }
        case 'Health Checks':
        {
            offering.ImageUrl = 'assets/healthcheck-circle.png';
          offering.Overview = Constants.OVERVIEW_HC;
          offering.Overview2Title = 'Features';
          offering.Provides = Constants.OVERVIEW_HC_FEATURES;
          offering.Prereq = Constants.OVERVIEW_HC_PREREQ;
          break;
        }
        case 'Capacity Optimization':
          {
          offering.ImageUrl = 'assets/CapacityOptim-circle.png';
          offering.Overview = Constants.OVERVIEW_CAPACITY;
          offering.Overview2Title = 'Features';
          offering.Provides = Constants.OVERVIEW_CAPACITY_FEATURES;
          offering.Prereq = Constants.OVERVIEW_CAPACITY_PREREQ;
          break;
        }
        case 'Specialty Engines': offering.ImageUrl = 'assets/specialtyengines-circle.png'; break;
        case 'Software Standardization': offering.ImageUrl = 'assets/standardization-circle.png'; break;
        default: offering.ImageUrl = 'assets/mainframe-circle.png'; break;
      }
      return offering; // return the new Offering
    }));
  }

  private url(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.OFFERINGS_PATH}`;
  }

}
