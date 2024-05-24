import { Routes } from "@angular/router";
import { PayableDetailsComponent } from "./payable-details/payable-details.component";
import { PayableFormComponent } from "./payable-form/payable-form.component";
import { PayableListComponent } from "./payable-list/payable-list.component";
import { PayableEditComponent } from "./payable-edit/payable-edit.component";


export const PAYABLES_ROUTES: Routes = [
  {
    path: '',
    component: PayableListComponent,
  },
  {
    path: 'new',
    component: PayableFormComponent,
  },
  {
    path: 'edit/:id',
    component: PayableEditComponent,
  },
  {
    path: ':id',
    component: PayableDetailsComponent,
  },
];
