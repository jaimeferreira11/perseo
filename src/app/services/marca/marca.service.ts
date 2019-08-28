import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Marca } from 'src/app/models/marca.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(public http: HttpClient) { }


  getAll() {
    let url = environment.API + environment.ROOT + '/marcas';

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(id: number) {
    let url = environment.API + environment.ROOT + '/marcas/empresa/'  + id ;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(marca: Marca) {

    let url = environment.API + environment.ROOT + '/marcas';

    return this.http.post( url , marca)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
