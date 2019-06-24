import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error$ = new Subject<string>();

  constructor() { }

  show(errMsg: string) {
    this.error$.next(errMsg);
    setTimeout(() => this.error$.next(null), 5000);
  }
}
