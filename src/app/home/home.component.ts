import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      data => {
        this.userName = data.firstName + ' ' + data.lastName;
      },
      error => {
        console.log(error)
        this.router.navigate(['/login'])
      }
    )

  }

  handleLogout() {
    this.authService.logout();
  }

}
