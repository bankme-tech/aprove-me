import { Routes } from '@angular/router';
import { AssignorDetailsComponent } from './assignor-details/assignor-details.component';
import { AssignorFormComponent } from './assignor-form/assignor-form.component';
import { AssignorListComponent } from './assignor-list/assignor-list.component';
import { AssignorEditComponent } from './assignor-edit/assignor-edit.component';

export const ASSIGNORS_ROUTES: Routes = [
  {
    path: '',
    component: AssignorListComponent,
  },
  {
    path: 'new',
    component: AssignorFormComponent,
  },
  {
    path: 'edit/:id',
    component: AssignorEditComponent,
  },
  {
    path: ':id',
    component: AssignorDetailsComponent,
  },
];
