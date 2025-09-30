import { Routes } from '@angular/router'; 
import { Register } from './pages/auth/register/register';
import { LoginComponent } from './pages/auth/login/login';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
import { DashboardShell } from './pages/dashboard/dashboard-shell/dashboard-shell';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: Register },

      // Esta es la ruta por defecto dentro del layout público
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: PrivateLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardShell },
    ]
  }
];
