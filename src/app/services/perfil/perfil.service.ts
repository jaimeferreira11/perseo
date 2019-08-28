import { Injectable } from '@angular/core';
import { Perfil } from '../../models/perfil.model';
import { PaginationPage, PaginationPropertySort } from '../../shared/interface/pagination';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Perfilusuario } from '../../models/perfilusuario.model';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {


  constructor(public http: HttpClient) { }

  getAll() {
    let url = environment.API + environment.ROOT + '/perfiles';

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(perfil: Perfil) {

    let url = environment.API + environment.ROOT + '/perfiles';

    return this.http.post( url , perfil)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  deletePerfilUsuario(perfil: Perfilusuario) {

    let url = environment.API + environment.ROOT + '/perfiles/usuario';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: perfil,
    };

    return this.http.delete( url , options)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  addPerfilUsuario(perfil: Perfilusuario) {

    let url = environment.API + environment.ROOT + '/perfiles/usuario';

    return this.http.post( url , perfil)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


}
