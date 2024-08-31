import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resp } from './models/resp.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = "http://localhost:3000/"
  constructor(private http: HttpClient) {}

  methodGET = (url: string, params: any) : Promise<any> => {
    return this.http
      .get(url, {
        params: params,
      })
      .toPromise();
  };

  methodPOST = (url: string, params: any) : Promise<Resp | undefined> => {
    return this.http
      .post<Resp>(this.baseUrl+url, params, {})
      .toPromise();
  };

  getUser(){
    
  }
}
