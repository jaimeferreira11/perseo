import { Clase } from './clase.model';
import { Perfil } from './perfil.model';

export class Menu {

    constructor (
        public idMenu?: number,
        public estado?: boolean,
        public tipo?: string,
        public perfil: Perfil = new Perfil(),
        public descripcion?: string,
        public icono?: string,
        public orden?: number,
        public clase: Clase = new Clase(),
        public submenues: Menu[] = [],
        public menuAnterior?: Menu,
       
    ) { }

}
