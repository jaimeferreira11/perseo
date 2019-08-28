
import { Empresa } from './empresa.model';
import { TipoDocumento } from './tipo-documento.model';
import { Sucursal } from './sucursal.model';

export class Proveedor {

    constructor (
        public idProveedor?: number,
        public estado?: boolean,
        public tipoDocumento?: TipoDocumento,
        public descripcion?: string,
        public nroDoc?: string,
        public sitioweb?: string,
        public timbrado?: string,
        public vencTimbrado?: Date,
        public direccion?: string,
        public telefono2?: string,
        public telefono1?: string,
        public email?: string,
        public empresa?: Empresa,
    ) { }

}
