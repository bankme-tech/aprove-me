import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormPayableComponent } from './components/form-payable/form-payable.component';
import { AuthInterceptorService } from './helpers/auth/auth-interceptor.service';
import { FormAssignorComponent } from './components/form-assignor/form-assignor.component';
import { PayablesComponent } from './pages/payables/payables.component';
import { CardPayableComponent } from './components/card-payable/card-payable.component';
import { PayablePipe } from './helpers/pipes/payable.pipe';
import { PayablesDetailsComponent } from './pages/payables-details/payables-details.component';
import { CardAssignorDetailsComponent } from './components/card-assignor-details/card-assignor-details.component';
import { CardPayableDetailsComponent } from './components/card-payable-details/card-payable-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardLoginComponent,
    RegisterComponent,
    FormPayableComponent,
    FormAssignorComponent,
    PayablesComponent,
    CardPayableComponent,
    PayablePipe,
    PayablesDetailsComponent,
    CardAssignorDetailsComponent,
    CardPayableDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
