import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionGuard } from '../services/services.index';
import { LoginGuard } from '../services/guards/login.guard';
import { ProgramasComponent } from './mantenimientos/programas/programas.component';
import { MenuesComponent } from './mantenimientos/menues/menues.component';
import { PerfilesComponent } from './mantenimientos/perfiles/perfiles.component';
import { AsignarPerfilComponent } from './mantenimientos/perfiles/asignar-perfil.component';
import { EmpresasComponent } from './mantenimientos/empresas/empresas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { SucursalesComponent } from './mantenimientos/sucursales/sucursales.component';
import { DepositosComponent } from './mantenimientos/depositos/depositos.component';
import { ArticulosComponent } from './mantenimientos/articulos/articulos.component';
import { FamiliaComponent } from './mantenimientos/familia/familia.component';
import { MarcaComponent } from './mantenimientos/marca/marca.component';
import { LineaArticuloComponent } from './mantenimientos/linea-articulo/linea-articulo.component';
import { UnidadMedidaComponent } from './mantenimientos/unidad-medida/unidad-medida.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { RegistroCompraComponent } from './compras/registro-compra.component';
import { ValidarCompraComponent } from './compras/validar-compra.component';
import { RegistrarOrdenComponent } from './compras/orden/registrar-orden.component';
import { ConfirmarOrdenComponent } from './compras/orden/confirmar-orden.component';

import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { RegistrarVentaComponent } from './ventas/registrar-venta.component';
import { CobrarFacturaComponent } from './ventas/cobrar-factura.component';


const pagesRoutes: Routes = [

    { path: 'home', component: HomeComponent , canActivate: [SessionGuard, LoginGuard] },

    // admin
    { path: 'mant-programas', component: ProgramasComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-menues', component: MenuesComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-perfiles', component: PerfilesComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'asignar-perfil-usuario', component: AsignarPerfilComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-empresas', component: EmpresasComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-usuarios', component: UsuariosComponent , canActivate: [SessionGuard, LoginGuard] },

    // stock
    { path: 'mant-sucursales', component: SucursalesComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-depositos', component: DepositosComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-articulos', component: ArticulosComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-familia', component: FamiliaComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-marca', component: MarcaComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-linea-articulo', component: LineaArticuloComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-unidad-medida', component: UnidadMedidaComponent , canActivate: [SessionGuard, LoginGuard] },

    // personas
    { path: 'mant-clientes', component: ClientesComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'mant-proveedores', component: ProveedoresComponent , canActivate: [SessionGuard, LoginGuard] },

    // compra
    { path: 'registrar-compra', component: RegistroCompraComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'validar-compra', component: ValidarCompraComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'registrar-orden-pago', component: RegistrarOrdenComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'confirmar-orden-pago', component: ConfirmarOrdenComponent , canActivate: [SessionGuard, LoginGuard] },

    // ventas
    { path: 'registrar-venta', component: RegistrarVentaComponent , canActivate: [SessionGuard, LoginGuard] },
    { path: 'cobrar-factura', component: CobrarFacturaComponent , canActivate: [SessionGuard, LoginGuard] },

    { path: '', redirectTo: '/home', canActivate: [SessionGuard], pathMatch: 'full' }

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
