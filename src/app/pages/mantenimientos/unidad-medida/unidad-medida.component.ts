import { Component, OnInit } from '@angular/core';
import { UnidadMedida } from '../../../models/unidad-medida.model';
import { Empresa } from 'src/app/models/empresa.model';
import { UsuarioService, EmpresaService, UnidadMedidaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styles: []
})
export class UnidadMedidaComponent implements OnInit {

  unidadMedida: UnidadMedida = new UnidadMedida(null, true);
  lista: UnidadMedida[] = [];

  empresa: Empresa;
  empresas: Empresa[] = [];


  // tabla Paginacion
  listaFiltrada: UnidadMedida[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _unidadMedidadService: UnidadMedidaService,
    public _usuarioService: UsuarioService,
    public _empresaService: EmpresaService) { }

  ngOnInit() {

    setTimeout(() => {
      $('.select2').select2();

      console.log(this.unidadMedida);
      
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

    this._unidadMedidadService.getByEmpresa(id, true, false).subscribe(data => {
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
     this.lista.filter((data: UnidadMedida ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: UnidadMedida) {

    this.unidadMedida = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.unidadMedida.empresa = this.empresa;
    this._unidadMedidadService.save(this.unidadMedida).subscribe((resp: UnidadMedida) => {
      swal('Marca guardada!', resp.descripcion, 'success');
      this.unidadMedida = new UnidadMedida(null, true);
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.unidadMedida = new UnidadMedida(null, true);

  }

}
