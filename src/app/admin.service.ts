import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './Admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly JWT_ADMIN_TOKEN = 'JWT_ADMIN_TOKEN';

  constructor(private _http : HttpClient) { }

  // public loginAdminFromRemote(admin: Admin):Observable<any>{
  //   return this._http.post("http://localhost:8080/api/adminLogin", admin);
  // }

  public generateToken(request) {
    return this._http.post<string>("http://localhost:8080/authenticateAdmin", request, {  responseType: 'text' as 'json' });
  }

  public setClickedTicketId(ticketId: number){
    sessionStorage.setItem('selectedTicketId', JSON.stringify({ticketId: ticketId}))
  }

  public logout(){
    sessionStorage.removeItem(this.JWT_ADMIN_TOKEN);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('selectedTicketId');
  }

  public setCurrentAdminId(adminId: number){
    sessionStorage.setItem('id', JSON.stringify({adminId: adminId}))
  }

}
