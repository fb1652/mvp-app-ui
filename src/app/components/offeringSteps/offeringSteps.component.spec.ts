import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OfferingStepsComponent} from './offeringSteps.component';

describe('OfferingStepsComponent', () => {
  let component: OfferingStepsComponent;
  let fixture: ComponentFixture<OfferingStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
