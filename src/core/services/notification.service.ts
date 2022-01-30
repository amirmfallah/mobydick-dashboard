import { BehaviorSubject } from 'rxjs';
import { Configuration } from './../configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}
  show(message: string) {
    this._snackBar.open(message, 'باشه', {
      duration: 2000,
      panelClass: ['snakbar'],
    });
  }
}
