;
import { Empresa } from './empresa.model';
import { Usuario } from './usuario.model';
import { Sucursal } from './sucursal.model';

export class Banco {

    constructor (
        public idBanco?: number,
        public estado?: boolean,
        public descripcion?: string,
        public telefono?: string,
        public direccion?: string,
        public sitioweb?: string,
        public email?: string,
        public empresa?: Empresa,
    ) { }

}
