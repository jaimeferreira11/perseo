
import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
import { Deposito } from './deposito.model';
import { Articulo } from './articulo.model';

export class ArticuloDeposito {

    constructor (
        public idArticuloDeposito?: number,
        public estado?: boolean,
        public articulo: Articulo = new Articulo(),
        public cantidad?: number,
        public cantidadMinima?: number,
        public cantidadBloqueo?: number,
        public inventarioFisico?: number,
        public nroLote?: number,
        public precioCosto?: number,
        public precioVenta?: number,
        public sucursal?: Sucursal,
        public deposito?: Deposito,
        public empresa?: Empresa,

    ) { }

}
