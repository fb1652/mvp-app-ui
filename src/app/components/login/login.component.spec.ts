import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { Ng2Webstorage } from 'ngx-webstorage';

import { LoginComponent } from './login.component';
import { SpinnerComponent } from '../../components';
import { UserService } from '../../services';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SpinnerComponent],
      providers: [UserService],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        Ng2Webstorage,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: LoginComponent
        }])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
