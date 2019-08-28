import { Empresa } from './empresa.model';
export class Marca {

    constructor (
        public idMarca?: number,
        public descripcion?: string,
        public empresa?: Empresa,
    ) { }

}
