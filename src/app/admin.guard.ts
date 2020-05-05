import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router){}
 
  canActivate(): boolean{
    if(this._authService.isLoggedInAdmin()){
      return true;
    }else{
      this._router.navigate(['/admin'])
      return false;
    }
  }
}
