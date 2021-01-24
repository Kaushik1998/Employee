import { myServerUrl } from './../../../environments/environment';
import { ILoginResponse } from '../../interfaces/ILoginResponse';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IRegister } from '../../interfaces/IRegister';
import { ILogin } from '../../interfaces/ILogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly url: string = myServerUrl;
  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getUrl(): string {
    return this.url;
  }

  login(object: ILogin) {
    return new Observable((data) => {
      this.http
        .post(this.url.concat('/login'), object)
        .subscribe((token: ILoginResponse) => {
          console.log('service : ', token);
          this.storage.storeToken(token.accessToken);
          this.storage.storeUsername(token.username);
          data.next(token);
        });
    });
  }

  register(object: IRegister) {
    return this.http.post(this.url.concat('/register'), object);
  }

  validateToken() {
    return this.http.post(this.url.concat('/token'), this.storage.getToken());
  }
}
