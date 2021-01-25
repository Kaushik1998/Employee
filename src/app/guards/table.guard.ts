import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NotifierService } from './../services/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class TableGuard implements CanActivate {
  constructor(
    private api: ApiService,
    private _notifier: NotifierService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable((data) => {
      this.api.validateToken().subscribe(
        (success) => {
          this._notifier.notify('Access Granted.');
          data.next(true);
        },
        (error) => {
          console.log(error);
          this._notifier.notify('Access Denied.');
          data.next(false);
        }
      );
    });
  }
}
