
import { Empresa } from './empresa.model';
import { Sucursal } from './sucursal.model';
import { Turno } from './turno.model';
import { Usuario } from './usuario.model';
import { Cliente } from './cliente.model';
import { Caja } from './caja.model';
import { Moneda } from './moneda.model';
import { TipoFactura } from './tipo-factura.model';
import { MetodoCobro } from './metodo-cobro.model';
import { VentaCab } from './venta-cab.model';
import { FacturaDet } from './factura-det.model';
import { FacturaFormaCobro } from './factura-forma-cobro.model';

export class FacturaCab {

    constructor (
        public idFacturaCab?: number,
        public fecha?: Date | any,
        public cliente: Cliente = new Cliente(),
        public estado?: boolean,
        public moneda?: Moneda,
        public sucursal?: Sucursal,
        public establecimiento?: number,
        public puntoExpedicion?: number,
        public nroFactura?: number,
        public importe: number = 0,
        public saldo?: number,
        public observacion?: string,
        public impreso?: boolean,
        public metodoCobro?: MetodoCobro,
        public tipoFactura?: TipoFactura,
        public cotizacion?: number,
        public caja?: Caja,
        public usuario?: Usuario,
        public fechaAnulacion?: Date,
        public ventaCab?: VentaCab,
        public timbrado?: number,
        public vigencia_Timbrado?: Date,
        public turno?: Turno,
        public iva5?: number,
        public iva10?: number,
        public gravada5?: number,
        public gravada10?: number,
        public exenta?: number,
        public empresa?: Empresa,
        public detalleFactura: FacturaDet[] = [],
        public listFormaPago: FacturaFormaCobro[] = [],
        public aPagar?: number | any,
    ) { }

}
