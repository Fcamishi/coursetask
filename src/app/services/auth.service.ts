import { Inject, Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.token';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export const JWT_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(userData: UserLogin) {
    const path = `${this.apiUrl}/auth/signIn`;
    return this.http.post<UserLogin>(path, userData).pipe(map((res:any)=>{
    sessionStorage.setItem('access_token', res.data.token)
    return res;
    }));
  }

  register(userData: UserRegister) {
    const path = `${this.apiUrl}/auth/signUp`;
    return this.http.post<UserRegister>(path, userData);
  }

  isAuthenticated():boolean {
    const tokenData:any = sessionStorage.getItem(JWT_TOKEN)
    return !this.jwtHelper.isTokenExpired(tokenData)
  }

  logout () {
  sessionStorage.removeItem(JWT_TOKEN)
  }
}
