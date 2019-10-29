import { Component, OnInit } from '@angular/core';
import { FacturaCab } from '../../models/factura-cab.model';
import { LoadingService, ClientesService, ArticulosService, VentasService, UsuarioService } from 'src/app/services/services.index';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Cliente } from 'src/app/models/cliente.model';
import { ReciboCab } from 'src/app/models/recibo-cab.model';
import { FacturaDet } from '../../models/factura-det.model';
import { ReciboDet } from 'src/app/models/recibo-det.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-cobrar-factura',
  templateUrl: './cobrar-factura.component.html',
  styles: []
})
export class CobrarFacturaComponent implements OnInit {

  cliente = new Cliente();
  recibo = new ReciboCab();
  facturas: FacturaCab[] = [];

  facturasSeleccionados: FacturaCab[] = [];
  modalDetalles: FacturaDet[] = [];

  math = Math;


  constructor(private loadingScreenService: LoadingService,
    public datePipe: DatePipe,
    public _clienteService: ClientesService,
    public _ventaService: VentasService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
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
                'id': e.idCliente,
                'text': e.descripcion
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
        this.cliente = data;
        
        this.buscarFacturas(this.cliente.idCliente)
      } else {
        this.cliente = new Cliente();
        this.facturas = [];
        this.loadingScreenService.stopLoading();
      }
      
    });

  }

  buscarFacturas(idCliente: number){

    this._ventaService.getPendientesByCliente(idCliente)
    .subscribe(data => {
      this.facturas = data;
      this.loadingScreenService.stopLoading();
    });
  }



  cancelar () {

    setTimeout(() => {
      this.facturas = [];
      this.recibo = new ReciboCab();
      this.cliente = new Cliente();
      $('#selectCliente').val(null).trigger('change');
      this.iniciliazarSelect();
    }, 100);

  }

  mostrarFormaCobro(){
    $('#modal_forma_pago').modal();
  }

  grabar(formas) {

    let self = this;
    this.loadingScreenService.startLoading();
     this.recibo.listFormaPago = formas;
     this.recibo.cliente = this.cliente;

    self.recibo.detalles = [];
    this.facturasSeleccionados.forEach( c => {
      let aux = new ReciboDet();
      aux.facturaCab = c;
      aux.importe = c.aPagar.toString().replace(/[,]/g, '');
      this.recibo.detalles.push(aux);
    });


    console.log('Grabando....', this.recibo);

     this._ventaService.cobrarFactura(this.recibo).subscribe( resp => {
      swal('Factura Cobrada!',  + resp.idReciboCab, 'success');
      this.loadingScreenService.stopLoading();
      setTimeout(() => {
        this.cancelar();
      }, 100);

    }); 

  }


  ////

  cambiarMonto(event, factura: FacturaCab){


    factura.aPagar = event;

    // si esta vacio
    if ( factura.aPagar.toString().length === 0 ) {
      factura.aPagar = factura.importe;
    }

    // si el monto ingresado es mayor al total o es cero
    if (Number(factura.aPagar.toString().replace(/[,]/g, '')) > factura.importe ||
    Number(factura.aPagar.toString().replace(/[,]/g, '')) === 0 ) {

      factura.aPagar = factura.importe;
    }

    // si no es numero
    if (isNaN((factura.aPagar.toString().replace(/[,]/g, '')))) {
      factura.aPagar = factura.importe;
    }
    this.numberWithCommas(factura);

    let total = 0;
    this.facturasSeleccionados.forEach(c => {
      total += Number(c.aPagar.toString().replace(/[,]/g, ''));
    });
    this.recibo.importe = total;

  }

  habilitarInput(event, factura: FacturaCab){


    if (event) {
      $('#aPagar' + factura.idFacturaCab).attr('disabled', false);
      factura.aPagar = factura.saldo ;
      this.recibo.importe += factura.aPagar;
      this.numberWithCommas(factura);
      this.facturasSeleccionados.push(factura)

    } else {
      $('#aPagar' + factura.idFacturaCab).attr('disabled', true);
      this.recibo.importe -= Number(factura.aPagar.toString().replace(/[,]/g, ''));
      factura.aPagar = 0;
      this.facturasSeleccionados = this.facturasSeleccionados.filter(c => c.idFacturaCab != factura.idFacturaCab);
    }


    console.log('importe total' , this.recibo.importe);
    console.log('Recibos seleccionadas', this.facturasSeleccionados);
  }

  numberWithCommas(factura: FacturaCab) {
    let x =  factura.aPagar.toString().replace(/[,]/g, '');
    factura.aPagar = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
