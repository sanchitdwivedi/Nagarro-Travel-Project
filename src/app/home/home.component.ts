import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: String;
  user: User;
  isLoggedIn = false;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService : UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    // console.log('Logged in ->' + this.isLoggedIn);
    if(!this.isLoggedIn){
      this.router.navigate(['/login'])
    }
    this.userService.getLoggedInUser().subscribe(
      data => {
        this.userName = data.firstName + ' ' + data.lastName;
      },
      error => {
        console.log(error)
        // console.log("exception occured");
        this.router.navigate(['/login'])
      }
    )

  }

  handleLogout() {
    this.userService.logout();
  }

}