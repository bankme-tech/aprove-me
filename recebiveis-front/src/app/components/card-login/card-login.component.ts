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
    private router: Router,
    private route: ActivatedRoute
  ) {}
  login() {
    const credentials: Credentials = {
      login: this.loginModel.value.login || '',
      password: this.loginModel.value.password || '',
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const jwt = JSON.stringify(response.accessToken);
        localStorage.setItem('accessToken', jwt);

        const redirectUrl =
          this.route.snapshot.queryParams['redirectUrl'] || '/register';

        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        window.alert('Wrong access!');
        console.error('Erro ao fazer login:', error);
     },
    });
  }
}
