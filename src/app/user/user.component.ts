import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private registrationService: RegistrationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.router.navigate(['/login'])
      }
    )
  }

  public returnHomePage(){
    this.registrationService.setEdittingUser(false);
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  public editUser(){
    this.registrationService.setEdittingUser(true);
    this.router.navigate(['/registration'])
  }

  PrintContent()
  {
  var DocumentContainer = document.getElementById('registerConfirm');
  var WindowObject = window.open("", "PrintWindow",
  "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
  WindowObject.document.writeln(DocumentContainer.innerHTML);
  WindowObject.document.close();
  setTimeout(function(){
      WindowObject.focus();
      WindowObject.print();
      WindowObject.close();
  },6000);
  }

}
