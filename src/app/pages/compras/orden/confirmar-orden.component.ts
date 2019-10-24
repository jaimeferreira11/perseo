import { Component, OnInit } from '@angular/core';
import { BancoService, CajaService, CompraService, LoadingService, UsuarioService } from 'src/app/services/services.index';
import { OrdenPagoCab } from '../../../models/orden-pago-cab.model';
import { Banco } from 'src/app/models/banco.model';
import { Caja } from '../../../models/caja.model';
import { OrdenPagoCompra } from '../../../models/orden-pago-compra.model';
import { OrdenPagoFp } from 'src/app/models/orden-pago-fp.model';

declare var $: any;
declare var moment: any;
declare var swal: any;


@Component({
  selector: 'app-confirmar-orden',
  templateUrl: './confirmar-orden.component.html',
  styles: []
})
export class ConfirmarOrdenComponent implements OnInit {

  ordenes: OrdenPagoCab[] = [];
  modalDetalles: OrdenPagoCompra[] = [];
  total: number = 0;


  ordenesSeleccionados: OrdenPagoCab[] = [];

  constructor(public _compraService: CompraService,
     private loadingScreenService: LoadingService,
     public _usuarioService: UsuarioService ) { }

  ngOnInit() {

    // $('#modal_forma_pago').modal();

    

    $('#fecha').daterangepicker({
      format: 'DD/MM/YYYY',
      startDate:  moment().startOf('month'),
      endDate: moment(),
    //  dateLimit: { days: 120 },
      showDropdowns: true,
      opens: 'right',
      drops: 'down',
      buttonClasses: ['btn', 'btn-sm'],
      applyClass: 'btn-primary',
      cancelClass: 'btn-default',
      separator: ' - ',
      locale: {
          applyLabel: 'Aceptar',
          cancelLabel: 'Cancelar',
          fromLabel: 'Desde',
          toLabel: 'Hasta',
          customRangeLabel: 'Custom',
          daysOfWeek: ['Do', 'Lu', 'Ma', 'Mie', 'Ju', 'Vi', 'Sa'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                       'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          firstDay: 1
      }

    });
    // tslint:disable-next-line: max-line-length
    $('#fecha').val($('#fecha').data('daterangepicker').startDate.format('YYYY-MM-DD') + ' - ' + $('#fecha').data('daterangepicker').endDate.format('YYYY-MM-DD'));
  }

  


  obtenerOrdenes() {
    this.loadingScreenService.startLoading();
    let fechadesde = $('#fecha').data('daterangepicker').startDate.format('YYYY-MM-DD');
    let fechahasta = $('#fecha').data('daterangepicker').endDate.format('YYYY-MM-DD');
 
    this._compraService.obtenerOrdenesPendientes(fechadesde, fechahasta)
    .subscribe(data => {
      this.ordenes = data;
      this.loadingScreenService.stopLoading();
    });
  }


  agregar(event, compra){

    if (event) {
      this.ordenesSeleccionados.push(compra);
      this.total += compra.importe;
    } else {
      this.ordenesSeleccionados = this.ordenesSeleccionados.filter(c => c.idOrdenPagoCab != compra.idOrdenPagoCab);
      this.total -= compra.importe;
    }

  }

  mostrarOrdenPago(){
    $('#modal_forma_pago').modal();
  }

  grabar(formas) {

    console.log('Grabando....', formas);


    this.loadingScreenService.startLoading();

    this.ordenesSeleccionados.forEach(o => {
        o.pagos = formas;
    });

    this._compraService.confirmarOrden(this.ordenesSeleccionados).subscribe(resp  => {
      swal('Proceso correcto', resp, 'success');
      this.loadingScreenService.stopLoading();
      setTimeout(() => {
        this.cancelar();
      }, 100);

    });
  }


  cancelar () {

    setTimeout(() => {
      this.ordenes = [];
      this.ordenesSeleccionados = [];
    }, 100);

  }

}
