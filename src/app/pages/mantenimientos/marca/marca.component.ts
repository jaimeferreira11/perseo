import { Component, OnInit } from '@angular/core';
import { Marca } from '../../../models/marca.model';
import { MarcaService, UsuarioService, EmpresaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: []
})
export class MarcaComponent implements OnInit {

  marca: Marca = new Marca(null);
  lista: Marca[] = [];

  empresa: Empresa;
  empresas: Empresa[] = []


  // tabla Paginacion
  listaFiltrada: Marca[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _marcaService: MarcaService,
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



    this.empresa = this._usuarioService.usuario.empresa;
    this.obtenerDatos(this.empresa.idEmpresa);

    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      console.log('id empresa ' , this._usuarioService.usuario.empresa.idEmpresa);
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerDatos(this.empresa.idEmpresa);
      }, 100);

    });

     
  }

  obtenerDatos(id: number) {

    this._marcaService.getByEmpresa(id).subscribe(data => {
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
     this.lista.filter((data: Marca ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Marca) {

    this.marca = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.marca.empresa = this.empresa;
    this._marcaService.save(this.marca).subscribe((resp: Marca) => {
      swal('Marca guardada!', resp.descripcion, 'success');
      this.marca = new Marca(null);
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.marca = new Marca(null);

  }

}
