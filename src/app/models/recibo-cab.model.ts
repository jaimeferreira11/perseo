
import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
import { Usuario } from './usuario.model';
import { Cliente } from './cliente.model';
import { Caja } from './caja.model';
import { Moneda } from './moneda.model';
import { ReciboFormaCobro } from './recibo-forma-cobro.model';
import { ReciboDet } from './recibo-det.model';

export class ReciboCab {

    constructor (
        public idReciboCab?: number,
        public fecha?: Date | any,
        public cliente: Cliente = new Cliente(),
        public estado?: boolean,
        public moneda?: Moneda,
        public sucursal?: Sucursal,
        public establecimiento?: number,
        public puntoExpedicion?: number,
        public nroRecibo?: number,
        public importe: number = 0,
        public caja?: Caja,
        public usuario?: Usuario,
        public empresa?: Empresa,
        public detalles: ReciboDet[] = [],
        public listFormaPago: ReciboFormaCobro[] = []
    ) { }

}
