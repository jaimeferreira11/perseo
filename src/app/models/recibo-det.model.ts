
import { ReciboCab } from './recibo-cab.model';
import { FacturaCab } from './factura-cab.model';

export class ReciboDet {

    constructor (
        public idReciboDet?: number,
        public reciboCab?: ReciboCab,
        public facturaCab?: FacturaCab,
        public cantidad?: number,
        public importe?: number,
        public referencia?: string,
    ) { }

}
