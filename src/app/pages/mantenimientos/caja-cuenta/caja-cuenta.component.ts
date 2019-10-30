import { Component, OnInit } from '@angular/core';
import { CajaCuenta } from '../../../models/caja-cuenta.model';
import { Caja } from 'src/app/models/caja.model';
import { UsuarioService, EmpresaService, BancoService } from 'src/app/services/services.index';
import { CajaService } from '../../../services/caja/caja.service';
import { Empresa } from 'src/app/models/empresa.model';
import { NgForm } from '@angular/forms';
import { Banco } from 'src/app/models/banco.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-caja-cuenta',
  templateUrl: './caja-cuenta.component.html',
  styles: []
})
export class CajaCuentaComponent implements OnInit {

  cajaCuenta: CajaCuenta = new CajaCuenta(null, true, 'E');
  lista: CajaCuenta[] = [];

  empresa: Empresa;
  empresas: Empresa[] = [];
  
  caja: Caja;
  cajas: Caja[] = [];

  bancos: Banco[] = [];


  // tabla Paginacion
  listaFiltrada: CajaCuenta[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  constructor(public _usuarioService: UsuarioService, public _empresaService: EmpresaService,
               public _cajaService: CajaService, public _bancoService: BancoService) { }

  ngOnInit() {

    setTimeout(() => {
      $('.select2').select2();

      // change
     let self = this;
     $('#selectEmpresa').on('select2:select', function (e) {
       let data = e.params.data;
       self.empresa = new Empresa(data.id);
       self.obtenerCajas(data.id);

     });

     $('#selectCaja').on('select2:select', function (e) {
      let data = e.params.data;
      console.log(data);
      
      self.caja = new Caja(data.id , null, data.text);
      console.log(self.caja);
      
      self.obtenerDatos(self.caja.idCaja);

    });

    }, 100);



    this.empresa = this._usuarioService.usuario.empresa;


    this._empresaService.getAll(false, true).subscribe(data => {
      this.empresas = data;
      setTimeout(() => {
        $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
        this.empresa = this._usuarioService.usuario.empresa;
        this.obtenerCajas(this.empresa.idEmpresa);

      }, 100);

    });

    this._bancoService.getByEmpresa(this._usuarioService.usuario.empresa.idEmpresa, false, true)
    .subscribe(data => this.bancos = data);


  }


  obtenerCajas(id: number) {

    this._cajaService.getByEmpresa(id, false, true).subscribe(data => {
      this.cajas = data;

    });

    setTimeout(() => {
      $('.select2').select2();
      this.caja = null;
      $('#selectCaja').val(null).trigger('change');

    }, 100);
  }


  obtenerDatos(id: number) {

    this._cajaService.getCajaCuentaByCaja(id, true, true).subscribe(data => {
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


  seleccionar(item: CajaCuenta) {

    this.cajaCuenta = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    if ( this.cajaCuenta.tipo !== 'B') {
      this.cajaCuenta.banco = new Banco();
    }
    this.cajaCuenta.caja = this.caja;

    console.log(this.cajaCuenta);
    
    this._cajaService.saveCajaCuenta(this.cajaCuenta).subscribe((resp: CajaCuenta) => {
      swal('Caja cuenta guardada!', resp.descripcion, 'success');
      this.cajaCuenta = new CajaCuenta(null, true, 'E');
      this.obtenerDatos(this.caja.idCaja);
    });
  }


  cancelar () {

    this.cajaCuenta = new CajaCuenta(null, true, 'E');

  }

}
