import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Đăng nhập'
    },
    {
        path: '**',
        component: HomeComponent,
        title: 'Quản lý dự án'
    }
];
