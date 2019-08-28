import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';


declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styles: []
})
export class PerfilesComponent implements OnInit {

  perfil: Perfil = new Perfil(null, true);
  lista: Perfil[] = [];

  // tabla Paginacion
  listaFiltrada: Perfil[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _perfilService: PerfilService) { }

  ngOnInit() {

    this.obtenerDatos();
  }

  obtenerDatos() {

    this._perfilService.getAll().subscribe(data => {
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
     this.lista.filter((data: Perfil ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Perfil) {

    this.perfil = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this._perfilService.save(this.perfil).subscribe((resp: Perfil) => {
      swal('¡Perfil Agregado!', resp.descripcion, 'success');
      this.perfil = new Perfil(null, true);
      this.obtenerDatos();
    });
  }


  cancelar () {

    this.perfil = new Perfil(null, true);

  }


}
