
import { Caja } from './caja.model';
import { Banco } from './banco.model';

export class CajaCuenta {

    constructor (
        public idCajaCuenta?: number,
        public estado?: boolean,
        public numero?: number,
        public descripcion?: string,
        public tipo?: string,
        public cuentaBanco?: string,
        public caja?: Caja,
        public banco?: Banco,
    ) { }

}
