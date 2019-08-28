import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empresa } from 'src/app/models/empresa.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(public http: HttpClient) { }


  getAll(all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/empresas/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(empresa: Empresa) {

    let url = environment.API + environment.ROOT + '/empresas';

    return this.http.post( url , empresa)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
