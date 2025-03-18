import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';
export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
