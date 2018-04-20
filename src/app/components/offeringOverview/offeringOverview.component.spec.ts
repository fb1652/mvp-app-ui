import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OfferingOverviewComponent} from './offeringOverview.component';

describe('OfferingOverviewComponent', () => {
  let component: OfferingOverviewComponent;
  let fixture: ComponentFixture<OfferingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
