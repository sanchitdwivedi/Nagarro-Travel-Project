import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Admin } from 'src/app/Admin';
import { AuthService } from 'src/app/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin = new Admin();
  authRequest: any;
  msg = '';

  constructor(private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  public adminLogin(f: NgForm){
    // this.admin.email = f.value.email;
    // this.admin.password = f.value.password;
    // this.adminService.loginAdminFromRemote(this.admin).subscribe(
    //   data => {
    //     // console.log(data)
    //     sessionStorage.setItem('token', 'admin-login')
    //     this.adminService.setCurrentAdminId(data.adminId)
    //     this.router.navigateByUrl('/admin/home');
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )

    this.authRequest = {
      "userName": f.value.email,
      "password": f.value.password
    }
    this.adminService.generateToken(this.authRequest).subscribe(
      data => {
        console.log("Token => " + data)
        this.authService.storeAdminJwtToken(data)
        let adminId = Number(jwt_decode(data).jti);
        this.adminService.setCurrentAdminId(adminId)
        this.router.navigateByUrl('/admin/home');
      },
      error => {
        console.log(error)
        this.msg = 'Bad Credentials, Please Enter correct Email and Password';
      }
    )
  }

}
