import { Inject, Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.token';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
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
}
