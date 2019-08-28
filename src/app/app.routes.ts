
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NofoundComponent } from './shared/nofound/nofound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard, SessionGuard } from './services/services.index';


const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },

   {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard, SessionGuard ],
    loadChildren: './pages/pages.module#PagesModule'
  },

  { path: '**', component: NofoundComponent }

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
