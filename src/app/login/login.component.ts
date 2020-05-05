import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg = '';
  authRequest: any;
 
  constructor(private registrationService : RegistrationService, 
    private userService: UserService,
    private _router: Router,
    private authService: AuthService) { }
 
  ngOnInit(): void {
  }
 
  loginUser(f: NgForm){
    this.authRequest = {
      "userName": f.value.email,
      "password": f.value.password
    }
    this.registrationService.generateToken(this.authRequest).subscribe(
      data => {
        console.log("Token => " + data)
        this.authService.storeJwtToken(data)
        let userId = Number(jwt_decode(data).jti);
        this.userService.setCurrentUserId(userId)
        this._router.navigate(['/home'])
      },
      error => {
        this.msg = 'Bad Credentials, Please Enter correct Email and Password';
      }
    )
  }

}
