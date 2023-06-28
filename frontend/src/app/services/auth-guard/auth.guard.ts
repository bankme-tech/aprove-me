import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { JwtService } from '../jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService)
  const localStorage = inject(LocalStorageService)
  const router = inject(Router)

  const jwt = localStorage.get('jwt') || ''
  
  if (!jwt ) {
    router.navigateByUrl('/');    
  }

  const isExpired = jwtService.isTokenExpired(jwt);
  
  if (isExpired) {
    router.navigateByUrl('/');
  }

  return true
}
