import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NofoundComponent } from './nofound/nofound.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BotonesComponent } from '../components/botones/botones.component';


import { PipesModule } from '../pipes/pipes.module';
import { ClockComponent } from '../components/clock/clock.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoaderComponent } from './loader/loader.component';
import { DetalleCompraComponent } from '../components/detalle-compra/detalle-compra.component';
import { FormaPagoComponent } from '../components/forma-pago/forma-pago.component';




@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        PipesModule,
        NgxMaskModule.forRoot(),
    ],
    declarations : [
        NofoundComponent,
        FooterComponent,
        HeaderComponent,
        AsideComponent,
        BreadcrumbComponent,
        BotonesComponent,
        ClockComponent,
        PaginationComponent,
        LoaderComponent,
        DetalleCompraComponent,
        FormaPagoComponent

    ],
    exports: [
        NofoundComponent,
        FooterComponent,
        HeaderComponent,
        AsideComponent,
        BreadcrumbComponent,
        BotonesComponent,
        ClockComponent,
        PaginationComponent,
        LoaderComponent,
        DetalleCompraComponent,
        FormaPagoComponent
    ]
})

export class SharedModule { }
