import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
 
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};





// rutas
import { APP_ROUTES } from './app.routes';

// modulos
import { SharedModule } from './shared/shared.module';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ServiceModule } from './services/service.module';

// interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helper/token.interceptors';
import { ErrorInterceptor } from './helper/error.interceptors';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    
    
    


  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceModule,
    NgbModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    CurrencyMaskModule


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
