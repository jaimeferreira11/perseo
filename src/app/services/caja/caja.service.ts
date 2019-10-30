import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Caja } from '../../models/caja.model';
import { CajaCuenta } from '../../models/caja-cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(public http: HttpClient) { }


  getBySucursal(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/cajas/sucursal/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/cajas/empresa/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(caja: Caja) {

    let url = environment.API + environment.ROOT + '/cajas';

    return this.http.post( url , caja)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  // CAJA CUENTA

  getCajaCuenta(all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/cajas/caja-cuenta/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log('Hola');
          console.log(resp);
          return resp;
      }));
  }

  getCajaCuentaByCaja(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/cajas/caja-cuenta/caja/' + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log('Hola');
          console.log(resp);
          return resp;
      }));
  }


  saveCajaCuenta(caja: CajaCuenta) {

    let url = environment.API + environment.ROOT + '/cajas/caja-cuenta';

    return this.http.post( url , caja)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


}
