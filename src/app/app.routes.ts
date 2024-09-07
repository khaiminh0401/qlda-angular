import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Đăng nhập',
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Quản lý dự án',
  },
];
