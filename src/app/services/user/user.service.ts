import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {User} from '../../models';
import {Constants} from '../../support';

declare const window: any;

@Injectable()
export class UserService {

  user: User;
  authorization: string;

  constructor(private httpClient: HttpClient, private router: Router, private storage: LocalStorageService) {
    const raw = this.storage.retrieve('user');
    if (raw) {
      this.user = new User(JSON.parse(raw)); // construct a User from the stored raw user
    }
  }

  login(credentials: any): Promise<any> {
    this.authorization = `Basic ${btoa(`${credentials.email}:${credentials.password}`)}`;
    const options = {headers: new HttpHeaders().set('Authorization', this.authorization), withCredentials: true};
    return this.httpClient.get(this.auth(), options).toPromise()
    .then((user: any) => {
      this.user = this.user || new User(); // init if it doesn't exist
      this.user.assign(user); // update User
      this.storage.store('user', JSON.stringify(user)); // store raw user
      return this.router.navigate(['/']); // go home
    })
    .catch((error) => {
      if (error && error.status === 500) {
        if (/PASSWORD_NOT_FOUND/.exec(error.error)) { return Promise.reject({error: 'User does not exist.'}); }
        if (/INVALID_CREDENTIALS/.exec(error.error)) { return Promise.reject({error: 'Invalid Credentials.'}); }
        if (/USER_NOT_FOUND/.exec(error.error)) { return Promise.reject({error: 'User not found.'}); }
      }
      return Promise.reject(error);
    });
  }

  logout(): Promise<any> {
    const options = {params: new HttpParams().set('logout', 'true'), withCredentials: true};
    return this.httpClient.get(this.auth(), options).toPromise()
    .then((value) => {
      delete this.user; // reset
      this.storage.clear(); // empty the session
      return this.router.navigate(['/login']);
    });
  }

  createAccount(credentials: any): Promise<any> {
    return this.httpClient.post(this.auth(), credentials).toPromise();

  }

  changePassword(credentials: any): Promise<any> {
    console.log(this.url());
    return this.httpClient.post(this.url(), credentials, {withCredentials: true}).toPromise();
  }

  resetPassword(email: any): Promise<any> {
   return this.httpClient.put(this.auth(), email).toPromise();
  }

  refresh() {
    return this.httpClient.get(this.url(), {withCredentials: true}).toPromise()
    .then((user: any) => this.user.assign(user))
    .then((user: any) => this.storage.store('user', JSON.stringify(user)));
  }

  updateUser(user: User): Promise<any> {
    return this.httpClient.put(this.url(), user.Offerings, {withCredentials: true}).toPromise()
    .then((user: any) => this.user = new User(user));
  }

  users(): Promise<User[]> {
    return this.httpClient.get(this.usersUrl(), {withCredentials: true}).toPromise()
    .then((users: any[]) => users.map((user) => new User(user)));
  }

  private auth(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.AUTH_PATH}`;
  }

  private url(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.USER_PATH}`;
  }

  private usersUrl(): string {
    return `${window.location.protocol}//${window.location.hostname}${Constants.USERS_PATH}`;
  }

}
