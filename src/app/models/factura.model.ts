
import { Empresa } from './empresa.model';
import { Caja } from './caja.model';


export class Factura {

    constructor (
        public idFactura?: number,
        public estado?: boolean,
        public establecimiento?: number,
        public puntoExpedicion?: number,
        public nroActual?: number,
        public nroInicial?: number,
        public nroFinal?: number,
        public caja?: Caja,
        public validoDesde?: Date,
        public validoHasta?: Date,
        public timbrado?: number,
        public empresa?: Empresa
    ) { }

}
