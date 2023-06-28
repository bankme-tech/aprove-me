import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthInterceptor } from './services/interceptors/auth/auth.interceptor';
import { ListPayablesComponent } from './payables/list-payables/list-payables.component';
import { CreatePayablesComponent } from './payables/create-payables/create-payables.component';
import { EditPayablesComponent } from './payables/edit-payables/edit-payables.component';
import { ErrorCatchingInterceptor } from './services/interceptors/error-catching/error-catching.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowPayableComponent } from './payables/show-payable/show-payable.component';
import { MatSelectModule } from '@angular/material/select';
import { CreateAssignorsComponent } from './assignors/create-assignors/create-assignors.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListPayablesComponent,
    CreatePayablesComponent,
    EditPayablesComponent,
    ShowPayableComponent,
    CreateAssignorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
