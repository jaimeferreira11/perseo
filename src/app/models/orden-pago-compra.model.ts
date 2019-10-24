
import { Empresa } from './empresa.model';
import { CompraCab } from './compra-cab.model';
import { OrdenPagoCab } from './orden-pago-cab.model';

export class OrdenPagoCompra {

    constructor (
        public idOrdenPagoCompra?: number,
        public ordenPagoCab: OrdenPagoCab = new OrdenPagoCab(),
        public compraCab: CompraCab = new CompraCab(),
        public importe?: number | any,
        public empresa?: Empresa,

    ) { }

}
