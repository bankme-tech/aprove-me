import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService)

  const user = jwtService.getLogin()
  const isExpired = jwtService.isTokenExpired()  
  
  if (jwtService.getLogin()) {
    if (jwtService.isTokenExpired()) {
      inject(Router).navigate([''])
      return false 
    } else {
      return true;
    }
  } else {
    return false 
  }
  return true
}
