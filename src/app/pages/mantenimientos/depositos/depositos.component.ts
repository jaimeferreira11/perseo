import { Component, OnInit } from '@angular/core';
import { Deposito } from '../../../models/deposito.model';
import { UsuarioService, DepositoService, SucursalService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal.model';
import { element } from 'protractor';


declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styles: []
})
export class DepositosComponent implements OnInit {

  deposito: Deposito;
  lista: Deposito[] = [];
  sucursales: Sucursal[] = [];
  sucursal: Sucursal;

  // tabla Paginacion
  listaFiltrada: Deposito[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  

  constructor(public _depositoService: DepositoService, public _sucursalService: SucursalService,
     public _usuarioService: UsuarioService) { }

  ngOnInit() {


    this._sucursalService.getByEmpresa(this._usuarioService.usuario.empresa.idEmpresa, false, true)
    .subscribe(data => {
      this.sucursales = data;
      setTimeout(() => {
        $('.select2').select2();
      }, 100);
      // change
      let self = this;
      $('#selectSucursal').on('select2:select', function (e) {
        let elemento = e.params.data;
        self.sucursal = new Sucursal(elemento.id, true, elemento.text);
        self.obtenerDatos(elemento.id);

      });
    });




  }

  obtenerDatos(id: number) {


    this._depositoService.getBySucursal(id , true, false).subscribe(data => {
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
     this.lista.filter((data: Deposito ) => data.descripcion.toLowerCase().indexOf(text.toLowerCase()) > -1

    );
  }


  seleccionar(item: Deposito) {

    this.deposito = Object.assign({}, item);
  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    console.log(this.deposito);

  // this.sucursal.empresa = this._usuarioService.usuario.empresa;
    this._depositoService.save(this.deposito).subscribe((resp: Deposito) => {
      swal('Deposito Guardado!', resp.descripcion, 'success');
      this.deposito = null;

      setTimeout(() => {
        $('.select2').select2();
        $('#selectSucursal').val(this.sucursal.idSucursal).trigger('change');
      }, 100);
      this.obtenerDatos(this.sucursal.idSucursal);

    });
  }


  cancelar () {

    this.deposito = null;

  }

  agregar(){
    this.deposito = new Deposito(null, true, null, this.sucursal, this._usuarioService.usuario.empresa);
  }

}