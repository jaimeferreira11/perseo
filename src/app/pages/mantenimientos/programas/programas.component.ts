import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/services/services.index';
import { Clase } from '../../../models/clase.model';
import { NgForm } from '@angular/forms';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styles: []
})
export class ProgramasComponent implements OnInit {

  clase: Clase = new Clase(null, true);
  lista: Clase[] = [];

  // tabla Paginacion
  listaFiltrada: Clase[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  constructor(public _programaService: ProgramaService) { }

  ngOnInit() {

    this.obtenerDatos();
  }

  obtenerDatos() {

    this._programaService.getAll().subscribe(data => {
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
     this.lista.filter((data: Clase ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Clase) {

    this.clase = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this._programaService.save(this.clase).subscribe((resp: Clase) => {
      swal('Programa Guardado!', resp.descripcion, 'success');
      this.clase = new Clase(null, true);
      this.obtenerDatos();
    });
  }


  cancelar () {

    this.clase = new Clase(null, true);

  }

}
