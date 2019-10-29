import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { PAGES_ROUTES } from './pages.routes';

// module
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProgramasComponent } from './mantenimientos/programas/programas.component';
import { PerfilesComponent } from './mantenimientos/perfiles/perfiles.component';
import { MenuesComponent } from './mantenimientos/menues/menues.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsignarPerfilComponent } from './mantenimientos/perfiles/asignar-perfil.component';
import { EmpresasComponent } from './mantenimientos/empresas/empresas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { SucursalesComponent } from './mantenimientos/sucursales/sucursales.component';
import { DepositosComponent } from './mantenimientos/depositos/depositos.component';
import { ArticulosComponent } from './mantenimientos/articulos/articulos.component';
import { MarcaComponent } from './mantenimientos/marca/marca.component';
import { FamiliaComponent } from './mantenimientos/familia/familia.component';
import { UnidadMedidaComponent } from './mantenimientos/unidad-medida/unidad-medida.component';
import { LineaArticuloComponent } from './mantenimientos/linea-articulo/linea-articulo.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { RegistroCompraComponent } from './compras/registro-compra.component';
import { ValidarCompraComponent } from './compras/validar-compra.component';
import { RegistrarOrdenComponent } from './compras/orden/registrar-orden.component';
import { ConfirmarOrdenComponent } from './compras/orden/confirmar-orden.component';
import { RegistrarVentaComponent } from './ventas/registrar-venta.component';
import { CobrarFacturaComponent } from './ventas/cobrar-factura.component';



@NgModule({
    declarations : [
        HomeComponent,
        ProgramasComponent,
        PerfilesComponent,
        MenuesComponent,
        AsignarPerfilComponent,
        EmpresasComponent,
        UsuariosComponent,
        SucursalesComponent,
        DepositosComponent,
        ArticulosComponent,
        MarcaComponent,
        FamiliaComponent,
        UnidadMedidaComponent,
        LineaArticuloComponent,
        ClientesComponent,
        ProveedoresComponent,
        RegistroCompraComponent,
        ValidarCompraComponent,
        RegistrarOrdenComponent,
        ConfirmarOrdenComponent,
        RegistrarVentaComponent,
        CobrarFacturaComponent
    ],
    exports: [
       HomeComponent


    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,


    ]
})

export class PagesModule { }
