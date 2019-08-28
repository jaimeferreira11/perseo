import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading: boolean = false;


  constructor() { }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
