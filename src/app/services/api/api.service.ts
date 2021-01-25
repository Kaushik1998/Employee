import { NotifierService } from './../notifier.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  // url is when we need a link for server.
  // Since we are hosting angular on same server we wont need it
  readonly url: string = '';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private notifier: NotifierService
  ) {}

  getUrl(): string {
    return this.url;
  }

  login(object: ILogin) {
    // Below code also works but for SOLID principle I think its better to follow this approach
    // We can display error here
    // return this.http.post('/login', object);

    return new Observable((data) => {
      this.http.post('/login', object).subscribe(
        (success: ILoginResponse) => {
          console.log('service : ', success);
          this.storage.storeToken(success.accessToken);
          this.storage.storeUsername(success.username);
          data.next(success);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error);
        }
      );
    });
  }

  register(object: IRegister) {
    // Below code also works but for SOLID principle I think its better to follow this approach
    // We can display error here
    // return this.http.post('/register', object);

    return new Observable((data) => {
      this.http.post('/register', object).subscribe(
        (success: ILoginResponse) => {
          data.next(success);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error);
        }
      );
    });
  }

  validateToken() {
    // Below code also works but for SOLID principle I think its better to follow this approach
    // We can display error here
    // return this.http.post('/token', this.storage.getToken());

    return new Observable((data) => {
      this.http.post('/token', this.storage.getToken()).subscribe(
        (success: ILoginResponse) => {
          data.next(success);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error);
        }
      );
    });
  }
}
