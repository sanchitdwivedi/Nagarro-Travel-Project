import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  msg: string = '';
  user = new User();
  
  constructor(private registrationService : RegistrationService, 
    private userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(f: NgForm){

    this.msg = 'Please wait...';

    this.user.firstName = f.value.firstName
    this.user.lastName = f.value.lastName
    this.user.businessUnit = f.value.businessUnit
    this.user.title = f.value.title
    this.user.email = f.value.email
    this.user.telephone = f.value.telephone
    this.user.address1 = f.value.address1
    this.user.address2 = f.value.address2
    this.user.city = f.value.city
    this.user.state = f.value.state
    this.user.zip = f.value.zip
    this.user.country = f.value.country

    if(this.registrationService.getEdittingUser()){
      //code to update current user
      
      this.userService.updateUser(this.user).subscribe(
        data => {
          // console.log(data)
          // console.log("response recieved"),
          // sessionStorage.setItem('token', 'abc-qwe')
          this._router.navigate(['/user'])
        },
        error => {
          console.log(error)
          // console.log("exception occured");
          this.msg = 'User with this emailId already exist!';
        }
      )
    }
    else{
      this.registrationService.registerUserFromRemote(this.user).subscribe(
        data => {
          // console.log(data)
          // console.log("response recieved"),
          sessionStorage.setItem('token', 'abc-qwe')
          this.userService.setCurrentUserId(data.userId)
          // sessionStorage.setItem('id', data.userId)
          // this.userService.setLoggedInUserId(data.userId)
          this._router.navigate(['/user'])
        },
        error => {
          console.log(error)
          // console.log("exception occured");
          this.msg = 'User with this emailId already exist!';
        }
      )
    }
  }

}
