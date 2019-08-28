import { Perfilusuario } from './perfilusuario.model';
import { Menu } from './menu.model';
import { Empresa } from './empresa.model';
import { Perfil } from './perfil.model';
import { Sucursal } from './sucursal.model';
import { Deposito } from './deposito.model';
export class Usuario {

    constructor(
        public login?: string,
        public password?: string,
        public activo?: boolean,
        public idUsuario?: number,
        public nombreApellido?: string,
        public nroDocumento?: string,
        public correo?: string,
        public perfiles: Perfilusuario [] = [],
        public menues: Menu [] = [],
        public empresa?: Empresa,
        public sucursal?: Sucursal,
        public deposito?: Deposito,
        public perfilActual = new Perfil(),

    ) {}

}
