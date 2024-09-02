import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resp } from './models/resp.model';
import { Observable, of, switchMap } from 'rxjs';
import { AppConst } from './app.const';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:3000/';
  headers: any;

  constructor(private http: HttpClient, private router: Router) {}

  createHeaders = () => {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      "access-control-allow-headers":"*",
      'Content-Type': 'application/json',
    });
  };

  methodGET = (url: string, params: any): Observable<Resp | undefined> => {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      "access-control-allow-headers":"*",
      'Content-Type': 'application/json',
    });
    return this.http.get<Resp>(this.baseUrl + url, {
      params: params,
      headers: this.headers,
    });
  };

  methodPOST = (url: string, params: any): Observable<Resp | undefined> => {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<Resp>(this.baseUrl + url, params, {
      headers: this.headers,
    });
  };

  /**
   * * Lấy token được lưu ở localStorage
   */
  getToken = (): string | null => {
    return localStorage.getItem(AppConst.common.key_token) ?? null;
  };

  /**
   * * Lấy username được lưu ở localStorage
   */
  getUsername = (): string | null => {
    return localStorage.getItem('username') ?? null;
  };

  getUserInfo = (): Observable<Resp | undefined> => {
    const dataRequest = {
      username: this.getUsername(),
    };
    return this.methodGET('api/user/getInfo', dataRequest);
  };

  signIn = (data: any) => {
    const resultLogin = this.methodPOST('auth/login', data);

    resultLogin
      .pipe(
        switchMap((result) => {
          if (result && result.status == 1) {
            localStorage.setItem(
              AppConst.common.key_token,
              result?.data.access_token
            );
            localStorage.setItem('username', result?.data.username);
            return this.getUserInfo();
          }
          return of(result);
        })
      )
      .subscribe((result) => {
        if (result && result?.status == 1) {
          localStorage.setItem('user_info', JSON.stringify(result?.data));
          this.router.navigate([AppConst.page.home]);
          return;
        }
        console.error(result);
      });
  };

  /**
   * Check đã đăng nhập hay chưa?
   */
  isAuthenticated = (): boolean => {
    const token = localStorage.getItem(AppConst.common.key_token);
    const username = localStorage.getItem("username");
    if(token && username){
      return true;
    }
    return false;
  };
}
