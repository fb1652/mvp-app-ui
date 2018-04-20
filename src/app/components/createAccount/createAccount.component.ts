import {Component, Inject, OnInit, Output} from '@angular/core';
import {Constants} from "../../support/constants";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})

export class CreateAccountComponent {

  component: String = 'app-create-account';
  error: String = '';
  form: FormGroup;
  title = Constants.NAME;
  loading: Boolean = false;
  success: Boolean =false;
  failed:  Boolean =false;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.form = fb.group({ // setup form validation
      email: [null, Validators.email],
      password: [null, Validators.required],
      firstName:[null, Validators.required],
      lastName:[null, Validators.required],
    confirmPassword:[null, Validators.required],
    },{
      validator: [this.MatchPassword,this.passwordPatternForUppercase,this.passwordPatternForNumber,this.passwordPatternForLength]
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
  passwordPatternForNumber(f: FormGroup){
    let password = f.get('password').value;
    let hasNumber = /\d/.test(password);
    const valid = hasNumber;
    if (!valid) {
      f.get('password').setErrors( {passwordPatternForNumber: true} );
    }
    return null;
  }
  passwordPatternForLength(f: FormGroup) {
    let password = f.get('password').value;
    if(password != null){// to get value in input tag
    if (password.length<=8) {
      f.get('password').setErrors({passwordPatternForLength: true});
    }
    }
    return null;
  }
  passwordPatternForUppercase(f: FormGroup) {
    let password = f.get('password').value; // to get value in input tag
    let hasUpper = /[A-Z]/.test(password);
    const valid = hasUpper;
    if (!valid) {
      f.get('password').setErrors({passwordPatternForUppercase: true});
    }
    return null;
  }
    MatchPassword(f: FormGroup) {
    let password = f.get('password').value; // to get value in input tag
    let confirmPassword = f.get('confirmPassword').value; // to get value in input tag
    if(password != confirmPassword) {
      f.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
  createAccount(credentials) {
    if (this.form.valid) {
      this.error = ''; // clear the error
      this.loading = true;
      return this.userService.createAccount(credentials) // login
        .then(() => {
          this.failed=false;
          this.loading = false;
          this.success=true;
        }
       ) // stop loading
        .catch((error: any) => {
          this.success=false;
          console.log(error.error);
          this.error = error.error; // display error
          this.loading = false;
          this.failed=true;
        });
    }
  }
}
