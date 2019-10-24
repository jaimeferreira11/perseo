import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaCab } from 'src/app/models/venta-cab.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(public http: HttpClient) { }


  getById(id: number) {

    // tslint:disable-next-line: max-line-length
    let url = `${environment.API}${environment.ROOT}/ventas/${id}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  grabarVenta(venta: VentaCab) {

    let url = environment.API + environment.ROOT + '/ventas';

    return this.http.post( url , venta)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(inicio: Date, fin: Date) {
    
    // tslint:disable-next-line: max-line-length
    let url = `${environment.API}${environment.ROOT}/ventas?inicio=${inicio}&fin=${fin}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getBySucursal(idSucursal: number, all: boolean, estado: number) {

    // tslint:disable-next-line: max-line-length
    let url = `${environment.API}${environment.ROOT}/ventas/sucursal/${idSucursal}/${all}/${estado}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByCliente(idCliente: number, all: boolean, estado: boolean) {

    // tslint:disable-next-line: max-line-length
    let url = `${environment.API}${environment.ROOT}/ventas/cliente/${idCliente}/${all}/${estado}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
    }

}
