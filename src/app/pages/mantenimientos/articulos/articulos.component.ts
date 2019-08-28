import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Articulo } from 'src/app/models/articulo.model';
import { PaginationPage } from 'src/app/models/pagination';
import { FamiliaService, LineaArticuloService, MarcaService, UnidadMedidaService } from 'src/app/services/services.index';
import { ArticulosService } from '../../../services/articulos/articulos.service';
import { NgForm } from '@angular/forms';
import { Marca } from '../../../models/marca.model';
import { Familia } from 'src/app/models/familia.model';
import { LineaArticulo } from '../../../models/linea-articulo.model';
import { UnidadMedida } from '../../../models/unidad-medida.model';
import { TipoImpuesto } from '../../../models/tipo-impuesto.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: []
})
export class ArticulosComponent implements OnInit {

  limit = 10;
  articuloPage: PaginationPage<Articulo> = {number: 1, size: this.limit};
  articulo: Articulo;

  empresa: Empresa;
  empresas: Empresa[] = [];
  familia: Familia;
  familias: Familia[] = [];
  marca: Marca;
  marcas: Marca[] = [];
  linea: LineaArticulo;
  lineas: LineaArticulo[] = [];
  unidad: UnidadMedida;
  unidades: UnidadMedida[] = [];

  constructor(public _usuarioService: UsuarioService,
    public _familiaService: FamiliaService,
    public _lineaArticuloService: LineaArticuloService,
    public _marcaService: MarcaService,
    public _articuloService: ArticulosService,
    public _unidadMedidadService: UnidadMedidaService,
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


    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerDatos(this.empresa.idEmpresa);
        this.obtenerListas(this.empresa.idEmpresa);
      }, 100);

    });
    


  }

  obtenerListas(id: number) {


    this._familiaService.getByEmpresa(id, false, true).subscribe(data => {
      this.familias = data;
    });

    this._marcaService.getByEmpresa(id).subscribe(data => {
      this.marcas = data;
    });

    this._unidadMedidadService.getByEmpresa(id, false, true).subscribe(data => {
      this.unidades = data;
    });

    setTimeout(() => {
      $('.select2').select2();
      this.familia = null;
      this.unidad = null;
      this.linea = null;
      this.marca = null;
      $('#selectFamilia').val(null).trigger('change');
      $('#selectMarca').val(null).trigger('change');
      $('#selectUnidad').val(null).trigger('change');
      $('#selectLinea').val(null).trigger('change');


    }, 100);


  }

  obtenerDatos(id: number, page = 0) {

    this._articuloService.getByEmpresa(id, true, false, page, this.limit).subscribe(data => {
      this.articuloPage = data;
    });

    setTimeout(() => {
      $('.select2').select2();
    }, 100);
  }


  onPageChange(page: number): void {

    this.obtenerDatos(this.empresa.idEmpresa, (page - 1));

  }

  cambiarSize() {

    this.obtenerDatos(this.empresa.idEmpresa, 0);
}


  seleccionar(item: Articulo) {

    this.articulo = Object.assign({}, item);

    console.log(this.articulo);

    this.selectListener();
    this.familia = this.articulo.familia;
    this.linea = this.articulo.lineaArticulo;
    this.marca = this.articulo.marca;
    this.unidad = this.articulo.unidadMedida;

    this._lineaArticuloService.getByFamilia(this.familia.idFamilia).subscribe(resp => this.lineas = resp);

    setTimeout(() => {
      $('.select2').select2();

      $('#selectFamilia').val(this.familia.idFamilia).trigger('change');
      $('#selectMarca').val(this.marca.idMarca).trigger('change');
      $('#selectLinea').val(this.linea.idLineaArticulo).trigger('change');
      $('#selectUnidad').val(this.unidad.idUnidadMedida).trigger('change');
      $('#selectImpuesto').val(this.articulo.tipoImpuesto.idTipoImpuesto);
    }, 100);



  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.obtenerDatos(this.empresa.idEmpresa, 0);
    }

    this._articuloService.getByParams(text , this.empresa.idEmpresa, true, false, 0, this.limit).subscribe(data => {
      this.articuloPage = data;
    });
  }

  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.articulo.empresa = this.empresa;
    this.articulo.tipoImpuesto = new TipoImpuesto(Number($('#selectImpuesto').val()));

    this._articuloService.save(this.articulo).subscribe((resp: Articulo) => {
      swal('Articulo guardado!', resp.descripcion, 'success');
      this.cancelar();
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.articulo = null;

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

  }


  agregar(){
    this.articulo = new Articulo(null, true, new TipoImpuesto(10));


    this.selectListener();

  }



  selectListener(){

    setTimeout(() => {
      $('.select2').select2();
      // $('#selectPerfil').val(null).trigger('change');
      let self = this;
      $('#selectFamilia').on('select2:select', function (e) {
        let data = e.params.data;
        self._familiaService.getById(data.id).subscribe(f => {
          self.familia = f;
          self.articulo.familia = self.familia;
        });

        self._lineaArticuloService.getByFamilia(data.id).subscribe(resp => self.lineas = resp);

      });

      $('#selectMarca').on('select2:select', function (e) {
        let data = e.params.data;
        self.marca = new Marca(data.id);
        self.articulo.marca = self.marca;
      });

      $('#selectLinea').on('select2:select', function (e) {
        let data = e.params.data;
        self.linea = new LineaArticulo(data.id);
        self.articulo.lineaArticulo = self.linea;
      });

      $('#selectUnidad').on('select2:select', function (e) {
        let data = e.params.data;
        self.unidad = new UnidadMedida(data.id);
        self.articulo.unidadMedida = self.unidad;
      });

    }, 100);

  }
  

}
