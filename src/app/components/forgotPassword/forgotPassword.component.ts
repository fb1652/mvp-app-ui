import {Component, Inject, OnInit, Output} from '@angular/core';
import {Constants} from "../../support/constants";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})

export class ForgotPasswordComponent {

  component: String = 'app-forgot-password';
  error: String = '';
  form: FormGroup;
  title = Constants.NAME;
  loading: Boolean = false;
  success: Boolean =false;
  failed: Boolean =false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.form = fb.group({ // setup form validation
      email: [null, Validators.email],
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

  goBackToLogin(): Promise<any> {
    return this.router.navigate(['/login']);
  }
  gotoCreateAccount(): Promise<any> {
    return this.router.navigate(['/createAccount']);
  }

  
  forgotPassword(email) {
    if (this.form.valid) {
      this.error = ''; // clear the error
      this.loading = true;
      return this.userService.resetPassword(email) // login
        .then(() => {
          this.failed=false;
          this.loading = false;
            this.success=true;
          }
        ) // stop loading
        .catch((error: any) => {
          this.success=false;
          this.error = error.error; // display error
          this.loading = false;
          this.failed=true;
        });
    }
    }
}

