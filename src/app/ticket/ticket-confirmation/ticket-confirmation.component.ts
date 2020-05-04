import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Ticket';
import { TicketsService } from 'src/app/tickets.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-confirmation',
  templateUrl: './ticket-confirmation.component.html',
  styleUrls: ['./ticket-confirmation.component.css']
})
export class TicketConfirmationComponent implements OnInit {

  ticket: Ticket;

  constructor(private ticketService: TicketsService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    // this.userService.getLoggedInUser().subscribe(
    //   data => {
    //     this.getTicketDetails(data.userId)
    //   },
    //   error => {
    //     // console.log(error)
    //     // console.log("exception occured");
    //     this.router.navigate(['/login'])
    //   }
    // )

    this.getTicketDetails();
  }

  public getTicketDetails(){
    this.ticketService.getUserTicketById('ticketId').subscribe(
      data => {
        // console.log(data)
        this.ticket = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  public editTicket(){
    // this.router.navigate(['home/newTicket'])
    this.router.navigate(['home/newTicket'], {skipLocationChange: true})
    
  }

  public returnHomePage(){
    // this.registrationService.setEdittingUser(false);
    // this.userService.logout();
    sessionStorage.removeItem('ticketId');
    this.router.navigate(['/home'])
  }

  PrintContent()
  {
  var DocumentContainer = document.getElementById('ticketConfirm');
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
