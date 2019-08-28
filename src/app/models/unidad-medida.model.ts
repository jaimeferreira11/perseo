import { Empresa } from './empresa.model';

export class UnidadMedida {

    constructor (
        public idUnidadMedida?: number,
        public estado?: boolean,
        public descripcion?: string,
        public empresa?: Empresa,
    ) { }

}
