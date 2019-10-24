
import { Empresa } from './empresa.model';
import { OrdenPagoCab } from './orden-pago-cab.model';
import { CajaCuenta } from './caja-cuenta.model';

export class OrdenPagoFp {

    constructor (
        public idOrdenPagoFp?: number,
        public ordenPagoCab: OrdenPagoCab = new OrdenPagoCab(),
        public cajaCuenta: CajaCuenta = new CajaCuenta(),
        public importe?: number | any,
        public cotizacion?: number | any,
        public transaccion?: string,

    ) { }

}
