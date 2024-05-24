import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/payables', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'assignors',
    loadChildren: () =>
      import('./modules/assignors/assignors.routes').then(
        (m) => m.ASSIGNORS_ROUTES
      ),
  },
  {
    canActivate: [AuthGuard],
    path: 'payables',
    loadChildren: () =>
      import('./modules/payables/payables.routes').then(
        (m) => m.PAYABLES_ROUTES
      ),
  },
  { path: '**', redirectTo: '/payables' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
