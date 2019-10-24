import { Injectable } from '@angular/core';
import { PaginationPropertySort } from 'src/app/shared/interface/pagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(public http: HttpClient) { }

  getByEmpresa(id: number, all: boolean, estado: boolean, page: number = 0, pageSize: number = 10, sort: PaginationPropertySort = null) {

    let url = environment.API + environment.ROOT + `/articulos/empresa/${id}/${all}/${estado}?pageSize=${pageSize}&page=${page}`;


    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));

  }

  // tslint:disable-next-line: max-line-length
  getByParams(param: string, id: number, all: boolean, estado: boolean, page: number = 0, pageSize: number = 10, sort: PaginationPropertySort = null) {

    // tslint:disable-next-line: max-line-length
    let url = environment.API + environment.ROOT + `/articulos/search-params/${id}/${all}/${estado}/${param}/?pageSize=${pageSize}&page=${page}`;


    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));

  }

  getById(id: number) {

    let url = environment.API + environment.ROOT + '/articulos/' + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

  save(articulo: Articulo) {

    let url = environment.API + environment.ROOT + '/articulos';

    return this.http.post( url , articulo)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


  // ARTICULO DEPOSITO

  getAriculoDepositoById(id: number) {

    let url = environment.API + environment.ROOT + '/articulos/articulo-deposito/' + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

}
