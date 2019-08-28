import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../helper/app.helpers';
import { UsuarioService } from 'src/app/services/services.index';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {

  }

  toggleNavigation() {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
}

}
