import { Component, OnInit } from '@angular/core';
import { Familia } from '../../../models/familia.model';
import { Empresa } from 'src/app/models/empresa.model';
import { FamiliaService, UsuarioService, EmpresaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styles: []
})
export class FamiliaComponent implements OnInit {

  familia: Familia = new Familia(null, true);
  lista: Familia[] = [];

  empresa: Empresa;
  empresas: Empresa[] = []


  // tabla Paginacion
  listaFiltrada: Familia[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _familiaService: FamiliaService,
    public _usuarioService: UsuarioService,
    public _empresaService: EmpresaService) { }

  ngOnInit() {

    setTimeout(() => {
      $('.select2').select2();
      
      // change
     let self = this;
     $('#selectEmpresa').on('select2:select', function (e) {
       let data = e.params.data;
       self.empresa = new Empresa(data.id);
       self.obtenerDatos(data.id);
 
     });

     

    }, 100);



    /* this.empresa = this._usuarioService.usuario.empresa;
    this.obtenerDatos(this.empresa.idEmpresa); */

    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerDatos(this.empresa.idEmpresa);
      }, 100);

    });

     
  }

  obtenerDatos(id: number) {

    this._familiaService.getByEmpresa(id, true, false).subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.collectionSize = this.lista.length;
    });

    setTimeout(() => {
      $('.select2').select2();
    }, 100);
  }

  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.listaFiltrada = this.lista;
    }

    this.listaFiltrada =
     this.lista.filter((data: Familia ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Familia) {

    this.familia = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.familia.empresa = this.empresa;
    this._familiaService.save(this.familia).subscribe((resp: Familia) => {
      swal('Marca guardada!', resp.descripcion, 'success');
      this.familia = new Familia(null, true);
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.familia = new Familia(null, true);

  }

}
