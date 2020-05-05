import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  msg: string = '';

  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  public forgotPassword(f: NgForm){
    this.msg = 'Please wait...';
    this.userService.getUsernameAndPassword(f.value.email).subscribe(
      data => {
        this.msg = 'A mail has been sent to the registered emailId';
      },
      error => {
        this.msg = 'User with this emailId does not exist!';
      }
    )
  }

}
