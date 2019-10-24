import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProveedoresService, LoadingService, CompraService, ArticulosService, UsuarioService } from 'src/app/services/services.index';
import { Proveedor } from '../../../models/proveedor.model';
import { OrdenPagoCab } from '../../../models/orden-pago-cab.model';
import { CompraCab } from '../../../models/compra-cab.model';
import { NgForm } from '@angular/forms';
import { CompraDet } from '../../../models/compra-det.model';
import { OrdenPagoCompra } from 'src/app/models/orden-pago-compra.model';


declare var $: any;
declare var moment: any;
declare var swal: any;


@Component({
  selector: 'app-registrar-orden',
  templateUrl: './registrar-orden.component.html',
  styles: []
})
export class RegistrarOrdenComponent implements OnInit {

  proveedores: Proveedor[] = [];
  proveedoresSeleccionados: Number[] = [];
  pendientes = true;

  orden  = new OrdenPagoCab();
  detalle: CompraCab[] = [];
  modalDetalles: CompraDet[] = [];

  compraSeleccionados: CompraCab[] = [];


  constructor(public _proveedorService: ProveedoresService,
    private loadingScreenService: LoadingService,
    public _compraService: CompraService,
    public _articuloService: ArticulosService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {

    /* $('#checkAll').click(function () {
      $('input:checkbox').not(this).prop('checked', this.checked);
      
  }); */
   
  }


  ngAfterViewInit(): void {
    this.iniciliazarSelect();
    let self = this;
    $('#selectProveedor').on('select2:select', function (e) {
      let data = e.params.data;
      console.log(data);
      self.buscarProveedor(data.id);
      self.iniciliazarSelect();
    });


    $('#selectProveedor').on('select2:unselect', function (e) {
      console.log(e);
      // eliminar el item
       let data = e.params.data;
      self.proveedoresSeleccionados = self.proveedoresSeleccionados.filter(p => p != data.id);
      if ( self.proveedoresSeleccionados.length < 2) {
        self.orden.beneficiario = null;
      } else {
        self.orden.beneficiario = '';
      }

    });



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

  iniciliazarSelect() {
    $('#selectProveedor').select2({
      language: 'es',
      width: '100%' ,
      placeholder: 'Buscar proveedor...',
      minimumInputLength: 2,
      ajax: {
        url: environment.API + environment.ROOT + '/proveedores/buscador/' + this._usuarioService.usuario.empresa.idEmpresa,
        data: function (params) {
            let query = {
             search: params.term,
           };
          return query;
        },
        processResults: function (data) {
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
  }


  buscarProveedor(id: number) {
    // this.loadingScreenService.startLoading();
    this._proveedorService.getById(id).subscribe(data => {
      this.proveedoresSeleccionados.push(data.idProveedor);
      if(this.proveedoresSeleccionados.length === 1){
        this.orden.beneficiario = data.descripcion;
      } else {
        this.orden.beneficiario = '';
      }
    });

  }

  obtenerCompras(){
    this.loadingScreenService.startLoading();
    let fechadesde = $('#fecha').data('daterangepicker').startDate.format('YYYY-MM-DD');
    let fechahasta = $('#fecha').data('daterangepicker').endDate.format('YYYY-MM-DD');
    let idEstado = this.pendientes ? 1 : 0;
    this._compraService.obtenerCompras(fechadesde, fechahasta, this.proveedoresSeleccionados, idEstado)
    .subscribe(data => {

      data.forEach(element => {
        element.aPagar = 0;
      });

      this.detalle = data;
      this.loadingScreenService.stopLoading();
    });
  }


  cambiarMonto(event, compra){


    compra.aPagar = event;

    // si esta vacio
    if ( compra.aPagar.toString().length === 0 ) {
      compra.aPagar = compra.importe;
    }

    // si el monto ingresado es mayor al total o es cero
    if (Number(compra.aPagar.toString().replace(/[,]/g, '')) > compra.importe ||
    Number(compra.aPagar.toString().replace(/[,]/g, '')) === 0 ) {

      compra.aPagar = compra.importe;
    }

    // si no es numero
    if (isNaN((compra.aPagar.toString().replace(/[,]/g, '')))) {
      compra.aPagar = compra.importe;
    }
    this.numberWithCommas(compra);

    let total = 0;
    this.compraSeleccionados.forEach(c => {
      total += Number(c.aPagar.toString().replace(/[,]/g, ''));
    });
    this.orden.importe = total;

    // calcular la retencion
    if (this.orden.retencion) {
      this.retenerIva(true);
    }
  }

  habilitarInput(event, compra){


    if (event) {
      $('#aPagar' + compra.idCompraCab).attr('disabled', false);
      compra.aPagar = (compra.importe - compra.pagado);
      this.orden.importe += compra.aPagar;
      this.numberWithCommas(compra);
      this.compraSeleccionados.push(compra)

    } else {
      $('#aPagar' + compra.idCompraCab).attr('disabled', true);
      this.orden.importe -= Number(compra.aPagar.toString().replace(/[,]/g, ''));
      compra.aPagar = 0;
      this.compraSeleccionados = this.compraSeleccionados.filter(c => c.idCompraCab != compra.idCompraCab);
    }

    // calcular la retencion
    if(this.orden.retencion){
      this.retenerIva(true);
    }
    console.log('importe total' , this.orden.importe);
    console.log('Compras seleccionadas', this.compraSeleccionados);
  }

  numberWithCommas(compra: CompraCab) {
    let x =  compra.aPagar.toString().replace(/[,]/g, '');
    compra.aPagar = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  retenerIva(event) {

    this.orden.retencion = event;
    if (event) {
      this.orden.importeRetenido = this.orden.importe * 0.3;
    } else {
      this.orden.importeRetenido = 0;
    }
  }

  grabar(f: NgForm) {

    console.log('Grabando....', f);


    let self = this;

    if ( f.invalid ) {
      return;
    }
    this.loadingScreenService.startLoading();

    self.orden.compras = [];
    this.compraSeleccionados.forEach( c => {
      let aux = new OrdenPagoCompra();
      aux.compraCab = c;
      aux.importe = c.aPagar.toString().replace(/[,]/g, '');
      this.orden.compras.push(aux);
    });

    console.log(this.orden);


    this._compraService.grabarOrden(this.orden).subscribe((resp: OrdenPagoCab) => {
      swal('Orden Registrada!', `Orden nro. ${resp.idOrdenPagoCab}`, 'success');
      this.loadingScreenService.stopLoading();
      setTimeout(() => {
        this.cancelar();
      }, 100);

    });
  }


  cancelar () {

    setTimeout(() => {

      this.detalle = [];
      this.orden = new OrdenPagoCab();
      $('#selectProveedor').val(null).trigger('change');
      this.iniciliazarSelect();
    }, 100);

  }

}
