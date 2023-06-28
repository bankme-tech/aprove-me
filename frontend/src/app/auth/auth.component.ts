import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  signUpForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return
    }
    this.apiService
      .signUp(this.signUpForm.value)
      .subscribe((data: any) => {
        if (data?.access_token) {
          this.jwtService.setToken(data.access_token);
          this.router.navigate(['payables'])          
        }
      });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return
    }
    this.apiService
      .login(this.loginForm.value)
      .subscribe((data: any) => {
        if (data?.access_token) {
          this.jwtService.setToken(data.access_token);
          this.router.navigate(['payables'])          
        }
      });
  }

}
