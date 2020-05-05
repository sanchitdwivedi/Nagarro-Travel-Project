import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly JWT_ADMIN_TOKEN = 'JWT_ADMIN_TOKEN';

  constructor() { }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  getJwtAdminToken() {
    return sessionStorage.getItem(this.JWT_ADMIN_TOKEN);
  }

  public storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public storeAdminJwtToken(jwt: string){
    sessionStorage.setItem(this.JWT_ADMIN_TOKEN, jwt);
  }

  public isLoggedIn(){
    return !!sessionStorage.getItem(this.JWT_TOKEN);
  }

  public logout() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('ticketId');
    sessionStorage.removeItem('clickedTicketId');
    // this.userId = null;
  }

  public isLoggedInAdmin() {
    return !!sessionStorage.getItem(this.JWT_ADMIN_TOKEN);
  }
}
