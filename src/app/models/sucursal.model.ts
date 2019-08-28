import { Empresa } from './empresa.model';
export class Sucursal {

    constructor (
        public idSucursal?: number,
        public estado?: boolean,
        public descripcion?: string,
        public direccion?: string,
        public ciudad?: string,
        public telefono1?: string,
        public telefono2?: string,
        public matriz?: boolean,
        public empresa?: Empresa,
    ) { }

}
