
import { Empresa } from './empresa.model';
import { Caja } from './caja.model';
;

export class Recibo {

    constructor (
        public idRecibo?: number,
        public estado?: boolean,
        public establecimiento?: number,
        public puntoExpedicion?: number,
        public nroRecibo?: number,
        public caja?: Caja,
        public empresa?: Empresa
    ) { }

}
