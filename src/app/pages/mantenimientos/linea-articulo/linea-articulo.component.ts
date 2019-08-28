import { Component, OnInit } from '@angular/core';
import { LineaArticulo } from '../../../models/linea-articulo.model';
import { Empresa } from 'src/app/models/empresa.model';
import { LineaArticuloService, UsuarioService, EmpresaService, FamiliaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Familia } from 'src/app/models/familia.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-linea-articulo',
  templateUrl: './linea-articulo.component.html',
  styles: []
})
export class LineaArticuloComponent implements OnInit {

  linea: LineaArticulo = new LineaArticulo(null);
  lista: LineaArticulo[] = [];

  empresa: Empresa;
  empresas: Empresa[] = []

  familia: Familia;
  familias: Familia[] = []


  // tabla Paginacion
  listaFiltrada: LineaArticulo[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _lineaArticuloService: LineaArticuloService,
    public _familiaService: FamiliaService,
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
       self.obtenerFamilias(data.id);

     });

     $('#selectFamilia').on('select2:select', function (e) {
      let data = e.params.data;
      self.familia = new Familia(data.id , null, data.text);
      self.obtenerDatos(self.familia.idFamilia);

    });

    }, 100);



    this.empresa = this._usuarioService.usuario.empresa;


    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerFamilias(this.empresa.idEmpresa);

      }, 100);

    });


  }

  obtenerFamilias(id: number) {

    this._familiaService.getByEmpresa(id, false, true).subscribe(data => {
      this.familias = data;
      
    });

    setTimeout(() => {
      $('.select2').select2();
      this.familia = null;
      $('#selectFamilia').val(null).trigger('change');

    }, 100);
  }


  obtenerDatos(id: number) {

    this._lineaArticuloService.getByFamilia(id).subscribe(data => {
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
     this.lista.filter((data: LineaArticulo ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: LineaArticulo) {

    this.linea = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.linea.empresa = this.empresa;
    this.linea.familia = this.familia;
    this._lineaArticuloService.save(this.linea).subscribe((resp: Familia) => {
      swal('Linea de articulo guardada!', resp.descripcion, 'success');
      this.linea = new LineaArticulo(null);
      this.obtenerDatos(this.familia.idFamilia);
    });
  }


  cancelar () {

    this.linea = new LineaArticulo(null);

  }

}
