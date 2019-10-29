import { Component, OnInit, Input } from '@angular/core';
import { FacturaDet } from '../../models/factura-det.model';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styles: []
})
export class DetalleVentaComponent implements OnInit {

  @Input('detalles') detalles: FacturaDet[] = [];
  constructor() { }

  ngOnInit() {

    console.log('Detalles ' + this.detalles.length);

  }

}
