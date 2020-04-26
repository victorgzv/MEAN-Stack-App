import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  addUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe((responseData) => {
        const token = responseData.token;
        this.token = token;
      });
  }
}
