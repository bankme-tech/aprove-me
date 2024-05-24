import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertsService } from '../../alerts/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertsService
  ) {
    document.title = 'Login';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      password: '',
    });
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    console.log(this.form);

    if (
      !this.form.value.login ||
      !this.form.value.password ||
      this.form.value.login === '' ||
      this.form.value.password === ''
    ) {
      this.alertService.error('Login and password are required');
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.authService.setToken(response.access_token);
      },

      complete: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
