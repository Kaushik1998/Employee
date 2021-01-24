import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../../interfaces/ILogin';
import { ILoginResponse } from '../../interfaces/ILoginResponse';
import { IRegister } from '../../interfaces/IRegister';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly url: string = '';
  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getUrl(): string {
    return this.url;
  }

  login(object: ILogin) {
    return new Observable((data) => {
      this.http.post('/login', object).subscribe((token: ILoginResponse) => {
        console.log('service : ', token);
        this.storage.storeToken(token.accessToken);
        this.storage.storeUsername(token.username);
        data.next(token);
      });
    });
  }

  register(object: IRegister) {
    return this.http.post('/register', object);
  }

  validateToken() {
    return this.http.post('/token', this.storage.getToken());
  }
}
