import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare var $: any;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styles: []
})
export class AsideComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this._usuarioService.cargarStorage();

    $('body').removeClass('gray-bg');

    setTimeout(function() {
      $('#side-menu').metisMenu();
    }, 300);
  }



}
