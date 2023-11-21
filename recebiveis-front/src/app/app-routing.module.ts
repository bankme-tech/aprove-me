import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './helpers/auth/auth.guard';
import { FormPayableComponent } from './components/form-payable/form-payable.component';
import { FormAssignorComponent } from './components/form-assignor/form-assignor.component';
import { PayablesComponent } from './pages/payables/payables.component';
import { PayablesDetailsComponent } from './pages/payables-details/payables-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'payable', pathMatch: 'full' },
      { path: 'payable', component: RegisterComponent },
      { path: 'assignor', component: RegisterComponent },
    ],
  },
  {
    path: 'payables',
    component: PayablesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payable-details/:id',
    component: PayablesDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
