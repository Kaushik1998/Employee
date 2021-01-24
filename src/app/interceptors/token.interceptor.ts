import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url == `/token`) {
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
