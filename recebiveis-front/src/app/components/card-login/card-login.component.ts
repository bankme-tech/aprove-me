import { Component } from '@angular/core';
import { Credentials } from 'src/app/shared/interfaces/payables';
import { AuthService } from '../../helpers/auth/auth.service';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent {
  loginModel: Credentials = { login: '', password: '' };
  hide = true;
  constructor(private authService: AuthService) {}
  login() {
    this.authService.login(this.loginModel).subscribe(
      (response) => {
        
        localStorage.setItem('accessToken', response.accessToken);
      },
      (error) => {
        window.alert('Wrong acess!');
        this.loginModel = { login: '', password: '' };
        console.error('Erro ao fazer login:', error);
        // Lógica para lidar com falha no login, como exibir uma mensagem de erro
      }
    );
  }
}
