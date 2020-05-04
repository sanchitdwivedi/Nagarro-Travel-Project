import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './Admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http : HttpClient) { }

  public loginAdminFromRemote(admin: Admin):Observable<any>{
    return this._http.post("http://localhost:8080/api/adminLogin", admin);
  }

  public setClickedTicketId(ticketId: number){
    sessionStorage.setItem('selectedTicketId', JSON.stringify({ticketId: ticketId}))
  }

  public logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('selectedTicketId');
  }

  public setCurrentAdminId(adminId: number){
    sessionStorage.setItem('id', JSON.stringify({adminId: adminId}))
  }

  public isLoggedIn(){
    return !!(sessionStorage.getItem('token') === 'admin-login');
  }

}
