import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from '../local-storage/local-storage.service';

interface IDecodedToken {
  sub?: string;
  login?: string;
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtToken: string = '';
  decodedToken: IDecodedToken = {};

  constructor(private localStorage: LocalStorageService) {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      this.localStorage.set('jwt',token)
    }
  }

  decodeToken(token:string): {exp: number;user:string;login:string} {
     return jwt_decode(token);    
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getLogin(token:string) {
    const decodedToken = this.decodeToken(token);
      
    return decodedToken ? decodedToken?.login : null;
  }

  getExpiryTime(token:string) {
    const decodedToken = this.decodeToken(token);
    
    return decodedToken ? decodedToken['exp'] : null;
  }

  isTokenExpired(token:string): boolean {
    const expiryTime = this.getExpiryTime(token);
    
    if (expiryTime) {
      const calc = ((1000 * expiryTime) - (new Date()).getTime()) ;
      
      return calc < 5000
    } else {
      return false;
    }
  }
}
