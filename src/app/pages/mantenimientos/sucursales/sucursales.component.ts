import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../../models/sucursal.model';
import { NgForm } from '@angular/forms';
import { SucursalService, UsuarioService } from 'src/app/services/services.index';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styles: []
})
export class SucursalesComponent implements OnInit {

  sucursal: Sucursal;
  lista: Sucursal[] = [];

  // tabla Paginacion
  listaFiltrada: Sucursal[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  

  constructor(public _sucursalService: SucursalService, public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.obtenerDatos();
  }

  obtenerDatos() {

    this._sucursalService.getByEmpresa( this._usuarioService.usuario.empresa.idEmpresa , true, false).subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.collectionSize = this.lista.length;
    });

  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.listaFiltrada = this.lista;
    }

    this.listaFiltrada =
     this.lista.filter((data: Sucursal ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Sucursal) {

    this.sucursal = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    console.log(this.sucursal);

  this.sucursal.empresa = this._usuarioService.usuario.empresa;
    this._sucursalService.save(this.sucursal).subscribe((resp: Sucursal) => {
      swal('Sucursal Guardada!', resp.descripcion, 'success');
      this.sucursal = null;
      this.obtenerDatos();
    });
  }


  cancelar () {

    this.sucursal = null;

  }

  agregar(){
    this.sucursal = new Sucursal(null, true);
  }

}
