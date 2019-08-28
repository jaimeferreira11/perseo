import { Injectable } from '@angular/core';
import { Clase } from '../../models/clase.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(public http: HttpClient) { }


  getAll() {
    let url = environment.API + environment.ROOT + '/programas';

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(perfil: Clase) {

    let url = environment.API + environment.ROOT + '/programas';

    return this.http.post( url , perfil)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
