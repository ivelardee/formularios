import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Auth } from './servicios/auth';
import { Login } from './componentes/login/login';
import { Dashboard } from './componentes/dashboard/dashboard';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario';

export const routes: Routes = [
    { path: '', redirectTo: 'registro', pathMatch: 'full' },
    { path: 'registro', component: RegistroUsuarioComponent },
    { path: 'login', component: Login },
    { path: 'dashboard',component: Dashboard, canActivate: [() => inject(Auth).estaAutenticado() || inject(Router).createUrlTree(['/login'])]}

  ];
