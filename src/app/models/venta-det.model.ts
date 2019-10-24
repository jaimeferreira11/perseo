

import { ArticuloDeposito } from './articulo-deposito.model';
import { Articulo } from './articulo.model';
import { VentaCab } from './venta-cab.model';
import { TipoImpuesto } from './tipo-impuesto.model';

export class VentaDet {

    constructor (
        public idVentaDet?: number,
        public articulo?: Articulo,
        public ventaCab?: VentaCab,
        public cantidad?: number,
        public precioCosto?: number | any,
        public precioVenta?: number | any,
        public tipoImpuesto?: TipoImpuesto,
        public impuesto?: number,
        public tasaDescuento?: number,
        public importeDescuento?: number,
        public total?: number,
        public concepto?: string
    ) { }

}
