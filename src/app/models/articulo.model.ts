import { Familia } from './familia.model';
import { Marca } from './marca.model';
import { UnidadMedida } from './unidad-medida.model';
import { TipoImpuesto } from './tipo-impuesto.model';
import { Empresa } from './empresa.model';
import { LineaArticulo } from './linea-articulo.model';

export class Articulo {

    constructor (
        public idArticulo?: number,
        public estado?: boolean,
        public tipoImpuesto?: TipoImpuesto,
        public descripcion?: string,
        public codigoBarra?: string,
        public familia?: Familia,
        public marca?: Marca,
        public unidadMedida?: UnidadMedida,
        public lineaArticulo?: LineaArticulo,
        public empresa?: Empresa,
    ) { }

}
