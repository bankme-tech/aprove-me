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

  decodeToken() {
    if (this.jwtToken) {
     this.decodedToken = jwt_decode(this.jwtToken);
    }
    
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getLogin() {
    this.decodeToken();    
    return this.decodedToken ? this.decodedToken['login'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    console.log('expiryTime',expiryTime);
    
    if (expiryTime) {
      const calc = ((1000 * expiryTime) - (new Date()).getTime()) ;
      console.log(calc);
      
      return calc < 60000
    } else {
      return false;
    }
  }
}
