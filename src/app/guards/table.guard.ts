import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ApiService } from '../services/api/api.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TableGuard implements CanActivate {
  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private _snackBar: MatSnackBar
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
          this._snackBar.open('Access Granted.', 'Close', { duration: 2000 });
          data.next(true);
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Access Denied.', 'Close', { duration: 5000 });
          data.next(false);
        }
      );
    });
  }
}
