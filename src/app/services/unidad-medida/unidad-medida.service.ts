import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UnidadMedida } from 'src/app/models/unidad-medida.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {


  constructor(public http: HttpClient) { }


  getAll() {
    let url = environment.API + environment.ROOT + '/unidad-medidas';

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/unidad-medidas/empresa/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(unidad: UnidadMedida) {

    let url = environment.API + environment.ROOT + '/unidad-medidas';

    return this.http.post( url , unidad)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
