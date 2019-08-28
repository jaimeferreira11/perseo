
import { Empresa } from './empresa.model';
import { TipoDocumento } from './tipo-documento.model';
import { Sucursal } from './sucursal.model';

export class Cliente {

    constructor (
        public idCliente?: number,
        public estado?: boolean,
        public tipoDocumento?: TipoDocumento,
        public nombreApellido?: string,
        public nrodoc?: string,
        public sexo?: string,
        public fechaNaciemiento?: Date,
        public direccion?: string,
        public telefono?: string,
        public telefono1?: string,
        public correo?: string,
        public sucursal?: Sucursal,
        public empresa?: Empresa,
    ) { }

}
