import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert';

import { UsuarioService } from '../services/services.index';
import { LoadingService } from 'src/app/services/services.index';

declare var alertify: any;


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _usuarioService: UsuarioService, private _loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);
            this._loadingService.stopLoading();
            if (err.status === 0 ) {

                swal('No hay conexion con el servidor', 'Favor, intente en unos minutos', 'info');
               // tslint:disable-next-line: deprecation
               return Observable.throw(err);
            }

            if (err.status === 400 && err.url.indexOf('/oauth') === -1) {

                swal('Ups, algo salio mal :(', 'Favor, Favor, intente en unos minutos' , 'warning');
                // tslint:disable-next-line: deprecation
               return Observable.throw(err);
            }

            if (err.status === 401 && err.url.indexOf('/oauth') === -1 ) {

                swal('Tu session a caducado', 'Vuelve a loguearte', 'info');
                // auto logout if 401 response returned from api
                this._usuarioService.logout();
               // location.reload(true);
               return throwError(err);
            }


            if (err.status === 404 ) {

                swal(err.error.message, 'Favor, vuelve a intentar mas tarde' , 'info');
                return throwError(err);

            }

            if (err.status === 403 ) {

                swal(err.error.message, 'No se concedio permiso ' , 'info');
                return throwError(err);

            }

            if (err.status >= 500 ) {

                swal('Ha ocurrido un error', 'Lo sentimos, podria intentarlo mas tarde?' , 'error');
                // auto logout if 401 response returned from api
               // this._usuarioService.logout();
               // location.reload(true);
               return throwError(err);
            }

        
            //  swal(err.error.error_description , '' , 'info');


            return throwError(err);
        }));
    }
}
