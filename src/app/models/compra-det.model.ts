

import { ArticuloDeposito } from './articulo-deposito.model';

export class CompraDet {

    constructor (
        public idCompraDet?: number,
        public concepto?: string,
        public cantidad?: number,
        public precio?: number | any,
        public gravada?: number,
        public exenta?: number,
        public ivaPorcentaje?: number,
        public ivaImporte?: number,
        public tipoProvision?: string,
        public articuloDeposito?: ArticuloDeposito,
    ) { }

}
