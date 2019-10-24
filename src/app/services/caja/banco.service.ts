import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Banco } from '../../models/banco.model';


@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(public http: HttpClient) { }

  getByEmpresa(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/bancos/empresa/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(banco: Banco) {

    let url = environment.API + environment.ROOT + '/bancos';

    return this.http.post( url , banco)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
