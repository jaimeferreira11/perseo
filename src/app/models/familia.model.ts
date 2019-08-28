import { Empresa } from './empresa.model';

export class Familia {

    constructor (
        public idFamilia?: number,
        public estado?: Boolean,
        public descripcion?: string,
        public porcentajeGanancia?: number,
        public empresa?: Empresa
    ) { }

}
