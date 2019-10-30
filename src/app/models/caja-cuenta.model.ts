
import { Caja } from './caja.model';
import { Banco } from './banco.model';

export class CajaCuenta {

    constructor (
        public idCajaCuenta?: number,
        public estado?: boolean,
        public tipo?: string,
        public numero?: number,
        public descripcion?: string,
        public cuentaBanco?: string,
        public caja?: Caja,
        public banco: Banco = new Banco(),
    ) { }

}
