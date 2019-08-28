import { Empresa } from './empresa.model';
import { Familia } from './familia.model';

export class LineaArticulo {

    constructor (
        public idLineaArticulo?: number,
        public descripcion?: string,
        public familia?: Familia,
        public empresa?: Empresa,
    ) { }

}
