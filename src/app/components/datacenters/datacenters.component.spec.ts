import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { Ng2Webstorage } from 'ngx-webstorage';

import { DatacentersComponent } from './datacenters.component';
import { HeaderComponent, SpinnerComponent } from '../';
import { SocketService, UserService } from '../../services';

describe('DatacentersComponent', () => {
  let component: DatacentersComponent;
  let fixture: ComponentFixture<DatacentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, SpinnerComponent, DatacentersComponent],
      providers: [SocketService, UserService],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        Ng2Webstorage,
        RouterTestingModule.withRoutes([{
          path: 'datacenters',
          component: DatacentersComponent
        }])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
