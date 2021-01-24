import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyApiService {
  constructor(private http: HttpClient) {}

  readonly url: string = 'https://dummy.restapiexample.com/api/v1';

  getEmployees() {
    return new Observable((data) => {
      this.http.get(this.url.concat('/employees')).subscribe((success) => {
        data.next(success['data']);
      });
    });
  }

  getEmployee(id: number) {
    return this.http.get(this.url.concat(`/employee/${id}`));
  }
}
