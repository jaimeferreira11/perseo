import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompraCab } from '../../models/compra-cab.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';

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
}
