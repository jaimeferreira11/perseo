import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../models/caja.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Sucursal } from '../../../models/sucursal.model';
import { UsuarioService, EmpresaService, SucursalService, CajaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styles: []
})
export class CajaComponent implements OnInit {

  caja: Caja = new Caja(null, true);
  lista: Caja[] = [];

  empresa: Empresa;
  empresas: Empresa[] = [];

  sucursal: Sucursal;
  sucursales: Sucursal[] = [];


  // tabla Paginacion
  listaFiltrada: Caja[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;


  constructor(public _usuarioService: UsuarioService, public _cajaService: CajaService,
    public _empresaService: EmpresaService, public _sucursalService: SucursalService) { }

  ngOnInit() {

    setTimeout(() => {
      $('.select2').select2();

      // change
     let self = this;
     $('#selectEmpresa').on('select2:select', function (e) {
       let data = e.params.data;
       self.empresa = new Empresa(data.id);
       self.obtenerSucursales(data.id);

     });

     $('#selectSucursal').on('select2:select', function (e) {
      let data = e.params.data;
      self.sucursal = new Sucursal(data.id , null, data.text);
      self.obtenerDatos(self.sucursal.idSucursal);

    });

    }, 100);



    this.empresa = this._usuarioService.usuario.empresa;


    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerSucursales(this.empresa.idEmpresa);

      }, 100);

    });
  }


  obtenerSucursales(id: number) {

    this._sucursalService.getByEmpresa(id, false, true).subscribe(data => {
      this.sucursales = data;

    });

    setTimeout(() => {
      $('.select2').select2();
      this.sucursal = null;
      $('#selectSucursal').val(null).trigger('change');

    }, 100);
  }


  obtenerDatos(id: number) {

    this._cajaService.getBySucursal(id, true, true).subscribe(data => {
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
     this.lista.filter((data: Caja ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Caja) {

    this.caja = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.caja.empresa = this.empresa;
    this.caja.sucursal = this.sucursal;

    console.log(this.caja);
    
    this._cajaService.save(this.caja).subscribe((resp: Caja) => {
      swal('Caja guardada!', resp.descripcion, 'success');
      this.caja = new Caja(null, true);
      this.obtenerDatos(this.sucursal.idSucursal);
    });
  }


  cancelar () {

    this.caja = new Caja(null, true);

  }

}
