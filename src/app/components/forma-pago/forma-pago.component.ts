import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CajaService, BancoService, UsuarioService } from 'src/app/services/services.index';
import { Banco } from 'src/app/models/banco.model';
import { Caja } from 'src/app/models/caja.model';
import { CajaCuenta } from 'src/app/models/caja-cuenta.model';
import { OrdenPagoFp } from 'src/app/models/orden-pago-fp.model';
import { FacturaFormaCobro } from '../../models/factura-forma-cobro.model';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styles: []
})
export class FormaPagoComponent implements OnInit {

  @Input('total') total: number = 0;
  @Input('saldo')  saldo: number = 0;
  @Input('tipo')  tipo: string = 'pago';
  @Output() enviarFormas: EventEmitter<OrdenPagoFp[]> = new EventEmitter();
  @Output() enviarFormaCobro: EventEmitter<FacturaFormaCobro[]> = new EventEmitter();

  vuelto: number = 0;

  bancos: Banco[] = [];
  cuentas: CajaCuenta[] = [];


  // pago
  forma:  OrdenPagoFp = new OrdenPagoFp();
  formas: OrdenPagoFp[] = [];

  // cobro
  formaCobro:  FacturaFormaCobro = new FacturaFormaCobro();
  formasCobros: FacturaFormaCobro[] = [];

  constructor( public _cajaService: CajaService,
    public _usuarioService: UsuarioService,
    public _bancoService: BancoService,
    ) { }

  ngOnInit() {

    this.obtenerListas();
    this.forma.cajaCuenta.idCajaCuenta = 1;


  }

  obtenerListas() {
    this._cajaService.getCajaCuenta(false, true)
    .subscribe(data => {
      this.forma.cajaCuenta = data[0];
      this.formaCobro.cajaCuenta =  data[0];
      this.cuentas = data;
    });

    this._bancoService.getByEmpresa(this._usuarioService.usuario.empresa.idEmpresa, false, true)
    .subscribe(data => this.bancos = data);
  }

  numberWithCommas() {
    if ( this.tipo === 'pago') {
      let x =  this.forma.importe.toString().replace(/[,]/g, '');
      this.forma.importe = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if ( this.tipo === 'cobro') {
      let x =  this.formaCobro.importe.toString().replace(/[,]/g, '');
      this.formaCobro.importe = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  

  }

  cambiar(valor){

    console.log(valor);
    this.forma.cajaCuenta = Object.assign({}, this.cuentas.find(x => x.idCajaCuenta == valor)) ;
    this.formaCobro.cajaCuenta = Object.assign({}, this.cuentas.find(x => x.idCajaCuenta == valor)) ;
    
  }
  agregar(){
    console.log(this.forma);

    if ( this.tipo === 'pago') {

      let item = Object.assign({}, this.forma);
      item.importe = this.forma.importe.toString().replace(/[,]/g, '');
      this.formas.push(item);
      this.saldo = this.saldo - item.importe;
      this.forma.importe = null;
      this.forma.transaccion = '';
    } else if ( this.tipo === 'cobro') {
      let item = Object.assign({}, this.formaCobro);
      item.importe = this.formaCobro.importe.toString().replace(/[,]/g, '');
      this.formasCobros.push(item);
      this.saldo = this.saldo - item.importe;
      this.formaCobro.importe = null;
      this.formaCobro.referencia = '';
    }


    if ( this.saldo < 0) {
      this.vuelto = this.saldo * -1 ;
      this.saldo = 0;
    }
    

  }

  borrar(item) {

    console.log(item);
    let suma = 0;
    if( this.tipo === 'pago') {

      this.formas = this.formas.filter(obj => obj != item);
       this.formas.forEach(f => {
          suma += Number(f.importe);
      });

    } else if( this.tipo === 'cobro') {

      this.formasCobros = this.formasCobros.filter(obj => obj != item);
       this.formasCobros.forEach(f => {
          suma += Number(f.importe);
      });
    }

    console.log(suma);

    if ( suma > this.total ) {
      this.vuelto = suma - this.total;
      this.saldo = 0;
    } else {
      this.vuelto = 0;
      this.saldo = this.total - suma;
    }

  }

  procesar() {

    if ( this.tipo === 'pago') {
      this.enviarFormas.emit( this.formas );
    } else {
      this.enviarFormaCobro.emit(this.formasCobros);
    }
    $('#modal_forma_pago').modal('toggle');
  }

}
