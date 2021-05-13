import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams, HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { UserService } from './userService';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers
            .append('Authorization', 'Bearer ' + user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }

}
