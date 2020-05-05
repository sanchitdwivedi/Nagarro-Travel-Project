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

  public generateToken(request) {
    return this._http.post<string>("http://localhost:8080/authenticate", request, {  responseType: 'text' as 'json' });
  }
 
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
