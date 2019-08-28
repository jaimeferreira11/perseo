import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../models/menu.model';
import { NgForm } from '@angular/forms';
import { MenuService, ProgramaService } from '../../../services/services.index';
import { Perfil } from '../../../models/perfil.model';
import { PerfilService } from 'src/app/services/services.index';
import { Clase } from '../../../models/clase.model';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-menues',
  templateUrl: './menues.component.html',
  styles: []
})
export class MenuesComponent implements OnInit {

  menu: Menu = new Menu(null, true, 'M');
  lista: Menu[] = [];
  perfiles: Perfil[] = [];
  programas: Clase[] = [];
  menuAnteriores: Menu[] = [];
 // idPerfil: number;

  // tabla Paginacion
  listaFiltrada: Menu[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;
  constructor(public _menuService: MenuService, public _perfilService: PerfilService,
     public _programaService: ProgramaService) { }

  ngOnInit() {
    $('.select2').select2();
    this._perfilService.getAll().subscribe(data => this.perfiles = data);
    this._programaService.getAll().subscribe(data => this.programas = data);
    

    let self = this;
    $('#selectPerfil').on('select2:select', function (e) {
      let data = e.params.data;
    //  self.idPerfil = data.id;
      self.menu.perfil.idPerfil = data.id;
      self.obtenerDatos(data.id);
    });
  }

  /* cambioPerfil(id: number ){

    this.idPerfil = id;
    this.obtenerDatos(this.idPerfil);
  } */

  obtenerDatos(idperfil: number) {

    console.log(this.menu);
    
    this._menuService.getAllByPerfil(idperfil).subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.collectionSize = this.lista.length;
    });

    this._menuService.getByPerfil(idperfil).subscribe(data => this.menuAnteriores = data);

  }

  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.listaFiltrada = this.lista;
    }

    this.listaFiltrada =
     this.lista.filter((data: Menu ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Menu) {

    console.log(item);
    
    this.menu = Object.assign({}, item);
    if (this.menu.clase) {
      $('#selectPrograma').val(this.menu.clase.idClase).trigger('change');
    } else {
      $('#selectPrograma').val('null').trigger('change');
    }

    if (this.menu.menuAnterior) {
      $('#selectMenu').val(this.menu.menuAnterior.idMenu).trigger('change');
    } else {
      $('#selectMenu').val('null').trigger('change');
    }

  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    if ( this.menu.tipo === 'P') {
      this.menu.menuAnterior = new Menu(Number( $('#selectMenu').val()));
      this.menu.clase = new Clase(Number( $('#selectPrograma').val()));
    }

    console.log(this.menu);

    this._menuService.save(this.menu).subscribe((resp: Menu) => {
      swal('¡Menu grabado!', resp.descripcion, 'success');
      this.obtenerDatos(this.menu.perfil.idPerfil);
      this.menu = new Menu(null, true, 'M' , this.menu.perfil);
    });
  }


  cancelar () {

    this.menu = new Menu(null, true, 'M', this.menu.perfil);
    $('#selectPrograma').val('null').trigger('change');
    $('#selectMenu').val('null').trigger('change');
  }

}
