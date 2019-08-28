import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  anio: number = new Date().getFullYear();
  ban = false;

  constructor(public router: Router, public _menuService: MenuService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {

    $('body').addClass('gray-bg');

    // this._menuService.getByPerfil(1).subscribe();

  }


  ingresar( forma: NgForm) {

    this.ban = false;
    if (!forma.valid ) {
      return;
    }

    let usuario = new Usuario(forma.value.login, forma.value.password);
    // asi debe ser el ingreso del medico, ingreso directo sin firebase, debe estar comentado
    this._usuarioService.login(usuario).subscribe( (resp: any) => {

      this.router.navigate(['/home']);

     }, err => {
      this.ban = true;
      console.log('Tokin invalido.. sesion caducada', err);

    });




  }

}
