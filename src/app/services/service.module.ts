import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
   UsuarioService, LoginGuard, SessionGuard, MenuService, PerfilService, ProgramaService,
   EmpresaService, DepositoService, SucursalService, ClockService, ArticulosService,
   FamiliaService, MarcaService, LineaArticuloService, UnidadMedidaService,
   ClientesService, ProveedoresService, CompraService, LoadingService
   } from './services.index';



@NgModule({
    declarations: [],
    imports: [
      CommonModule, HttpClientModule
    ],
     providers: [
        UsuarioService,
        LoginGuard,
        SessionGuard,
        MenuService,
        PerfilService,
        ProgramaService,
        EmpresaService,
        DepositoService,
        SucursalService,
        ClockService,
        ArticulosService,
        FamiliaService,
        MarcaService,
        LineaArticuloService,
        UnidadMedidaService,
        ClientesService,
        ProveedoresService,
        CompraService,
        LoadingService
     ],

  })
  export class ServiceModule { }
