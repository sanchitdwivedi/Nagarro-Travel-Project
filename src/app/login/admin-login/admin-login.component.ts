import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Admin } from 'src/app/Admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin = new Admin();

  constructor(private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
  }

  public adminLogin(f: NgForm){
    this.admin.email = f.value.email;
    this.admin.password = f.value.password;
    this.adminService.loginAdminFromRemote(this.admin).subscribe(
      data => {
        // console.log(data)
        sessionStorage.setItem('token', 'admin-login')
        this.adminService.setCurrentAdminId(data.adminId)
        this.router.navigateByUrl('/admin/home');
      },
      error => {
        console.log(error)
      }
    )
    
  }

}
