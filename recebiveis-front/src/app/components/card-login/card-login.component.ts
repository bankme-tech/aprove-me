import { Component } from '@angular/core';
import { Credentials } from 'src/app/shared/interfaces/payables';
import { AuthService } from '../../helpers/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css'],
})
export class CardLoginComponent {
  loginModel = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  hide = true;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  login() {
    const credentials: Credentials = {
      login: this.loginModel.value.login || '',
      password: this.loginModel.value.password || '',
    };
  
    this.authService.login(credentials).subscribe({
      next: () => {
        this.authService.handleLoginSuccess(this.route);
      },
      error: () => {
        window.alert('Credenciais erradas!');
      },
    });
  }
}
