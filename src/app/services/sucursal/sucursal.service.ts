import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/app/models/sucursal.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(public http: HttpClient) { }

  getByEmpresa(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/sucursales/empresa/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(sucursal: Sucursal) {

    let url = environment.API + environment.ROOT + '/sucursales';

    return this.http.post( url , sucursal)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
