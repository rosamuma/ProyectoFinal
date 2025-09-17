import { Routes } from '@angular/router';
import { Register } from './pages/auth/register/register';
import { LoginComponent } from './pages/auth/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
];
