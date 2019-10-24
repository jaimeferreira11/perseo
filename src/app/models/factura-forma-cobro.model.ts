import { FacturaCab } from './factura-cab.model';
import { CajaCuenta } from './caja-cuenta.model';
export class FacturaFormaCobro {

    constructor (
        public idFacturaFormaCobro?: string,
        public importe?: number | any,
        public estado?: boolean,
        public facturaCab?: FacturaCab,
        public cajaCuenta: CajaCuenta = new CajaCuenta(),
        public referencia?: string
    ) { }

}
