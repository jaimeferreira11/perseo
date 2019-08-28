import { Component, OnInit } from '@angular/core';
import { PaginationPage } from 'src/app/shared/interface/pagination';
import { Empresa } from 'src/app/models/empresa.model';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { EmpresaService, UsuarioService, ProveedoresService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';


declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {

  limit = 10;
  proveedorPage: PaginationPage<Proveedor> = {number: 1, size: this.limit};
  proveedor: Proveedor;

  ver = false;

  empresa: Empresa;
  empresas: Empresa[] = [];
  documentos: TipoDocumento[] = [];



  constructor( public _empresaService: EmpresaService,
    public _usuarioService: UsuarioService,
    public _proveedorService: ProveedoresService) { }

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
      }, 100);

    });


  }




  obtenerDatos(id: number, page = 0) {

    this._proveedorService.getByEmpresa(id, true, false, page, this.limit).subscribe(data => {
      this.proveedorPage = data;
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


  seleccionar(item: Proveedor) {

    this.proveedor = Object.assign({}, item);

    setTimeout(() => {
      $('.select2').select2();
      $('#selectTipoDoc').val(this.proveedor.tipoDocumento.codTipoDoc);
    }, 100);



  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.obtenerDatos(this.empresa.idEmpresa, 0);
    }

    this._proveedorService.getByParams(text , this.empresa.idEmpresa, true, false, 0, this.limit).subscribe(data => {
      this.proveedorPage = data;
    });
  }

  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.proveedor.empresa = this.empresa;
    this.proveedor.tipoDocumento = new TipoDocumento($('#selectTipoDoc').val());

    this._proveedorService.save(this.proveedor).subscribe((resp: Proveedor) => {
      swal('Proveedor guardado!', resp.descripcion, 'success');
      this.cancelar();
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.proveedor = null;

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
    this.proveedor = new Proveedor(null, true, new TipoDocumento('CI'));


  }


  verificarCliente() {

    if (!this.proveedor.nroDoc) {
      return;
    }


    this._proveedorService.getByDoc(this.proveedor.nroDoc).subscribe((data: Proveedor) => {

      this.proveedor = data;
      setTimeout(() => {
        $('.select2').select2();
        $('#selectTipoDoc').val(this.proveedor.tipoDocumento.codTipoDoc);
      }, 100);

    });
  }

}
