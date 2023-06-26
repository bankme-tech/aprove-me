import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtService } from '../services/jwt/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  signUpForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  signUp(): void {
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
