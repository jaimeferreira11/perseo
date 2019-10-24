
import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
import { Usuario } from './usuario.model';
import { OrdenPagoDet } from './orden-pago-det.model';
import { OrdenPagoCompra } from './orden-pago-compra.model';
import { OrdenPagoFp } from './orden-pago-fp.model';

export class OrdenPagoCab {

    constructor (
        public idOrdenPagoCab?: number,
        public beneficiario?: string,
        public concepto?: string,
        public fecha?: Date | any,
        public comentario?: string,
        public usuario?: Usuario,
        public importe: number | any = 0,
        public importeRetenido?: number | any,
        public sucursal?: Sucursal,
        public estado?: string,
        public retencion?: boolean,
        public fechaPago?: Date,
        public empresa?: Empresa,
        public detalles: OrdenPagoDet[] = [],
        public compras: OrdenPagoCompra[] = [],
        public pagos: OrdenPagoFp[] = [],
    ) { }

}
