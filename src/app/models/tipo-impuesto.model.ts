export class TipoImpuesto {

    constructor (
        public idTipoImpuesto?: number,
        public estado?: boolean,
        public descripcion?: string,
        public tasa?: number,
        public dividendo?: number,
    ) { }

}
