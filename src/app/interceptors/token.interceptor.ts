import { myServerUrl } from './../../environments/environment';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url == `${myServerUrl}/token`) {
      const modifiedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.storage.getToken()}`
        ),
        body: { username: this.storage.getUsername() },
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
