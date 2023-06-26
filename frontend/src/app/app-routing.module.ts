import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PayablesComponent } from './payables/payables.component';
import { authGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'payables', component: PayablesComponent,canActivate:[authGuard] },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
