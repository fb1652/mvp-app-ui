import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { Ng2Webstorage } from 'ngx-webstorage';

import { LoginComponent, SpinnerComponent } from '../../components';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SpinnerComponent],
      providers: [UserService],
      imports: [
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
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
