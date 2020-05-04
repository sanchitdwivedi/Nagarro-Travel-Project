import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  editingUser = false;

  constructor(private _http : HttpClient) { }
 
  public loginUserFromRemote(user: User):Observable<any>{
    return this._http.post("http://localhost:8080/api/login", user);
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
