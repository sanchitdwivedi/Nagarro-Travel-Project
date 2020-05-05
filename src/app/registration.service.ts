import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  editingUser = false;

  constructor(private _http : HttpClient) { }
 
  // public loginUserFromRemote(user: User):Observable<any>{
  //   return this._http.post("http://localhost:8080/api/login", user);
  // }

  public generateToken(request) {
    return this._http.post<string>("http://localhost:8080/authenticate", request, {  responseType: 'text' as 'json' });
  }

  // public welcome(token) {
  //   let tokenStr = 'Bearer ' + token;
  //   const headers = new HttpHeaders().set('Authorization', tokenStr);
  //   return this._http.get<string>("http://localhost:8080/", {headers});
  // }
 
  public registerUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/api/register", user);
  }

  public getEdittingUser(){
    return this.editingUser;
  }

  public setEdittingUser(value: boolean){
    this.editingUser = value;
  }

}
