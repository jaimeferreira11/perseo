import { Component, OnInit, Input } from '@angular/core';
import { CompraDet } from '../../models/compra-det.model';
import { OrdenPagoCompra } from '../../models/orden-pago-compra.model';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styles: []
})
export class DetalleCompraComponent implements OnInit {

  @Input('detalles') detalles: CompraDet[] = [];
  @Input('compras') compras: OrdenPagoCompra[] = [];
  constructor() { }

  ngOnInit() {

    console.log('Detalles ' + this.detalles.length);
    console.log('compras ' + this.compras.length);
    
  }

}
