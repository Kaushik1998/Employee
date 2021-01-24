import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  storeToken(token: string) {
    localStorage.setItem('accessToken', JSON.stringify(token));
  }

  getToken() {
    let token = localStorage.getItem('accessToken');
    return JSON.parse(token);
  }

  storeUsername(username: string) {
    localStorage.setItem('username', JSON.stringify(username));
  }

  getUsername() {
    let username = localStorage.getItem('username');
    return JSON.parse(username);
  }

  clear() {
    localStorage.clear();
  }
}
