
import { Empresa } from './empresa.model';
import { Proveedor } from './proveedor.model';
import { Sucursal } from './sucursal.model';
import { EstadoCompra } from './estado-compra.model';
import { Turno } from './turno.model';
import { CompraDet } from './compra-det.model';

export class CompraCab {

    constructor (
        public idCompraCab?: number,
        public condicion?: string,
        public tipo?: string,
        public fecha?: Date | any,
        public comprobante?: string,
        public proveedor: Proveedor = new Proveedor(),
        public sucursal?: Sucursal,
        public importe: number = 0,
        public pagado?: number,
        public gravada10?: number,
        public gravada5?: number,
        public iva10?: number,
        public iva5?: number,
        public exenta?: number,
        public estadoCompra?: EstadoCompra,
        public timbrado?: string,
        public fecVencTimbrado?: Date,
        public cantidadCuota?: number,
        public observaciones?: string,
        public turno?: Turno,
        public empresa?: Empresa,
        public detalles: CompraDet[] = [],
    ) { }

}
