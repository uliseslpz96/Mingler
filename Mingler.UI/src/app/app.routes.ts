import { Routes } from '@angular/router';
import { LoggedoutComponentLayout } from './shared/layouts/loggedout/loggedout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoggedinComponentLayout } from './shared/layouts/loggedin/loggedin.component';
import { LocalComponent } from './modules/news/local/local.component';
import { ElsewhereComponent } from './modules/news/elsewhere/elsewhere.component';

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
        ]
      },
      {
        path: 'news',
        component: LoggedinComponentLayout,
        children: [
          {
            path: 'local',
            component: LocalComponent
          },
          {
            path: 'elsewhere',
            component: ElsewhereComponent
          }
        ]
      },
      {
        path: '**', // Ruta por defecto si no encuentra otras
        redirectTo: 'auth/login',
      },
];
