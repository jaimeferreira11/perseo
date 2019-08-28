
import { Empresa } from './empresa.model';
import { Caja } from './caja.model';

export class Turno {

    constructor (
        public idTurno?: number,
        public estado?: boolean,
        public fecha?: Date,
        public fechaApertura?: Date,
        public fechaCierre?: Date,
        public fechaUltApertura?: Date,
        public fechaUltCierre?: Date,
        public caja?: Caja,
        public totalEfectivo?: number,
        public totalCheque?: number,
        public totalTarjeta?: number,
        public cantVenta?: number,
        public cantVentaNula?: number,
        public cantCompra?: number,
        public cantCompraNula?: number,
        public tipoTurno?: string,
        public empresa?: Empresa,
    ) { }

}
