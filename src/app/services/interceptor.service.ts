import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token');
    console.log('Token', token)

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',token),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
