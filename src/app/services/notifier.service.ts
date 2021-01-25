import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snackbar: MatSnackBar) {}

  notify(message: string, duration = 2000, actionName = 'Close'): void {
    this.snackbar.open(message, actionName, {  duration: duration });
  }
}
