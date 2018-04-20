import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ConfigService, UserService} from '../../services';
import {Constants} from '../../support';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  component: String = 'app-login';
  error: String = '';
  form: FormGroup;
  title = Constants.NAME;
  loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public configService: ConfigService,
    public userService: UserService) {
    this.form = fb.group({ // setup form validation
      email: [null, Validators.email],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    return this.route.queryParams
    .subscribe((params) => {
      if (params && params.reason) {
        this.error = params.reason;
      }
    });
  }

  forgotPassword(): Promise<any> {
    return this.router.navigate(['/forgotPassword']);
  }
  createAccount(): Promise<any> {
    return this.router.navigate(['/createAccount']);
  }

  login(credentials) {
    if (this.form.valid) {
      this.error = ''; // clear the error
      this.loading = true;
      return this.userService.login(credentials) // login
      .then(() => this.loading = false) // stop loading
      .catch((error: any) => {
        this.error = error.error; // display error
        this.loading = false; // stop loading
      });
    }
  }

}
