
import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
import { EstadoVenta } from './estado-venta.model';
import { Turno } from './turno.model';
import { Usuario } from './usuario.model';
import { Cliente } from './cliente.model';
import { Deposito } from './deposito.model';
import { TipoFactura } from './tipo-factura.model';
import { Moneda } from './moneda.model';
import { FormaPago } from './forma-pago.model';
import { MetodoCobro } from './metodo-cobro.model';
import { FacturaFormaCobro } from './factura-forma-cobro.model';
import { VentaDet } from './venta-det.model';


export class VentaCab {

    constructor (
        public idVentaCab?: number,
        public tipoFactura?: TipoFactura,
        public fecha?: Date | any,
        public fechaFacturacion?: Date | any,
        public usuario?: Usuario,
        public deposito?: Deposito,
        public estadoVenta?: EstadoVenta,
        public cliente: Cliente = new Cliente(),
        public moneda?: Moneda,
        public formaPago?: FormaPago,
        public sucursal?: Sucursal,
        public empresa?: Empresa,
        public importe: number = 0,
        public impuesto: number = 0,
        public cantidadTotal?: number,
        public nroLoteVenta?: number,
        public promedioDescuento?: number,
        public retenido?: boolean,
        public observacion?: string,
        public motivoRetencion?: string,
        public metodoCobro?: MetodoCobro,
        public turno?: Turno,
        public detalles: VentaDet[] = [],
        public formasCobro: FacturaFormaCobro[] = []
    ) { }

}
