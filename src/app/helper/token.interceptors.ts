import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public _usuarioService: UsuarioService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(this._usuarioService.accessToken);
    
    let currentUser = this._usuarioService.usuario;
        if (currentUser && this._usuarioService.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._usuarioService.accessToken}`
                }
            });
        }

        return next.handle(request);
  }
}
