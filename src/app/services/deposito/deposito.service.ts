import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Deposito } from 'src/app/models/deposito.model';


@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  constructor(public http: HttpClient) { }


  getBySucursal(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/depositos/sucursal/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(deposito: Deposito) {

    let url = environment.API + environment.ROOT + '/depositos';

    return this.http.post( url , deposito)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
