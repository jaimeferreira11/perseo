import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  empresa: Empresa;
  lista: Empresa[] = [];

  // tabla Paginacion
  listaFiltrada: Empresa[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  

  constructor(public _empresaService: EmpresaService) { }

  ngOnInit() {

    this.obtenerDatos();
  }

  obtenerDatos() {

    this._empresaService.getAll(true, false).subscribe(data => {
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
     this.lista.filter((data: Empresa ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Empresa) {

    this.empresa = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this._empresaService.save(this.empresa).subscribe((resp: Empresa) => {
      swal('¡Empresa Guardada!', resp.descripcion, 'success');
      this.empresa = null;
      this.obtenerDatos();
    });
  }


  cancelar () {

    this.empresa = null;

  }

  agregar(){
    this.empresa = new Empresa(null, true);
  }
}
