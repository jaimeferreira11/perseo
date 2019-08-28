import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Familia } from 'src/app/models/familia.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(public http: HttpClient) { }


  getAll() {
    let url = environment.API + environment.ROOT + '/familias';

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getByEmpresa(id: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/familias/empresa/'  + id + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  getById(id: number) {
    let url = environment.API + environment.ROOT + '/familias/'  + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  save(familia: Familia) {

    let url = environment.API + environment.ROOT + '/familias';

    return this.http.post( url , familia)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
