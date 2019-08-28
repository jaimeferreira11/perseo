import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Menu } from '../../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http: HttpClient) { }


  getAllByPerfil(id: number) {

    let url = `${environment.API}${environment.ROOT}/menu/all/${id}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          localStorage.setItem('perseo_menu', JSON.stringify(resp));
              return resp;
      }));
  }

  getByPerfil(id: number) {

    let url = `${environment.API}${environment.ROOT}/menu/perfil/${id}`;

    return this.http.get( url)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          localStorage.setItem('perseo_menu', JSON.stringify(resp));
              return resp;
      }));
  }

  save(menu: Menu) {

    let url = environment.API + environment.ROOT + '/menu';

    return this.http.post( url , menu)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }


}
