import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PaginationPropertySort } from 'src/app/shared/interface/pagination';
import { Cliente } from '../../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient) { }

  getByEmpresa(id: number, all: boolean, estado: boolean, page: number = 0, pageSize: number = 10, sort: PaginationPropertySort = null) {

    let url = environment.API + environment.ROOT + `/clientes/empresa/${id}/${all}/${estado}?pageSize=${pageSize}&page=${page}`;


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
    let url = environment.API + environment.ROOT + `/clientes/search-params/${id}/${all}/${estado}/${param}/?pageSize=${pageSize}&page=${page}`;


    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));

  }

  getByDoc(doc: string) {

    let url = environment.API + environment.ROOT + '/clientes/doc/' + doc;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

  getById(id: number) {

    let url = environment.API + environment.ROOT + '/clientes/' + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }


  save(cliente: Cliente) {

    let url = environment.API + environment.ROOT + '/clientes';

    return this.http.post( url , cliente)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
