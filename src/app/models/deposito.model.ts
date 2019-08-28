import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
export class Deposito {

    constructor (
        public idDeposito?: number,
        public estado?: boolean,
        public descripcion?: string,
        public sucursal?: Sucursal,
        public empresa?: Empresa,
    ) { }

}
