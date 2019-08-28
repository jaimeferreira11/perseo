import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { MenuService } from '../menu/menu.service';
import { Menu } from 'src/app/models/menu.model';
import { Perfil } from '../../models/perfil.model';

const ROOT = 'api/v1/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  menues: Menu[] = [];
  accessToken: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _menuService: MenuService
  ) {
    this.cargarStorage();
   }


  estaLogueado() {

     return (this.accessToken !== null) ? true : false;
   }


   cargarStorage() {

    this.menues = JSON.parse( localStorage.getItem('perseo_menu') );
    if ( localStorage.getItem('perseo_access_token')) {
      this.accessToken = localStorage.getItem('perseo_access_token');
      this.usuario = JSON.parse( localStorage.getItem('perseo_usuario') );
    } else {
      this.accessToken = null;
      this.usuario = null;
    }

  }

  guardarStorage( accessToken: string, user: Usuario, ) {

    localStorage.setItem('perseo_access_token', accessToken);
    localStorage.setItem('perseo_usuario', JSON.stringify(user));

    this.usuario = user;
    this.accessToken = accessToken;
  }

  borrarStorage( ) {

    this.usuario = null;
    this.accessToken = null;
    localStorage.removeItem('perseo_access_token');
    localStorage.removeItem('perseo_menu');
    localStorage.removeItem('perseo_usuario');
  }


  login( usuario: Usuario ) {

    const url = environment.API_AUTH + '/token';

    const clientId = 'perseoAppClientIdPassword';
    const clientSecret = 'secret';

    const body = new HttpParams()
    .set('username', usuario.login)
    .set('password', usuario.password)
    .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(url, body.toString(), {headers})
      .pipe(map ((resp: any ) => {

        console.log(resp);

        this.guardarStorage( resp.access_token, resp.usuario.usuario);

        return true;

      }));


  }



  logout() {

    this.revokeToken().subscribe((resp) => {
      this.borrarStorage();
      this.router.navigate(['/login']);

    });

  }


  revokeToken() {

    const url = `${environment.API_AUTH}/revoke-token`;
    const headers = {
      'Authorization': `Bearer ${this.accessToken}` ,
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(url, {headers});
  }


  cambiarPassword(oldPassword: string , newPassword: string) {

    const url = `${environment.API}/${ROOT}/cambiar-password`;

    const body = new HttpParams()
    .set('oldPassword', oldPassword)
    .set('newPassword', newPassword);

    return this.http.post(url, body, {responseType: 'text'});

  }

  verificarPassword(password: string ) {

    const url = `${environment.API}/${ROOT}/check-pwd`;

    const body = new HttpParams()
    .set('password', password);

    return this.http.post(url, body, {responseType: 'text'});

  }


  verificarSesion() {

  console.log('API verificando session');
  const url = environment.API + '/api/v1/oauth/check-token';

  return this.http.get(url).subscribe( (resp: any) => {
      console.log('Token valido');
      return true;
     }, err => {

      console.log('Tokin invalido.. sesion caducada');
      this.borrarStorage();
      this.router.navigate(['/login']);

    });


  }

  esRoot() {
    return this.usuario.perfilActual.idPerfil === 1;
  }


  getAllByEmpresa(idempresa: number, all: boolean, estado: boolean) {
    let url = environment.API + environment.ROOT + '/usuarios/empresa/' + idempresa + '/' + all + '/' + estado;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

  getById(id: number) {

    let url = environment.API + environment.ROOT + '/usuarios/' + id;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

  getByLogin(login: string) {
    
    let url = environment.API + environment.ROOT + '/usuarios/login/' + login;

    return this.http.get( url )
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));


  }

  save(usuario: Usuario) {

    let url = environment.API + environment.ROOT + '/usuarios';

    return this.http.post( url , usuario)
      .pipe(
        map ((resp: any ) => {
          console.log(resp);
          return resp;
      }));
  }

}
