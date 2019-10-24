

import { Articulo } from './articulo.model';
import { FacturaCab } from './factura-cab.model';

export class FacturaDet {

    constructor (
        public idFacturaDet?: number,
        public concepto?: string,
        public facturaCab?: FacturaCab,
        public cantidad?: number,
        public iva5?: number,
        public iva10?: number,
        public gravada5?: number,
        public gravada10?: number,
        public exenta?: number,
        public precioVenta?: number | any,
        public precioCosto?: number | any,
        public total?: number,
        public descuento?: number,
        public articulo?: Articulo,
    ) { }

}
