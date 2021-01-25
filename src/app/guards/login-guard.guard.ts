import { NotifierService } from './../services/notifier.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private _storage: LocalStorageService,
    private _router: Router,
    private _snackBar: NotifierService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._storage.getToken()) {
      this._router.navigate(['/table']);
      this._snackBar.notify('Already logged in');
      return false;
    } else {
      return true;
    }
  }
}
