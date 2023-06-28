import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './services/auth-guard/auth.guard';
import { ListPayablesComponent } from './payables/list-payables/list-payables.component';
import { ShowPayableComponent } from './payables/show-payable/show-payable.component';
import { CreatePayablesComponent } from './payables/create-payables/create-payables.component';
import { EditPayablesComponent } from './payables/edit-payables/edit-payables.component';
import { CreateAssignorsComponent } from './assignors/create-assignors/create-assignors.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'payables', component: ListPayablesComponent,canActivate:[authGuard] },
  { path: 'payables/create', component: CreatePayablesComponent,canActivate:[authGuard] },
  { path: 'payables/:id', component: ShowPayableComponent,canActivate:[authGuard] },
  { path: 'payables/create', component: CreatePayablesComponent,canActivate:[authGuard] },
  { path: 'payables/edit/:id', component: EditPayablesComponent,canActivate:[authGuard] },
  { path: 'payables/edit/:id', component: ShowPayableComponent,canActivate:[authGuard] },
  { path: 'assignors/create', component: CreateAssignorsComponent,canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
