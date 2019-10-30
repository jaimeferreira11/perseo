;
import { Empresa } from './empresa.model';
import { Usuario } from './usuario.model';
import { Sucursal } from './sucursal.model';

export class Caja {

    constructor (
        public idCaja?: number,
        public estado?: boolean,
        public descripcion?: string,
        public nroCaja?: number,
        public usuario?: Usuario,
        public sucursal?: Sucursal,
        public empresa?: Empresa,
    ) { }

}
