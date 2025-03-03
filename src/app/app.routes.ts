import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { adminRoutes } from './admin-layout/admin-routes';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { userRoutes } from './user-layout/user-routes';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    children: adminRoutes,
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: userRoutes,
  },
];
