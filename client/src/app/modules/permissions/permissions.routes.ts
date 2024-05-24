import { Routes } from '@angular/router';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { PermissionsFormComponent } from './permissions-form/permissions-form.component';
import { PermissionsEditComponent } from './permissions-edit/permissions-edit.component';

export const PERMISSIONS_ROUTES: Routes = [
  {
    path: '',
    component: PermissionsListComponent,
  },
  {
    path: 'new',
    component: PermissionsFormComponent,
  },
  {
    path: 'edit/:id',
    component: PermissionsEditComponent,
  },
];
