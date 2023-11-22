import { Component } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helpers/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authS: AuthService, private router: Router) {}

  authed$ = this.authS.isAuthenticated();

  pageTitle ='page'

  handleLogin() {
    this.router.navigate(['/sign-in']);
  }
  handleLogout(){
    this.authS.logout();
  }
}
