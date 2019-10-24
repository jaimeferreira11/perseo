import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompraCab } from '../../models/compra-cab.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { Proveedor } from '../../models/proveedor.model';
import { OrdenPagoCab } from '../../models/orden-pago-cab.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(public http: HttpClient) { }

  grabarCompra(compra: CompraCab) {

    let url = environment.API + environment.ROOT + '/compras';

    return this.http.post( url , compra)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  obtenerCompras(inicio: Date, fin: Date, proveedores: Number[], estado: number) {

    // tslint:disable-next-line: max-line-length
    let url = `${environment.API}${environment.ROOT}/compras?inicio=${inicio}&fin=${fin}&proveedores=${proveedores}&idEstadoCompra=${estado}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
    }


    grabarOrden(orden: OrdenPagoCab) {

      let url = environment.API + environment.ROOT + '/compras/orden-pago';

      return this.http.post( url , orden)
        .pipe(
          map ((resp: any ) => {
            console.log(resp);
            return resp;
        }));
    }

    confirmarOrden(orden: OrdenPagoCab[]) {

      let url = environment.API + environment.ROOT + '/compras/orden-pago/confirmar';

      return this.http.post( url , orden)
        .pipe(
          map ((resp: any ) => {
            console.log(resp);
            return resp;
        }));
    }

    obtenerOrdenesPendientes(inicio: Date, fin: Date) {

      let url = `${environment.API}${environment.ROOT}/compras/orden-pago/pendientes?inicio=${inicio}&fin=${fin}`;

      return this.http.get( url)
        .pipe(
          map ((resp: any ) => {
            console.log(resp);
            return resp;
        }));
      }

}
