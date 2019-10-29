import { CajaCuenta } from './caja-cuenta.model';
import { ReciboCab } from './recibo-cab.model';
export class ReciboFormaCobro {

    constructor (
        public idReciboFormaCobro?: string,
        public importe?: number | any,
        public estado?: boolean,
        public reciboCab?: ReciboCab,
        public cajaCuenta: CajaCuenta = new CajaCuenta(),
        public referencia?: string
    ) { }

}
