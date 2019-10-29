import { Component, OnInit } from '@angular/core';
import { VentaCab } from 'src/app/models/venta-cab.model';
import { TipoFactura } from 'src/app/models/tipo-factura.model';
import { VentaDet } from 'src/app/models/venta-det.model';
import { environment } from 'src/environments/environment';
import { LoadingService, ArticulosService, UsuarioService, ClientesService, VentasService } from 'src/app/services/services.index';
import { DatePipe } from '@angular/common';
import { TipoImpuesto } from '../../models/tipo-impuesto.model';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ArticuloDeposito } from '../../models/articulo-deposito.model';
import * as printJS from 'print-js';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styles: []
})
export class RegistrarVentaComponent implements OnInit {

  venta = new VentaCab(null, new TipoFactura(1));

  tipo = 'A';
  condicion = '1';
  detalle = new VentaDet();
  articulo: ArticuloDeposito = new ArticuloDeposito();
  articulos: ArticuloDeposito[] = [];
  servicio: string;

  
  constructor(private loadingScreenService: LoadingService,
    public datePipe: DatePipe,
    public _clienteService: ClientesService,
    public _articuloService: ArticulosService,
    public _ventaService: VentasService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {


   // printJS('http://localhost:8080/public2/document/facturas/fact1559931997127.pdf');
  //  printJS({printable: 'http://localhost:8080/public2/document/facturas/fact1559931997127.pdf', type:'pdf', showModal:true})
    
  }




  numberWithCommas() {
    let x =  this.detalle.precioVenta.toString().replace(/[,]/g, '');
    console.log('Inicial', x);

    console.log(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    this.detalle.precioVenta = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
   // return  x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

}

ngAfterViewInit(): void {
  this.iniciliazarSelect();
  let self = this;
  $('#selectCliente').on('select2:select', function (e) {
    let data = e.params.data;
    console.log(data);
    self.buscarCliente(data.id);
    self.iniciliazarSelect();
  });
  $('#selectArticulo').on('select2:select', function (e) {
    let data = e.params.data;
    console.log(data);
    self.buscarArticulo(data.id);
    self.iniciliazarSelect();
  });
}

iniciliazarSelect() {
  $('#selectCliente').select2({
    language: 'es',
    width: '100%' ,
    placeholder: 'Buscar cliente...',
    minimumInputLength: 2,
    ajax: {
      url: environment.API + environment.ROOT + '/clientes/buscador/' + this._usuarioService.usuario.empresa.idEmpresa,
      data: function (params) {
          let query = {
           search: params.term,
         };
        return query;
      },
      processResults: function (data) {
        console.log(data);
        let res = [];
        data.forEach(e => {

            res.push({
              'id': e.idProveedor,
              'text': e.descripcion
            });
        });
        return {
          results: res
        };

      }
    }
  });

  

  $('#selectArticulo').select2({
    language: 'es',
    width: '100%' ,
    placeholder: 'Buscar articulo...',
    minimumInputLength: 2,
    ajax: {
      url: environment.API + environment.ROOT + '/articulos/buscador/articulo-deposito/' + this._usuarioService.usuario.idUsuario,
      data: function (params) {
          let query = {
           search: params.term,
         };
        return query;
      },
      processResults: function (data) {
        console.log(data);

        let res = [];
        data.forEach(e => {
            res.push({
              'id': e.idArticuloDeposito,
              'text': e.articulo.descripcion
            });
        });
        return {
          results: res
        };

      }
    }
  });


}

  buscarCliente(id) {

    console.log('Buscando cliente ', id);

    this.loadingScreenService.startLoading();
    this._clienteService.getByDoc(id).subscribe(data => {

      if ( data.idCliente !== null) {
        console.log('seteando el cliente');
        this.venta.cliente = data;
      } else {
        this.venta.cliente = new Cliente();
        this.venta.cliente.nrodoc = id;
      }
      this.loadingScreenService.stopLoading();
    });
  
  }
  buscarArticulo(id: number) {
  
    this._articuloService.getAriculoDepositoById(id).subscribe(data => {
      this.articulo = data;
      this.detalle.precioVenta = data.precioVenta;
    });
  
  }

  cambiaTipo() {

    if ( this.tipo === 'S') {
      this.detalle.cantidad = 1;
    } else {

      this.detalle.cantidad = null;
    }

    setTimeout(() => {
      $('#selectArticulo').val(null).trigger('change');
      this.iniciliazarSelect();
      let self = this;
      $('#selectArticulo').on('select2:select', function (e) {
        let data = e.params.data;
        console.log(data);
        self.buscarArticulo(data.id);
        self.iniciliazarSelect();
      });
    }, 100);
  }


  agregar(){

    this.detalle.precioVenta = this.detalle.precioVenta.toString().replace(/[,]/g, '');
    if (this.tipo === 'S') {
      this.detalle.concepto = this.servicio;
      let idiva = Number($('#selectImpuesto').val());
      if ( idiva === 100 ) {
        this.detalle.impuesto = 0;
        this.detalle.tipoImpuesto = new TipoImpuesto(100);
      } else {
        this.detalle.impuesto = (this.detalle.precioVenta * this.detalle.cantidad) / Number($('#selectImpuesto').val());
        this.detalle.tipoImpuesto = new TipoImpuesto(idiva);
      }

    } else {
      this.detalle.concepto = this.articulo.articulo.descripcion;
      this.detalle.articulo = this.articulo.articulo ;
      this.detalle.impuesto = (this.articulo.precioVenta * this.detalle.cantidad) / this.articulo.articulo.tipoImpuesto.dividendo;
      this.detalle.tipoImpuesto = this.articulo.articulo.tipoImpuesto;
    }

    this.venta.importe += this.articulo.precioVenta * this.detalle.cantidad;
    this.venta.impuesto += this.detalle.impuesto;
    this.venta.detalles.push(this.detalle);
    this.detalle = new VentaDet();
    this.servicio = '';
    this.articulo = new ArticuloDeposito();
    if (this.tipo === 'S') { this.detalle.cantidad = 1; }
  }


  grabar(formas) {

    
    this.loadingScreenService.startLoading();
    
    this.venta.formasCobro = formas;
    this.venta.tipoFactura.idTipoFactura = Number(this.condicion);
    console.log('Grabando....', this.venta);

  // this.sucursal.empresa = this._usuarioService.usuario.empresa;
    this._ventaService.grabarVenta(this.venta).subscribe((resp: VentaCab) => {
      swal('Venta Registrada!', '', 'success');
      this.loadingScreenService.stopLoading();
      setTimeout(() => {
        this.cancelar();
      }, 100);

    });
  }


  cancelar () {

    setTimeout(() => {
      this.venta = new VentaCab(null, new TipoFactura(1));
      this.venta.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      
      // this.tipo = 'A';
      this.detalle = new VentaDet();
      this.articulo = new ArticuloDeposito();
      if (this.tipo === 'S') { this.detalle.cantidad = 1; }
      this.articulos = [];
      this.servicio = '';
      $('#selectArticulo').val(null).trigger('change');
      $('#selectCliente').val(null).trigger('change');
      this.iniciliazarSelect();
    }, 100);

  }

  borrar(item: VentaDet) {

    this.venta.detalles = this.venta.detalles.filter(e => e !== item);
    this.venta.importe -= item.precioVenta * item.cantidad;
  }

  editar(item) {
    this.borrar(item);
    this.detalle = item;
    this.servicio = item.concepto;
  }


  mostrarFormaCobro(){
    $('#modal_forma_pago').modal();
  }

}
