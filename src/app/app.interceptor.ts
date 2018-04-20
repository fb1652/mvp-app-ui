import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

declare const window: any;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router, private storage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const self = this;
    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          self.storage.clear(); // empty the session
          return self.router.navigate(['/login']);
        }
        if (err.status === 403) {
          self.storage.clear(); // empty the session
          return self.router.navigate(['/login'], { queryParams: { reason: 'Forbidden.' }});
        }
      }
    });
  }

}
