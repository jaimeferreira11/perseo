import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Proveedor } from 'src/app/models/proveedor.model';
import { PaginationPropertySort } from 'src/app/shared/interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(public http: HttpClient) { }

  getByEmpresa(id: number, all: boolean, estado: boolean, page: number = 0, pageSize: number = 10, sort: PaginationPropertySort = null) {

    let url = environment.API + environment.ROOT + `/proveedores/empresa/${id}/${all}/${estado}?pageSize=${pageSize}&page=${page}`;


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
    let url = environment.API + environment.ROOT + `/proveedores/search-params/${id}/${all}/${estado}/${param}/?pageSize=${pageSize}&page=${page}`;


    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));

  }

  getByDoc(doc: string) {

    let url = environment.API + environment.ROOT + '/proveedores/doc/' + doc;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

  getById(id: number) {

    let url = environment.API + environment.ROOT + '/proveedores/' + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }


  save(proveedor: Proveedor) {

    let url = environment.API + environment.ROOT + '/proveedores';

    return this.http.post( url , proveedor)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }
}
