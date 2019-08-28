import { Perfil } from './perfil.model';

export class Perfilusuario {

    constructor (
        public id?: number,
        public idUsuario?: number,
        public perfil?: Perfil,
    ) { }

}
