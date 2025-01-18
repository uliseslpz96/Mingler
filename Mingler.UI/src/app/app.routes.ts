import { Routes } from '@angular/router';
import { LoggedoutComponentLayout } from './shared/layouts/loggedout/loggedout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
    {
        path: '', // Ruta raíz
        redirectTo: 'auth/login',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        component: LoggedoutComponentLayout, // Layout de autenticación
        children: [
          {
            path: 'login',
            component: LoginComponent, // Componente Login
          },
          {
            path: 'register',
            component: RegisterComponent
          }
        ],
      },
      {
        path: '**', // Ruta por defecto si no encuentra otras
        redirectTo: 'auth/login',
      },
];
