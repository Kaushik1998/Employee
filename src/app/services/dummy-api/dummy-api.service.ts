import { NotifierService } from './../notifier.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyApiService {
  constructor(private http: HttpClient, private notifier: NotifierService) {}

  readonly url: string = 'https://dummy.restapiexample.com/api/v1';

  getEmployees() {
    return new Observable((data) => {
      this.http.get(this.url.concat('/employees')).subscribe(
        (success) => {
          data.next(success['data']);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error.message);
        }
      );
    });
  }

  getEmployee(id: number) {
    return new Observable((data) => {
      this.http.get(this.url.concat(`/employee/${id}`)).subscribe(
        (success) => {
          data.next(success['data']);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error.message);
        }
      );
    });
  }
}
