import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private user = new BehaviorSubject<User>(null);
  // public shareUser = this.user.asObservable();
  // userId = new Subject();
  // userId: number;
  currentUserId: number;

  constructor(private _http : HttpClient) { }

  public getLoggedInUser():Observable<any> {
    // console.log(this.userId)
    // return this._http.get(`http://localhost:8080/api/users/${this.userId}`);
    this.currentUserId = JSON.parse(sessionStorage.getItem('id')).userId;
    return this._http.get(`http://localhost:8080/api/users/${this.currentUserId}`);
  }

  public getUsernameAndPassword(email: string): Observable<any>{
    return this._http.post('http://localhost:8080/api/forgot', email);
  }

  public updateUser(user: User):Observable<any>{
    this.currentUserId = JSON.parse(sessionStorage.getItem('id')).userId;
    return this._http.put<any>(`http://localhost:8080/api/users/${this.currentUserId}`, user);
  }

  public isLoggedIn(){
    return !!sessionStorage.getItem('token');
  }

  // public setLoggedInUserId(newUserId: number) {
  //   // this.user.next(newUserId);
  //   this.userId = newUserId;
  // }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('ticketId');
    sessionStorage.removeItem('clickedTicketId');
    // this.userId = null;
  }

  public setCurrentUserId(userId: number){
    sessionStorage.setItem('id', JSON.stringify({userId: userId}))
  }

}
