import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  msg = '';
 
  constructor(private registrationService : RegistrationService, 
    private userService: UserService,
    private _router: Router) { }
 
  ngOnInit(): void {
  }
 
  loginUser(f: NgForm){
    this.user.email = f.value.email;
    this.user.password = f.value.password;
    this.registrationService.loginUserFromRemote(this.user).subscribe(
      data => {
        // console.log(data)
        // console.log("response recieved"),
        sessionStorage.setItem('token', 'abc-qwe')
        this.userService.setCurrentUserId(data.userId)
        // sessionStorage.setItem('id', data.userId)
        // this.userService.setLoggedInUserId(data.userId)
        // this.userService.setLoggedInUserId(data.userId)
        this._router.navigate(['/home'])
      },
      error => {
        // console.log(error)
        // console.log("exception occured");
        this.msg = 'Bad Credentials, Please Enter Email and Password';
      }
    )
  }

}
