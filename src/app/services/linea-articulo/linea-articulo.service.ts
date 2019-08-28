import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LineaArticulo } from 'src/app/models/linea-articulo.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineaArticuloService {

  constructor(public http: HttpClient) { }

  
  getByFamilia(id: number) {
    let url = environment.API + environment.ROOT + '/linea-articulos/familia/'  + id ;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(id: number) {
    let url = environment.API + environment.ROOT + '/linea-articulos/empresa/'  + id ;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(linea: LineaArticulo) {

    let url = environment.API + environment.ROOT + '/linea-articulos';

    return this.http.post( url , linea)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
