import { Component, OnInit } from '@angular/core';
import { Recibo } from 'src/app/models/recibo.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Caja } from 'src/app/models/caja.model';
import { UsuarioService, LoadingService, VentasService, CajaService, EmpresaService } from 'src/app/services/services.index';
import { NgForm } from '@angular/forms';


declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styles: []
})
export class ReciboComponent implements OnInit {

  lista: Recibo[] = [];
  recibo: Recibo;
  
  // tabla Paginacion
  listaFiltrada: Recibo[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number;

  empresa: Empresa;
  empresas: Empresa[] = [];
  caja: Caja;
  cajas: Caja[] = [];

  constructor(public _usuarioService: UsuarioService,
    private loadingScreenService: LoadingService,
    public _ventaService: VentasService,
    public _cajaService: CajaService,
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

    this._cajaService.getByEmpresa(id, false, true).subscribe(data => {
      this.cajas = data;
    });

    setTimeout(() => {
      $('.select2').select2();
      this.caja = null;
      $('#selectCaja').val(null).trigger('change');

    }, 100);


  }


  obtenerDatos(id: number, page = 0) {

     this._ventaService.getTalonarioReciboByEmpresa(id, true, false).subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.collectionSize = this.lista.length;
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


  seleccionar(item: Recibo) {

    this.recibo = Object.assign({}, item);
    console.log(this.recibo);

    this.selectListener();
    this.caja = this.recibo.caja;

    setTimeout(() => {
      $('.select2').select2();
      $('#selectCaja').val(this.caja.idCaja).trigger('change');
    }, 100);

  }


  grabar(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this.loadingScreenService.startLoading();


    console.log(this.recibo);

    this.recibo.puntoExpedicion = $('#puntoExpedicion').val();
    this.recibo.establecimiento = $('#establecimiento').val();

    this._ventaService.saveTalonarioRecibo(this.recibo).subscribe((resp: Recibo) => {
      console.log(resp);
      
      swal('Recibo guardada!', '', 'success');
      this.loadingScreenService.stopLoading();
      this.cancelar();
      this.obtenerDatos(this.empresa.idEmpresa);
    });
  }


  cancelar () {

    this.recibo = null;

    setTimeout(() => {
      $('.select2').select2();

      // change
     let self = this;
     $('#selectCaja').val(null).trigger('change');
    }, 100);

  }


  agregar(){
    this.recibo = new Recibo(null, true);
    this.recibo.empresa = this.empresa;


    this.selectListener();

  }


  search(text: string) {
    console.log('Buscando ' + text);

    if (!text) {
      return this.listaFiltrada = this.lista;
    }

    /* this.listaFiltrada =
     this.lista.filter((data: Recibo ) => String(data.timbrado).toLowerCase().indexOf(text.toLowerCase()) > -1

    ); */
  }

  selectListener(){

    setTimeout(() => {
      $('.select2').select2();
      // $('#selectPerfil').val(null).trigger('change');
      let self = this;

      $('#selectCaja').on('select2:select', function (e) {
        let data = e.params.data;
        self.caja = new Caja(data.id);
        self.recibo.caja = self.caja;
      });

    }, 100);

  }

}
