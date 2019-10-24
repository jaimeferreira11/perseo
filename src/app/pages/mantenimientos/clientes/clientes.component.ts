import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { PaginationPage } from 'src/app/shared/interface/pagination';
import { Empresa } from 'src/app/models/empresa.model';
import { ClientesService, EmpresaService, UsuarioService, SucursalService } from 'src/app/services/services.index';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { NgForm } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  limit = 10;
  clientePage: PaginationPage<Cliente> = {number: 1, size: this.limit};
  cliente: Cliente;

  ver = false;

  empresa: Empresa;
  empresas: Empresa[] = [];
  documentos: TipoDocumento[] = [];
  sucursal: Sucursal;
  sucursales: Sucursal[] = [];


  constructor( public _empresaService: EmpresaService,
    public _usuarioService: UsuarioService,
    public _sucursalService: SucursalService,
    public _clienteService: ClientesService) { }

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


    this._sucursalService.getByEmpresa(id, false, true).subscribe(data => {
      this.sucursales = data;
  
    });

    


  }

  obtenerDatos(id: number, page = 0) {

    this._clienteService.getByEmpresa(id, true, false, page, this.limit).subscribe(data => {
      this.clientePage = data;
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


  seleccionar(item: Cliente) {

    this.cliente = Object.assign({}, item);

    this.selectListener();
    this.sucursal = this.cliente.sucursal;

    setTimeout(() => {
      $('.select2').select2();
      $('#selectSucursal').val(this.cliente.sucursal.idSucursal).trigger('change');
      $('#selectTipoDoc').val(this.cliente.tipoDocumento.codTipoDoc);
      $('#selectSexo').val(this.cliente.sexo);
    }, 100);



  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.obtenerDatos(this.empresa.idEmpresa, 0);
    }

    this._clienteService.getByParams(text , this.empresa.idEmpresa, true, false, 0, this.limit).subscribe(data => {
      this.clientePage = data;
    });
  }

  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.cliente.empresa = this.empresa;
    this.cliente.tipoDocumento = new TipoDocumento($('#selectTipoDoc').val());
    this.cliente.sexo = $('#selectSexo').val();
    this.cliente.sucursal = this.sucursal;

    this._clienteService.save(this.cliente).subscribe((resp: Cliente) => {
      swal('Cliente guardado!', resp.nombreApellido, 'success');
      this.cancelar();
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.cliente = null;

    setTimeout(() => {
      $('.select2').select2();
      $('#selectEmpresa').val(this._usuarioService.usuario.empresa.idEmpresa).trigger('change');
      this.empresa = this._usuarioService.usuario.empresa;
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
    this.cliente = new Cliente(null, true, new TipoDocumento('CI'));


    this.selectListener();

    setTimeout(() => {
      $('.select2').select2();

      this.sucursal = this._usuarioService.usuario.sucursal;
      $('#selectSucursal').val(this.sucursal.idSucursal).trigger('change');

    }, 100);

  }



  selectListener(){

    setTimeout(() => {
      $('.select2').select2();
      let self = this;

      $('#selectSucursal').on('select2:select', function (e) {
        let data = e.params.data;
        self.sucursal = new Sucursal(data.id);
        self.cliente.sucursal = self.sucursal;
      });

    }, 100);

  }


  verificarCliente() {

    if (!this.cliente.nrodoc) {
      return;
    }


    this._clienteService.getByDoc(this.cliente.nrodoc).subscribe((data: Cliente) => {

      if(data.idCliente !== null){
        this.cliente = data;
        setTimeout(() => {
          $('.select2').select2();
          $('#selectSucursal').val(this.cliente.sucursal.idSucursal).trigger('change');
          $('#selectTipoDoc').val(this.cliente.tipoDocumento.codTipoDoc);
          $('#selectSexo').val(this.cliente.sexo);
        }, 100);
      }

    });
  }

}
